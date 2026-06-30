# 📑 Índice Completo - Porra Mundial

## 🎯 Inicio Rápido

1. **Primero, lee**: `SETUP.md` - Configuración paso a paso
2. **Luego, configura**: Supabase (tabla `predictions`)
3. **Después, ejecuta**: `npm install && npm run dev`
4. **Finalmente, prueba**: Accede a `http://localhost:3000`

---

## 📚 Documentación

### Para Entender el Proyecto
- **README.md** - Descripción general del proyecto
- **TECH_STACK.md** - Stack tecnológico y arquitectura
- **SETUP.md** - Guía paso a paso de configuración

### Para Integración con Supabase
- **DATABASE_SETUP.sql** - Script SQL para crear tablas
- **API.md** - Documentación de APIs y ejemplos

---

## 💻 Código Fuente

### Configuración del Proyecto
```
tsconfig.json          - Configuración TypeScript
next.config.js         - Configuración Next.js
tailwind.config.js     - Configuración Tailwind
postcss.config.js      - Configuración PostCSS
package.json           - Dependencias del proyecto
.env.example           - Variables de entorno (template)
.gitignore             - Archivos a ignorar en git
```

### App Routes (Next.js App Router)
```
app/
├── page.tsx            - Home → redirige a /login
├── layout.tsx          - Layout raíz
├── globals.css         - Estilos globales
├── login/page.tsx      - 🔑 Página de LOGIN
└── porra/page.tsx      - ⚽ Dashboard de PREDICCIONES
```

### Componentes React
```
components/
├── Navbar.tsx          - Barra de navegación superior
└── MatchCard.tsx       - Tarjeta individual de partido
```

### Custom Hooks
```
hooks/
└── useAuth.ts          - Hook para manejo de autenticación
```

### Librerías y Utilidades
```
lib/
├── supabaseClient.ts   - Instancia del cliente Supabase
└── types.ts            - Tipos de TypeScript
```

---

## 🔑 Archivos Principales Explicados

### lib/supabaseClient.ts
```typescript
// Inicializa Supabase con credenciales del .env.local
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### hooks/useAuth.ts
```typescript
// Hook que:
// - Verifica si hay sesión activa
// - Maneja login/logout
// - Redirige a /login si no está autenticado
export function useAuth() { ... }
```

### app/login/page.tsx
```typescript
// Pantalla de LOGIN:
// - Inputs para email y contraseña
// - Manejo de errores
// - Redirección a /porra tras login exitoso
export default function LoginPage() { ... }
```

### app/porra/page.tsx
```typescript
// Dashboard PRINCIPAL:
// - Navbar con usuario y logout
// - Grid de partidos por fase
// - Inputs para goles
// - Botón de guardar (upsert)
export default function PorraPage() { ... }
```

### components/MatchCard.tsx
```typescript
// Tarjeta de PARTIDO:
// - Mostrar bandera y nombre de equipos
// - Inputs numéricos para goles
// - Status visual de predicción registrada
export function MatchCard() { ... }
```

### components/Navbar.tsx
```typescript
// Barra de NAVEGACIÓN:
// - Logo y nombre de usuario
// - Dropdown con logout
// - Responsive (esconde nombre en mobile)
export function Navbar() { ... }
```

---

## 📊 Flujos de la Aplicación

### Flujo de Autenticación
```
Usuario en /login
  ↓
Ingresa email y contraseña
  ↓
supabase.auth.signInWithPassword()
  ↓
¿CredencialesOK? 
  ├─ SÍ → router.push('/porra')
  └─ NO → mostrar error
```

### Flujo de Predicciones
```
Usuario en /porra
  ↓
Fetch predicciones existentes (si hay)
  ↓
Usuario ingresa goles en inputs
  ↓
onChange → actualiza Map en memoria
  ↓
Click en "Guardar Predicciones"
  ↓
supabase.from('predictions').upsert()
  ↓
