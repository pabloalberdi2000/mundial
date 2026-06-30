# 📋 Resumen del Proyecto - Porra Mundial

## ⚽ ¿Qué es?

Una **aplicación web para pronosticar resultados del Mundial de Fútbol**. Los usuarios pueden:
- Hacer login con email y contraseña
- Ingresar predicciones de goles para cada partido
- Guardar sus pronósticos en la base de datos
- Editar predicciones en cualquier momento

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | Next.js 14, React 18, TypeScript |
| **Styling** | Tailwind CSS |
| **Authentication** | Supabase Auth (email/password) |
| **Database** | Supabase (PostgreSQL) |
| **Hosting** | Vercel (recomendado) |

---

## 📁 Estructura de Carpetas

```
mundial/
├── 📁 app/              # Next.js App Router
│   ├── login/           # 🔑 Página de login
│   ├── porra/           # ⚽ Dashboard de predicciones
│   ├── layout.tsx       # Layout raíz
│   ├── page.tsx         # Home (redirige a login)
│   └── globals.css      # Estilos globales
├── 📁 components/       # Componentes reutilizables
│   ├── Navbar.tsx       # Barra de navegación
│   └── MatchCard.tsx    # Tarjeta de partido
├── 📁 hooks/            # Custom React hooks
│   └── useAuth.ts       # Hook de autenticación
├── 📁 lib/              # Librerías y tipos
│   ├── supabaseClient.ts # Cliente Supabase
│   └── types.ts         # Tipos TypeScript
├── 📄 package.json      # Dependencias
├── 📄 tsconfig.json     # Configuración TypeScript
├── 📄 tailwind.config.js # Configuración Tailwind
├── 📄 .env.example      # Variables de entorno (template)
└── 📄 README.md         # Documentación principal
```

---

## 🔄 Flujos Principales

### Flujo de Autenticación
```
/login → SignIn → Validar → /porra (con sesión activa)
```

### Flujo de Predicciones
```
Cargar partidos → Usuario ingresa goles → Guardar en BD → Mostrar confirmación
```

---

## 🗄️ Esquema de Base de Datos

### Tabla: predictions
```
┌─────────────────────────────────────┐
│ predictions                         │
├─────────────────────────────────────┤
│ id (UUID) PRIMARY KEY               │
│ username (TEXT) NOT NULL            │
│ match_id (TEXT) NOT NULL            │
│ home_score (INT) NOT NULL           │
│ away_score (INT) NOT NULL           │
│ created_at (TIMESTAMP)              │
│ updated_at (TIMESTAMP)              │
│ UNIQUE(username, match_id)          │
└─────────────────────────────────────┘
```

---

## 📝 Rutas y Páginas

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Home | Redirige a `/login` |
| `/login` | Login | Formulario de autenticación |
| `/porra` | Dashboard | Panel principal de predicciones |

---

## 🎯 Funcionalidades Principales

### 1. Autenticación (useAuth Hook)
- ✅ Verificar sesión actual
- ✅ Manejar login/logout
- ✅ Redireccionar si no autenticado
- ✅ Mostrar datos del usuario

### 2. Página de Login
- ✅ Inputs para email y contraseña
- ✅ Validación de formato
- ✅ Mostrar errores claros
- ✅ Redireccionamiento automático
- ✅ Loading state

### 3. Dashboard (Porra)
- ✅ Navbar con usuario y logout
- ✅ Listado de partidos por fase
- ✅ Inputs para goles (home y away)
- ✅ Guardar predicciones (upsert)
- ✅ Cargar predicciones existentes
- ✅ Mensajes de éxito/error
- ✅ Diseño responsivo

### 4. Componentes Reutilizables
- ✅ **Navbar**: Navegación y logout
- ✅ **MatchCard**: Tarjeta de partido con inputs

---

## 🔌 APIs de Supabase Utilizadas

### Autenticación
```typescript
supabase.auth.signInWithPassword()  // Login
supabase.auth.signOut()              // Logout
supabase.auth.getSession()           // Obtener sesión
supabase.auth.onAuthStateChange()    // Escuchar cambios
```

### Database
```typescript
supabase.from('predictions').select()   // Fetch
supabase.from('predictions').upsert()   // Crear/Actualizar
```

---

## 🚀 Cómo Comenzar

### 1. Instalación (5 min)
```bash
npm install
cp .env.example .env.local
# Edita .env.local con credenciales de Supabase
```

### 2. Base de Datos (3 min)
- Copia `DATABASE_SETUP.sql`
- Pégalo en Supabase SQL Editor
- Crea usuario de prueba en Auth

### 3. Ejecución (1 min)
```bash
npm run dev
# Abre http://localhost:3000
```

### 4. Testing (5 min)
- Login con `test@example.com`
- Ingresa predicciones
- Verifica en Supabase

**Total**: ~15 minutos

---

## 📊 Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| **Archivos TypeScript** | 7 |
| **Componentes React** | 2 |
| **Hooks Personalizados** | 1 |
| **Rutas** | 3 |
| **Líneas de Código** | ~600 |
| **Dependencias** | 3 principales |
| **Tamaño Bundle** | ~150KB (minificado) |

---

## ✨ Características

### Frontend
- ✅ Interfaz moderna y limpia
- ✅ Responsive (mobile-first)
- ✅ Diseño deportivo
- ✅ Animaciones suaves
- ✅ Loading states

### Backend
- ✅ Autenticación segura
- ✅ Base de datos relacional
- ✅ Validación de datos
- ✅ Manejo de errores

### Desarrollo
- ✅ TypeScript (tipado estático)
- ✅ Componentes reutilizables
- ✅ Código limpio y documentado
- ✅ Easy to extend

---

## 🔒 Seguridad

- ✅ Autenticación via Supabase
- ✅ Variables de entorno protegidas
- ✅ JWT tokens manejados por Supabase
- ✅ Row Level Security (RLS) recomendado
- ✅ Validación en cliente

---

## 🎨 Diseño

### Colores
- **Primario**: Azul (`#1e40af` a `#1e3a8a`)
- **Secundario**: Verde (para confirmaciones)
- **Error**: Rojo (para errores)

### Tipografía
- **Font**: Inter (sans-serif)
- **Headings**: Bold
- **Body**: Regular

### Componentes
- **Tarjetas**: Sombra y hover
- **Inputs**: Border azul, focus ring
- **Botones**: Gradiente, hover, disabled state

---

## 🚀 Próximas Mejoras

- [ ] Leaderboard con puntos
- [ ] Comparación con resultados reales
- [ ] Admin dashboard
- [ ] Notificaciones push
- [ ] Dark mode
- [ ] Multiidioma
- [ ] Historial de predicciones

---

## 📚 Documentación Disponible

| Archivo | Propósito |
|---------|-----------|
| `README.md` | Descripción general |
| `SETUP.md` | Configuración paso a paso |
| `INDEX.md` | Índice completo del proyecto |
| `API.md` | Documentación de APIs |
| `TECH_STACK.md` | Stack tecnológico |
| `DESARROLLO.md` | Guía para developers |
| `DATABASE_SETUP.sql` | Script SQL para BD |

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

MIT License

---

## 📞 Soporte

- Documentación: Ver carpeta `/docs`
- Issues: Ver sección de issues en GitHub
- Preguntas: Revisa `FAQ.md` (próximamente)

---

**Estado**: ✅ Listo para usar
**Versión**: 1.0.0
**Actualización**: 2026-06-30
**Mantenedor**: Tu nombre aquí

