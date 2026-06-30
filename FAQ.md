# ❓ Preguntas Frecuentes - Porra Mundial

## Instalación y Setup

### ¿Qué necesito para empezar?
- Node.js 18+
- npm o yarn
- Cuenta en Supabase
- Editor de código (VS Code recomendado)

### ¿Cómo configuro Supabase?
1. Ve a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. En SQL Editor, copia `DATABASE_SETUP.sql`
4. Ejecuta la query
5. Copia las credenciales a `.env.local`

### ¿Dónde coloco las credenciales de Supabase?
En el archivo `.env.local` (crea una copia de `.env.example`):
```
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
```

### ¿El .env.local se versionea en git?
**NO**. Siempre está en `.gitignore` por seguridad.

---

## Desarrollo

### ¿Cómo agrego una nueva página?
1. Crea carpeta: `mkdir app/nueva-pagina`
2. Crea archivo: `app/nueva-pagina/page.tsx`
3. Escribe el código React
4. Accede vía `http://localhost:3000/nueva-pagina`

### ¿Cómo agrego un nuevo componente?
1. Crea archivo: `components/MiComponente.tsx`
2. Escribe código React
3. Importa en la página: `import { MiComponente } from '@/components/MiComponente'`
4. Usa: `<MiComponente />`

### ¿Cómo hago una query a Supabase?
```typescript
const { data, error } = await supabase
  .from('tabla_nombre')
  .select('*')
  .eq('columna', valor)
```

### ¿TypeScript es obligatorio?
No, pero se recomienda. Puedes usar JSX directamente, pero pierde tipos.

### ¿Cómo manejo los errores?
```typescript
const { data, error } = await supabase.from('tabla').select('*')

if (error) {
  console.error('Error:', error.message)
  setErrorMessage(error.message)
  return
}
```

---

## Autenticación

### ¿Cómo protejo una ruta?
El hook `useAuth()` automáticamente redirige a `/login` si no hay sesión.

### ¿Cómo accedo a los datos del usuario?
```typescript
const { user } = useAuth()
console.log(user.email)
```

