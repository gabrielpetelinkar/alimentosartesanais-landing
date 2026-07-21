-- Criar tabela de avaliações do Radar Artesanal
-- Rodar no Supabase SQL Editor: https://supabase.com/dashboard/project/kgsigsirzvajtltebvsf/sql

CREATE TABLE IF NOT EXISTS radar_ratings (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email      text NOT NULL,
  edicao     text NOT NULL,
  nota       smallint NOT NULL CHECK (nota IN (1, 0)),
  created_at timestamptz DEFAULT now(),
  UNIQUE(email, edicao)
);

-- RLS: permitir INSERT público (sem autenticação, para links de email)
ALTER TABLE radar_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_insert_ratings" ON radar_ratings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "allow_select_ratings" ON radar_ratings
  FOR SELECT USING (true);
