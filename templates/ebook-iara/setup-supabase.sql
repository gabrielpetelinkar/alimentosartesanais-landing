-- ============================================
-- Supabase Setup — Ebooks Iara
-- Projeto: qfkzjhuuoudecxjfsigt
-- Executar UMA VEZ no SQL Editor do Supabase
-- ============================================

-- Tabela de tokens (1 token por compra)
CREATE TABLE IF NOT EXISTS public.ebook_tokens (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  token text UNIQUE NOT NULL,
  email text,
  product_id text NOT NULL,
  hotmart_transaction text,
  max_devices int DEFAULT 3,
  devices_used int DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_ebook_tokens_token ON public.ebook_tokens(token);
CREATE INDEX IF NOT EXISTS idx_ebook_tokens_product ON public.ebook_tokens(product_id);

-- Tabela de dispositivos vinculados
CREATE TABLE IF NOT EXISTS public.ebook_devices (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  token_id uuid REFERENCES public.ebook_tokens(id),
  fingerprint text NOT NULL,
  user_agent text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(token_id, fingerprint)
);

-- RLS: anon pode SELECT (validar) e INSERT devices
ALTER TABLE public.ebook_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ebook_devices ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "anon_read_tokens" ON public.ebook_tokens FOR SELECT TO anon USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "anon_read_devices" ON public.ebook_devices FOR SELECT TO anon USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "anon_insert_devices" ON public.ebook_devices FOR INSERT TO anon WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Trigger: auto-incrementa devices_used quando novo device é registrado
CREATE OR REPLACE FUNCTION update_devices_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.ebook_tokens
  SET devices_used = (SELECT COUNT(*) FROM public.ebook_devices WHERE token_id = NEW.token_id)
  WHERE id = NEW.token_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_update_devices_count ON public.ebook_devices;
CREATE TRIGGER trg_update_devices_count
AFTER INSERT ON public.ebook_devices
FOR EACH ROW EXECUTE FUNCTION update_devices_count();

-- ============================================
-- Inserir token de teste (remover em produção)
-- ============================================
-- INSERT INTO public.ebook_tokens (token, email, product_id)
-- VALUES ('TEST-001', 'teste@teste.com', 'SEU-PRODUCT-ID');
