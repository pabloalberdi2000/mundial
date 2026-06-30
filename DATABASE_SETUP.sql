-- Tabla de predicciones del usuario
CREATE TABLE IF NOT EXISTS predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  match_id TEXT NOT NULL,
  home_score INT NOT NULL CHECK (home_score >= 0),
  away_score INT NOT NULL CHECK (away_score >= 0),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(username, match_id)
);

-- Índices para optimizar búsquedas
CREATE INDEX IF NOT EXISTS idx_predictions_username ON predictions(username);
CREATE INDEX IF NOT EXISTS idx_predictions_user_match ON predictions(username, match_id);

-- Tabla de resultados reales (opcional)
CREATE TABLE IF NOT EXISTS results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id TEXT NOT NULL UNIQUE,
  home_team TEXT,
  away_team TEXT,
  home_score INT NOT NULL CHECK (home_score >= 0),
  away_score INT NOT NULL CHECK (away_score >= 0),
  phase TEXT,
  match_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS) para seguridad
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad (usa esto después de crear el usuario)
-- Descomenta si tienes un usuario autenticado

-- CREATE POLICY "usuarios_ven_sus_predicciones" ON predictions
--   FOR SELECT
--   USING (username = auth.jwt() ->> 'email');

-- CREATE POLICY "usuarios_crean_sus_predicciones" ON predictions
--   FOR INSERT
--   WITH CHECK (username = auth.jwt() ->> 'email');

-- CREATE POLICY "usuarios_actualizan_sus_predicciones" ON predictions
--   FOR UPDATE
--   USING (username = auth.jwt() ->> 'email');
