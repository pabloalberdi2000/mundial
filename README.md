# ⚽ Porra Mundial

Aplicación web moderna para pronosticar resultados del Mundial de Fútbol. Construida con Next.js 14, React, TypeScript, Tailwind CSS y Supabase.

## 🚀 Características

- **Autenticación segura** con Supabase Auth
- **Interfaz responsiva** optimizada para mobile y desktop
- **Predicciones en tiempo real** con sincronización automática
- **Diseño deportivo** con emojis de banderas
- **Gestión de sesión** automática
- **Base de datos relacional** con Supabase

## 📋 Requisitos Previos

- Node.js 18+ y npm/yarn
- Proyecto de Supabase con autenticación habilitada

## 🗄️ Esquema de Base de Datos

### Tabla `predictions`

```sql
CREATE TABLE predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  match_id TEXT NOT NULL,
  home_score INT NOT NULL,
  away_score INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(username, match_id)
);

CREATE INDEX idx_predictions_username ON predictions(username);
```

## ⚙️ Instalación y Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia `.env.example` a `.env.local` y rellena tus credenciales de Supabase:

```bash
cp .env.example .env.local
```

### 3. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
mundial/
├── app/
│   ├── layout.tsx          
│   ├── globals.css         
│   ├── page.tsx            
│   ├── login/page.tsx      
│   └── porra/page.tsx      
├── components/
│   ├── Navbar.tsx          
│   └── MatchCard.tsx       
├── hooks/
│   └── useAuth.ts          
├── lib/
│   ├── supabaseClient.ts   
│   └── types.ts            
└── package.json            
```

## 🎯 Flujo de la Aplicación

1. **Login** (`/login`) - Autenticación con Supabase
2. **Dashboard** (`/porra`) - Ingresa predicciones
3. **Guardar** - Upsert en BD con un clic

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
