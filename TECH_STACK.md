# 🛠️ Stack Tecnológico - Porra Mundial

## Frontend

### Core
- **Next.js 14** - Framework React con App Router
- **React 18** - Librería UI
- **TypeScript** - Tipado estático

### Styling
- **Tailwind CSS** - Utilidad-first CSS framework
- **PostCSS** - Procesador CSS
- **Autoprefixer** - Compatible con navegadores antiguos

### Estado y Datos
- **React Hooks** - Estado local (useState, useEffect)
- **Supabase JS Client** - Manejo de BD y auth

## Backend / Database

### Supabase
- **PostgreSQL** - Base de datos relacional
- **Supabase Auth** - Autenticación email/password
- **Row Level Security** - Políticas de seguridad

## Estructura de Archivos

```
mundial/
├── app/                 # App Router de Next.js
│   ├── layout.tsx       # Layout raíz
│   ├── page.tsx         # Home (redirige a login)
│   ├── globals.css      # Estilos globales
│   ├── login/           
│   │   └── page.tsx     # Página de login
│   └── porra/
│       └── page.tsx     # Dashboard principal
├── components/          # Componentes reutilizables
│   ├── Navbar.tsx       # Barra de navegación
│   └── MatchCard.tsx    # Tarjeta de partido
├── hooks/               # Custom React hooks
│   └── useAuth.ts       # Hook de autenticación
├── lib/                 # Utilidades
│   ├── supabaseClient.ts # Instancia de Supabase
│   └── types.ts         # Tipos de TypeScript
├── public/              # Archivos estáticos
├── .env.example         # Variables de entorno (template)
├── tsconfig.json        # Configuración TypeScript
├── tailwind.config.js   # Configuración Tailwind
├── postcss.config.js    # Configuración PostCSS
├── next.config.js       # Configuración Next.js
└── package.json         # Dependencias
```

## Flujo de Autenticación

```
User → /login → Supabase Auth → Session → /porra → Navbar con logout
```

## Flujo de Predicciones

```
Inputs → onChange handler → Map en memoria → Guardar (upsert) → Supabase
```

## Tablas de Base de Datos

### predictions
```
- id (UUID)
- username (TEXT) - Email del usuario
- match_id (TEXT) - ID del partido
- home_score (INT)
- away_score (INT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- UNIQUE(username, match_id)
```

### results (opcional)
```
- id (UUID)
- match_id (TEXT)
- home_score (INT)
- away_score (INT)
```

## Componentes React

### Navbar
- Muestra usuario logueado
- Dropdown con logout
- Responsive (esconde nombre en mobile)

### MatchCard
- Muestra equipo local y visitante
- Inputs numéricos para goles
- Estados visuales (predicción registrada)

### useAuth
- Verifica sesión actual
- Maneja login/logout
- Redirecciona a /login si no autenticado

## APIs de Supabase Utilizadas

### Autenticación
```typescript
supabase.auth.signInWithPassword()
supabase.auth.signOut()
supabase.auth.getSession()
supabase.auth.onAuthStateChange()
```

### Base de Datos
```typescript
supabase.from('predictions').select()
supabase.from('predictions').upsert()
```

## Características de Seguridad

- ✅ Autenticación con Supabase
- ✅ Validación de tipos con TypeScript
- ✅ Variables de entorno protegidas
- ✅ Row Level Security recomendado
- ✅ Protección de rutas (useAuth)

## Performance

- 📦 Code splitting automático (Next.js)
- 🎨 Tailwind purga CSS no usado
- ⚡ SWC minificación (faster than Babel)
- 🔄 Incremental Static Regeneration (ISR)

## Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- ✅ Mobile responsive (iOS, Android)
- ✅ Desktop optimizado

## Extensiones Futuras

- [ ] Leaderboard con ranking
- [ ] Sistema de puntos
- [ ] Comparación con resultados reales
- [ ] Admin dashboard
- [ ] Notificaciones
- [ ] Dark mode
- [ ] Multiidioma
