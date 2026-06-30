# 🚀 Guía de Setup - Porra Mundial

## 1️⃣ Configuración de Supabase

### Crear las Tablas

1. Ve a tu proyecto en [supabase.com](https://supabase.com)
2. Abre **SQL Editor**
3. Crea una nueva query
4. Copia el contenido de `DATABASE_SETUP.sql`
5. Ejecuta la query

### Obtener Credenciales

1. Ve a **Settings** → **API**
2. Copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `Anon Public Key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Crear Usuario de Prueba

1. Ve a **Authentication** → **Users**
2. Haz clic en "Add user manually"
3. Email: `test@example.com`
4. Password: `Test123!`
5. Confirm email

## 2️⃣ Configuración Local

### Clonar y Configurar

```bash
# Instalar dependencias
npm install

# Crear archivo de entorno
cp .env.example .env.local

# Editar .env.local con tus credenciales
nano .env.local
```

### Valores esperados en .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

## 3️⃣ Ejecutar la Aplicación

```bash
npm run dev
```

Accede a [http://localhost:3000](http://localhost:3000)

## 4️⃣ Probar la Aplicación

1. Serás redirigido a `/login`
2. Login con: `test@example.com` / `Test123!`
3. Debería llevarte a `/porra`
4. Ingresa predicciones y haz clic en "Guardar Predicciones"
5. Verifica en Supabase que los datos se guardaron

## ✅ Checklist Final

- [ ] Node.js 18+ instalado
- [ ] Proyecto de Supabase creado
- [ ] Tabla `predictions` creada
- [ ] Usuario de prueba creado
- [ ] `.env.local` configurado
- [ ] `npm install` ejecutado
- [ ] `npm run dev` funcionando
- [ ] Login exitoso
- [ ] Predicciones se guardan en BD

## 🆘 Troubleshooting

**Error: "NEXT_PUBLIC_SUPABASE_URL is not defined"**
- Verifica que `.env.local` exista
- Reinicia el servidor

**Error: "Auth error"**
- Verifica credenciales en `.env.local`
- Chequea que el usuario exista en Supabase

**Las predicciones no se guardan**
- Abre DevTools (F12) → Network
- Revisa la respuesta de la request
- Verifica que la tabla `predictions` exista

---

¿Necesitas ayuda? Revisa el README.md
