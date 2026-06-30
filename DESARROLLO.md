# 👨‍💻 Guía de Desarrollo - Porra Mundial

## 🎯 Cómo Desarrollar en este Proyecto

### Estructura de Desarrollo

```
mundial/
├── app/                 # Routes y pages
├── components/          # Componentes React
├── hooks/              # Custom hooks
├── lib/                # Librerías y utils
└── public/             # Assets estáticos
```

### Flujo de Desarrollo Típico

1. **Crear componente** en `components/`
2. **Usar en page** (`app/*/page.tsx`)
3. **Importar tipos** de `lib/types.ts`
4. **Usar Supabase** via `lib/supabaseClient.ts`

---

## 📝 Estructura de Código

### Componente React (TSX)
```typescript
'use client'  // ← Client component (si necesita hooks)

import { useState } from 'react'
import { TypeName } from '@/lib/types'

interface Props {
  prop1: string
  onChange?: (value: string) => void
}

export function ComponentName({ prop1, onChange }: Props) {
  const [state, setState] = useState('')

  return (
    <div className="...">
      {/* JSX aquí */}
    </div>
  )
}
```

### Server Component (sin 'use client')
```typescript
// Automático server component
export default function Page() {
  return <div>Contenido</div>
}
```

### Custom Hook
```typescript
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function useCustom() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Lógica
  }, [])

  return { data, loading }
}
```

---

## 🎨 Convenciones de Estilo

### Tailwind CSS
```typescript
// ✅ Correcto
<div className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
  
// ❌ Evitar CSS manual
<div style={{ padding: '16px', backgroundColor: '#2563eb' }}>
```

### Nombres de Variables
```typescript
// ✅ Nombres descriptivos
const [predictions, setPredictions] = useState([])
const [saveMessage, setSaveMessage] = useState('')

// ❌ Nombres genéricos
const [data, setData] = useState([])
const [msg, setMsg] = useState('')
```

### Funciones
```typescript
// ✅ Nombres con verbo
const handleSavePredictions = async () => {}
const fetchPredictions = async () => {}
const renderMatchCard = () => {}

// ❌ Sin verbo
const savePredictions = async () => {}
const predictionsFetch = async () => {}
```

---

## 🔌 Trabajar con Supabase

### Importar Cliente
```typescript
import { supabase } from '@/lib/supabaseClient'
```

### Queries Comunes

#### SELECT
```typescript
const { data, error } = await supabase
  .from('predictions')
  .select('*')
  .eq('username', user.email)
```

#### UPSERT
```typescript
const { error } = await supabase
  .from('predictions')
  .upsert([{ ... }], {
    onConflict: 'username,match_id'
  })
```

#### DELETE
```typescript
const { error } = await supabase
  .from('predictions')
  .delete()
  .eq('id', predictionId)
```

---

## 🧪 Testing Local

### Simular Errores
```typescript
// En el hook
if (error) {
  console.error('Error:', error.message)
  // Mostrar error al usuario
}
```

### DevTools
1. F12 → Console → ver logs
2. F12 → Network → ver requests a Supabase
3. F12 → Elements → inspeccionar DOM

### Verificar en Supabase
1. Supabase dashboard → Table Editor
2. Selecciona `predictions`
3. Busca tu email
4. Verifica los datos guardados

---

## 📱 Responsive Design

### Breakpoints de Tailwind
```
sm: 640px    - Teléfono pequeño
md: 768px    - Tablet
lg: 1024px   - Desktop
xl: 1280px   - Desktop grande
```

### Ejemplo Responsive
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 1 col en mobile, 2 en tablet, 3 en desktop */}
</div>
```

### Testing Responsive
1. Abre DevTools (F12)
2. Haz clic en icono de dispositivo (mobile view)
3. Prueba diferentes tamaños

---

## 🔐 Autenticación

### Verificar Usuario
```typescript
const { user, loading } = useAuth()

if (loading) return <div>Cargando...</div>
if (!user) return router.push('/login')

// Usuario autenticado
```

### Proteger Rutas
La app redirige automáticamente a `/login` si no hay sesión.

---

## 🚀 Agregar Nueva Página

### 1. Crear archivo
```bash
mkdir -p app/nueva-ruta
touch app/nueva-ruta/page.tsx
```

### 2. Código base
```typescript
'use client'

import { useAuth } from '@/hooks/useAuth'
import { Navbar } from '@/components/Navbar'

export default function NuevaRutaPage() {
  const { user } = useAuth()

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1>Nueva Página</h1>
      </main>
    </>
  )
}
```

### 3. Acceder
```
http://localhost:3000/nueva-ruta
```

---

## 🚀 Agregar Nuevo Componente

### 1. Crear archivo
```bash
touch components/NuevoComponente.tsx
```

### 2. Código base
```typescript
'use client'

interface Props {
  prop1: string
}

export function NuevoComponente({ prop1 }: Props) {
  return <div>{prop1}</div>
}
```

### 3. Usar en página
```typescript
import { NuevoComponente } from '@/components/NuevoComponente'

export default function Page() {
  return <NuevoComponente prop1="valor" />
}
```

---

## 📊 Agregar Nueva Tabla a BD

### 1. Crear tabla en Supabase
```sql
CREATE TABLE nueva_tabla (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- columnas aquí
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Agregar tipos
```typescript
// lib/types.ts
export interface NuevaTabla {
  id: string
  // propiedades aquí
}
```

### 3. Usar en código
```typescript
const { data } = await supabase
  .from('nueva_tabla')
  .select('*')
```

---

## 🔄 Actualizar Dependencias

```bash
# Ver qué necesita update
npm outdated

# Actualizar todas
npm update

# O específica
npm install @supabase/supabase-js@latest
```

---

## 📦 Build y Deploy

### Build local
```bash
npm run build
npm run start
```

### Deploy en Vercel
1. Push a GitHub
2. Conecta repo en Vercel
3. Variables de entorno en Vercel
4. Deploy automático

---

## 🐛 Debugging

### Console.log
```typescript
console.log('Debug:', { user, predictions })
```

### DevTools
- F12 → Console
- F12 → Network (requests a Supabase)
- F12 → Elements (inspeccionar DOM)

### Errores de Supabase
```typescript
if (error) {
  console.error('Error code:', error.code)
  console.error('Error message:', error.message)
}
```

---

## ✅ Checklist antes de Commit

- [ ] Código sin console.log de debug
- [ ] Sin errores en la consola
- [ ] Responsive funciona (mobile, tablet, desktop)
- [ ] Tests manuales pasan
- [ ] No hay variables de entorno en el código
- [ ] Tipos TypeScript correctos
- [ ] Tailwind classes correctas

---

## 📚 Recursos para Developers

- [Next.js App Router](https://nextjs.org/docs/app)
- [Supabase JavaScript Docs](https://supabase.com/docs/reference/javascript)
- [Tailwind Class Reference](https://tailwindcss.com/docs)
- [React Hooks Documentation](https://react.dev/reference/react)

---

**Happy Coding! 🚀**
