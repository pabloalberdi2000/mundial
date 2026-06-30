# 🎯 START HERE - Porra Mundial

¡Bienvenido! Tu aplicación Porra Mundial está **100% lista para usar**.

---

## ⚡ 3 Pasos para Empezar

### Paso 1: Configurar Keys (2 minutos)

```bash
# Copiar template
cp .env.example .env.local

# Editar .env.local con tus keys de Supabase
nano .env.local
```

**Dónde encontrar las keys:**
1. Ve a [supabase.com](https://supabase.com)
2. Abre tu proyecto
3. Settings → API
4. Copia `Project URL` y `Anon Public Key`

### Paso 2: Instalar Dependencias (2 minutos)

```bash
npm install
```

### Paso 3: Ejecutar (1 minuto)

```bash
npm run dev
```

Abre: **http://localhost:3000**

---

## 🔑 Credenciales de Prueba

Use el usuario que creaste en Supabase:
- **Email**: `test@example.com` (o el que uses)
- **Password**: `Test123!` (o la que uses)

---

## ✅ Verificar que Funciona

1. Serás redirigido a `/login`
2. Haz login
3. Deberías ver `/porra` con los partidos
4. Ingresa goles (ej: 2-1, 3-0)
5. Haz clic en "Guardar Predicciones"
6. Deberías ver ✅ confirmación
7. Ve a Supabase → Table Editor → `predictions` y verifica

**¡Si todo funciona, ¡bien hecho! 🎉**

---

## 📚 Documentación

Según lo que necesites:

| Necesito... | Leo... | Tiempo |
|-------------|--------|--------|
| Entender el proyecto | `README.md` | 5 min |
| Configurar todo paso a paso | `SETUP.md` | 10 min |
| Ver índice completo | `INDEX.md` | 10 min |
| Empezar a desarrollar | `DESARROLLO.md` | 15 min |
| Resolver un problema | `FAQ.md` | 5 min |
| Entender el stack técnico | `TECH_STACK.md` | 10 min |
| Entender las APIs | `API.md` | 10 min |
| Overview ejecutivo | `PROJECT_SUMMARY.md` | 10 min |

---

## 🗂️ Estructura Rápida

```
mundial/
├── app/login/page.tsx      ← Página de login
├── app/porra/page.tsx      ← Dashboard principal ⭐
├── components/             ← Componentes reutilizables
├── hooks/useAuth.ts        ← Hook de autenticación
├── lib/supabaseClient.ts   ← Cliente Supabase
└── .env.local              ← Tus keys (crea este)
```

---

## 🚀 Próximos Pasos

### Si quieres hacerlo funcionar:
1. ✅ Configura `.env.local`
2. ✅ `npm install`
3. ✅ `npm run dev`

### Si quieres entender el código:
1. Lee `INDEX.md`
2. Abre `app/porra/page.tsx` (la página principal)
3. Inspecciona `components/MatchCard.tsx`
4. Mira `hooks/useAuth.ts`

### Si quieres extender:
1. Lee `DESARROLLO.md`
2. Agrega componentes en `components/`
3. Agrega páginas en `app/`
4. Usa Supabase para BD

---

## 🎨 Características

✅ **Frontend**
- Interfaz moderna y limpia
- Responsive (mobile-first)
- Tailwind CSS
- Animaciones suaves

✅ **Autenticación**
- Login con email/password
- Supabase Auth
- Sessions automáticas
- Logout fácil

✅ **Base de Datos**
- Supabase PostgreSQL
- Tabla `predictions` lista
- Upsert automático
- Validación de datos

✅ **Código**
- TypeScript completo
- Componentes reutilizables
- Hooks personalizados
- Código limpio

---

## 🔧 Stack Tecnológico

```
Frontend: Next.js 14, React 18, TypeScript
Styling: Tailwind CSS
Database: Supabase (PostgreSQL)
Auth: Supabase Auth
Hosting: Vercel (recomendado)
```

---

## 🐛 Si Algo Falla

| Problema | Solución |
|----------|----------|
| "NEXT_PUBLIC_SUPABASE_URL is undefined" | Crea `.env.local` y configura |
| "Cannot find module" | Ejecuta `npm install` |
| "Auth error: Invalid credentials" | Verifica email/password en Supabase |
| "No rows returned" | Los datos no existen en BD |
| "Connection refused" | Verifica tu conexión a internet |

Lee `FAQ.md` para más problemas.

---

## 📞 Necesitas Ayuda?

1. **Problemas comunes**: Ver `FAQ.md`
2. **Cómo desarrollar**: Ver `DESARROLLO.md`
3. **APIs y queries**: Ver `API.md`
4. **Setup detallado**: Ver `SETUP.md`

---

## 🎯 Tu Checklist

- [ ] Copié `.env.local` desde `.env.example`
- [ ] Metí mis keys de Supabase en `.env.local`
- [ ] Ejecuté `npm install`
- [ ] Ejecuté `npm run dev`
- [ ] Abrí `http://localhost:3000`
- [ ] Hice login con mis credenciales
- [ ] Vi el dashboard de predicciones
- [ ] Ingresé goles en un partido
- [ ] Hice clic en "Guardar Predicciones"
- [ ] Vi el mensaje ✅ de éxito
- [ ] Verifiqué los datos en Supabase

---

## 🎉 ¡Felicidades!

Si completaste el checklist, **¡tu app funciona!**

Ahora puedes:
- 🏃 Ejecutarla
- 🔧 Modificarla
- 🚀 Desplegarla
- 📈 Extenderla

**¡Que disfrutes codificando! ⚽**

---

Última actualización: 2026-06-30
Versión: 1.0.0