Mostrar mensaje de éxito/error
```

---

## 🗄️ Base de Datos

### Tabla: predictions
```sql
CREATE TABLE predictions (
  id UUID PRIMARY KEY,
  username TEXT NOT NULL,      -- Email del usuario
  match_id TEXT NOT NULL,       -- ID del partido
  home_score INT,               -- Goles del equipo local
  away_score INT,               -- Goles del equipo visitante
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE(username, match_id)
);
```

### Índices Creados
- `idx_predictions_username` - Para búsquedas rápidas por usuario
- `idx_predictions_user_match` - Para búsquedas por usuario + partido

---

## 🚀 Primeros Pasos

### 1. Setup Inicial
```bash
cd /Users/alberdi/Desktop/mundial
npm install
cp .env.example .env.local
# Edita .env.local con tus credenciales de Supabase
```

### 2. Crear Tablas en Supabase
```bash
# Copia el contenido de DATABASE_SETUP.sql
# Pégalo en Supabase → SQL Editor → Nueva Query
# Ejecuta
```

### 3. Crear Usuario de Prueba
- En Supabase → Authentication → Add user
- Email: `test@example.com`
- Password: `Test123!`

### 4. Ejecutar Localmente
```bash
npm run dev
# Abre http://localhost:3000
# Login con test@example.com / Test123!
```

---

## 🔍 Estructura de Carpetas

```
mundial/
├── app/                  ← Rutas Next.js (App Router)
│   ├── login/           ← /login
│   ├── porra/           ← /porra (protegida)
│   └── layout.tsx       ← Layout raíz
├── components/          ← Componentes reutilizables
├── hooks/               ← Custom React hooks
├── lib/                 ← Funciones y tipos
├── public/              ← Assets estáticos
├── package.json         ← Dependencias
├── tsconfig.json        ← Config TypeScript
├── tailwind.config.js   ← Config Tailwind
└── .env.local          ← Variables secretas (NO versionado)
```

---

## 📖 Cómo Leer este Proyecto

### Si eres nuevo:
1. Lee `README.md` - Visión general
2. Lee `SETUP.md` - Cómo configurar
3. Ejecuta `npm run dev`
4. Prueba la app

### Si quieres entender la arquitectura:
1. Lee `TECH_STACK.md`
2. Lee `API.md`
3. Inspecciona `app/porra/page.tsx`
4. Inspecciona `lib/supabaseClient.ts`

### Si quieres extender la app:
1. Lee `TECH_STACK.md` - Tecnologías usadas
2. Añade componentes en `components/`
3. Añade rutas en `app/`
4. Actualiza `lib/types.ts` si necesitas nuevos tipos

---

## ✅ Checklist de Setup

- [ ] Leer `README.md`
- [ ] Leer `SETUP.md`
- [ ] Crear proyecto en Supabase
- [ ] Ejecutar `DATABASE_SETUP.sql`
- [ ] Crear usuario de prueba
- [ ] `npm install`
- [ ] Configurar `.env.local`
- [ ] `npm run dev`
- [ ] Login exitoso
- [ ] Guardar predicción exitosa
- [ ] Verificar en Supabase que los datos llegaron

---

## 🆘 Problemas Comunes

**"Can't find module"**
```bash
npm install
```

**"NEXT_PUBLIC_SUPABASE_URL is undefined"**
```bash
# Verifica que .env.local exista y esté bien configurado
cat .env.local
```

**"Auth error"**
- Verifica credenciales en `.env.local`
- Verifica que el usuario exista en Supabase

**"Las predicciones no se guardan"**
- Abre DevTools (F12) → Network → busca "upsert"
- Revisa la respuesta del error
- Verifica que la tabla `predictions` exista en Supabase

---

## 📞 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

---

**Última actualización**: 2026-06-30
**Versión**: 1.0.0
**Estado**: ✅ Listo para desarrollo
