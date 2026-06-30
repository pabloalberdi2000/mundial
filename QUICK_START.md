# ⚡ Quick Start - Porra Mundial

## 3 Pasos para comenzar

### 1️⃣ Configurar Variables de Entorno

Copia `.env.example` a `.env.local` y rellena tus keys de Supabase:

```bash
cp .env.example .env.local
```

Edita `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Donde obtener las keys:
- Ve a tu proyecto en [supabase.com](https://supabase.com)
- Abre **Settings** → **API**
- Copia **Project URL** y **Anon Public Key**

### 2️⃣ Instalar Dependencias

```bash
npm install
```

### 3️⃣ Ejecutar la App

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🔑 Login de Prueba

Usa el usuario que ya creaste en Supabase:
- **Email**: test@example.com
- **Password**: Test123!

(O el que hayas creado)

---

## ✅ Verificar que Funciona

1. ✅ Debería redirigirte a `/login`
2. ✅ Haz login
3. ✅ Debería ir a `/porra` (dashboard)
4. ✅ Ingresa goles en los partidos
5. ✅ Haz clic en "Guardar Predicciones"
6. ✅ Deberías ver "✅ ¡Predicciones guardadas correctamente!"
7. ✅ Ve a Supabase → Table Editor → `predictions` y verifica los datos

---

## 📚 Más Información

- **Documentación completa**: Abre `README.md`
- **Índice del proyecto**: Abre `INDEX.md`
- **Guía de desarrollo**: Abre `DESARROLLO.md`
- **Preguntas frecuentes**: Abre `FAQ.md`

---

## 🚀 ¡Listo!

Tu app Porra Mundial está funcionando. 

Ahora puedes:
- ✏️ Editar componentes
- ➕ Agregar nuevas páginas
- 🎨 Personalizar estilos
- 🔌 Conectar nuevas funcionalidades

¡Que disfrutes! ⚽
