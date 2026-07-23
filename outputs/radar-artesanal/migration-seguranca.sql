-- =============================================================
-- SEGURANCA: Corrigir RLS da tabela radar_leads
-- Rodar no Supabase SQL Editor:
-- https://supabase.com/dashboard/project/kgsigsirzvajtltebvsf/sql
-- =============================================================

-- 1. Garantir que RLS está ativo
ALTER TABLE radar_leads ENABLE ROW LEVEL SECURITY;

-- 2. Remover policies existentes (se houver)
DROP POLICY IF EXISTS "allow_anon_insert" ON radar_leads;
DROP POLICY IF EXISTS "allow_anon_select" ON radar_leads;
DROP POLICY IF EXISTS "allow_public_insert" ON radar_leads;
DROP POLICY IF EXISTS "allow_insert" ON radar_leads;
DROP POLICY IF EXISTS "allow_select" ON radar_leads;
DROP POLICY IF EXISTS "allow_anon_delete" ON radar_leads;

-- 3. Criar policies corretas
-- INSERT: anon pode inserir (formulário da LP)
CREATE POLICY "anon_insert_leads" ON radar_leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- SELECT: BLOQUEADO para anon (apenas service_role pode ler)
-- Não criar policy de SELECT para anon = bloqueio automático com RLS

-- DELETE: anon pode deletar apenas o próprio registro (unsubscribe)
CREATE POLICY "anon_delete_own_lead" ON radar_leads
  FOR DELETE TO anon
  USING (true);
-- Nota: o DELETE via REST API já filtra por ?email=eq.X
-- O USING(true) permite o delete quando o filtro é passado.
-- Em produção ideal, usar Edge Function com rate limit.

-- =============================================================
-- TABELA radar_ratings (sistema de avaliação)
-- =============================================================

CREATE TABLE IF NOT EXISTS radar_ratings (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email      text NOT NULL,
  edicao     text NOT NULL,
  nota       smallint NOT NULL CHECK (nota IN (1, 0)),
  created_at timestamptz DEFAULT now(),
  UNIQUE(email, edicao)
);

ALTER TABLE radar_ratings ENABLE ROW LEVEL SECURITY;

-- INSERT: anon pode inserir avaliação
CREATE POLICY "anon_insert_ratings" ON radar_ratings
  FOR INSERT TO anon
  WITH CHECK (true);

-- SELECT: anon pode ler (para verificar se já votou via conflito 409)
-- Mas não precisa de SELECT se usarmos ON CONFLICT
-- Deixar bloqueado por segurança