### ¿Puedo usar otros métodos de login?
Sí, Supabase soporta OAuth (Google, GitHub, etc.). Ver [docs](https://supabase.com/docs/guides/auth).

### ¿Las contraseñas se guardan en la BD?
No. Supabase las encripta y las almacena en su sistema de autenticación.

---

## Base de Datos

### ¿Puedo ver los datos?
Sí, en Supabase → Table Editor → selecciona tabla.

### ¿Cómo agriego una nueva tabla?
1. En Supabase SQL Editor
2. Escribe `CREATE TABLE ...`
3. Ejecuta
4. Actualiza tipos en `lib/types.ts`

### ¿Puedo hacer queries complejas?
Sí, Supabase soporta joins, agregaciones, etc.

### ¿Se borran los datos si reinicio la app?
No. Están en la BD (Supabase), persisten siempre.

---

## Errores Comunes

### "NEXT_PUBLIC_SUPABASE_URL is not defined"
**Causa**: `.env.local` no existe o no tiene las variables
**Solución**: 
```bash
cp .env.example .env.local
# Edita .env.local con tus credenciales
npm run dev  # Reinicia servidor
```

### "Cannot find module"
**Causa**: Dependencia no instalada
**Solución**:
```bash
npm install
```

### "Auth error: Invalid login credentials"
**Causa**: Email o contraseña incorrectos
**Solución**: Verifica en Supabase que el usuario exista

### "No rows returned"
**Causa**: No hay datos que cumplan la condición
**Solución**: Verifica que los datos existan en la tabla

### "Relation 'predictions' does not exist"
**Causa**: Tabla no fue creada
**Solución**: Ejecuta `DATABASE_SETUP.sql` en Supabase

### "Las predicciones no se guardan"
**Causa**: Error en el upsert o permisos insuficientes
**Solución**: 
1. Abre DevTools (F12) → Network
2. Busca la request "upsert"
3. Revisa el error en la respuesta

---

## Deployment

### ¿Cómo hago deploy?
**Opción 1**: Vercel
1. Push a GitHub
2. Importa repo en [vercel.com](https://vercel.com)
3. Agrega variables de entorno
4. Deploy

**Opción 2**: Netlify
Similar a Vercel

### ¿Las variables de entorno se copian automáticamente?
No. Debes agregar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` en el dashboard del hosting.

### ¿Puedo usar un dominio personalizado?
Sí. Tanto Vercel como Netlify lo soportan.

---

## Rendimiento

### ¿Por qué carga lenta?
1. Verifica la conexión a internet
2. Revisa Devtools → Network → ver requests a Supabase
3. Aumenta los índices en BD si hay muchos datos

### ¿Cómo optimizo la carga?
- Usa `useMemo()` para evitar cálculos innecesarios
- Implementa caché en localStorage
- Usa Supabase Realtime para sincronización

### ¿Cuántos usuarios soporta?
Depende del plan de Supabase. El gratuito soporta ~50k requests/mes.

---

## Personalización

### ¿Cómo cambio los colores?
Edita `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#tu-color',
    }
  }
}
```

### ¿Cómo cambio los nombres de equipos?
Edita el array `MOCK_MATCHES` en `app/porra/page.tsx`.

### ¿Cómo agrego más partidos?
1. Opción A: Agrega al array en la página
2. Opción B: Crea tabla `matches` en BD y fetch desde ahí

### ¿Cómo cambio el logo?
Reemplaza el emoji `⚽` en `components/Navbar.tsx` y `app/login/page.tsx`.

---

## Extensiones

### ¿Cómo agrego un leaderboard?
1. Crea `app/leaderboard/page.tsx`
2. Fetch todas las predicciones y resultados
3. Calcula puntos por predicción correcta
4. Ordena por puntos descendente

### ¿Cómo comparo con resultados reales?
1. Crea tabla `results` (ver `DATABASE_SETUP.sql`)
2. Inserta resultados cuando se jueguen los partidos
3. Compara `predictions.home_score === results.home_score`

### ¿Cómo agrego dark mode?
Tailwind tiene soporte nativo:
```typescript
<div className="bg-white dark:bg-black">
```

### ¿Cómo agrego notificaciones?
Usa Web Push API o servicio externo (Firebase, Pusher, etc.)

---

## Contribución

### ¿Puedo modificar el proyecto?
Sí, es de código abierto (MIT License).

### ¿Debo dar créditos?
Aprecia los créditos, pero no es obligatorio.

### ¿Cómo reporto bugs?
Abre un issue en GitHub con:
- Descripción del problema
- Pasos para reproducir
- Captura de pantalla (si aplica)
- Versión de Node.js

---

## Miscelánea

### ¿Necesito conocer PostgreSQL?
No. Supabase abstrajo la mayoría de complejidad.

### ¿Puedo usar Supabase Realtime?
Sí. Ver [docs](https://supabase.com/docs/guides/realtime).

### ¿Hay limitaciones de uso?
Sí, depende del plan de Supabase. El gratuito tiene límites, el Pro es ilimitado.

### ¿Dónde puedo hacer preguntas?
- Discord de Supabase
- Stack Overflow con tag `supabase`
- Comunidad de Next.js
- Issues en GitHub

---

## Contacto y Soporte

**Docs Oficiales**:
- [Next.js](https://nextjs.org/docs)
- [Supabase](https://supabase.com/docs)
- [Tailwind](https://tailwindcss.com/docs)

**Comunidades**:
- [Discord Supabase](https://discord.supabase.com)
- [Discord Next.js](https://discord.gg/hxrARJ7)
- Stack Overflow

---

¿No encuentras la respuesta? Abre un issue o pregunta en la comunidad. 🚀
