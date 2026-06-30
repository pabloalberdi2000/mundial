# ✅ Login Actualizado - Username Libre

El login ha sido **actualizado para aceptar cualquier username** sin validación de email.

## 🎯 Cambios Realizados

### ✅ Antes
- Campo obligatorio: Email (`test@example.com`)
- Validación: Formato email requerido
- Conexión: Supabase Auth

### ✅ Ahora
- Campo libre: Username (cualquier texto)
- Validación: Solo que no esté vacío
- Almacenamiento: localStorage (sin Supabase Auth)

---

## 📝 Cómo Funciona

### Login
```
1. Usuario ingresa: username = "Juan"
2. Usuario ingresa: password = "cualquier cosa"
3. Se guarda en localStorage:
   - userUsername = "Juan"
   - authToken = "token_1234567890"
4. Redirige a /porra
```

### Predicciones
```
El username "Juan" se usa automáticamente para:
- Guardar predicciones: username = "Juan"
- Cargar predicciones: SELECT WHERE username = "Juan"
- Base de datos: Se almacena como username en tabla predictions
```

---

## 🔑 Credenciales para Probar

Puedes usar **cualquier combinación**:

| Usuario | Contraseña | Resultado |
|---------|-----------|-----------|
| Juan | 123 | ✅ Funciona |
| pepe | xyz | ✅ Funciona |
| admin | pass | ✅ Funciona |
| cualquiera | algo | ✅ Funciona |

**No necesitas credenciales de Supabase**, el login es local.

---

## 🚀 Pasos para Probar

```bash
cd /Users/alberdi/Desktop/mundial
npm install
npm run dev
```

1. Ve a http://localhost:3000
2. Ingresa un usuario: `mi_usuario`
3. Ingresa una contraseña: `mi_contraseña`
4. Haz clic en "Iniciar Sesión"
5. ¡Deberías ir a /porra!

---

## 💾 Base de Datos

Cuando guardes predicciones:

```
username = "mi_usuario"  ← El username que ingresaste en login
match_id = "match-1"
home_score = 2
away_score = 1
```

En Supabase → Table Editor → `predictions`:
- Columna `username` tendrá el valor que ingresaste en login

---

## 📊 Archivos Modificados

1. **app/login/page.tsx**
   - Cambió de `email` a `username`
   - Cambió validación (ahora solo texto)
   - Guarda en localStorage

2. **hooks/useAuth.ts**
   - Ahora lee del localStorage
   - No usa Supabase Auth
   - Devuelve usuario desde localStorage

3. **app/porra/page.tsx**
   - Usa `username` del localStorage
   - Guardar y cargar predicciones con username

---

## ⚙️ Configuración de la BD

La tabla `predictions` sigue siendo igual:

```sql
CREATE TABLE predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,      -- Aquí va tu username
  match_id TEXT NOT NULL,
  home_score INT NOT NULL,
  away_score INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(username, match_id)
);
```

El campo `username` almacena el texto que ingresas en login.

---

## 🔐 Nota de Seguridad

⚠️ **Importante**: Este login es para desarrollo/testing.

Para producción, deberías:
- Validar usuario contra una tabla `users` en BD
- Implementar hashing de contraseñas
- Usar sesiones/JWT seguros
- No guardar credenciales en localStorage

---

## ✅ Checklist

- [ ] Ejecuté `npm install`
- [ ] Ejecuté `npm run dev`
- [ ] Abrí http://localhost:3000
- [ ] Ingresé un usuario (ej: "Juan")
- [ ] Ingresé una contraseña (ej: "123")
- [ ] Hice clic en "Iniciar Sesión"
- [ ] Llegué a /porra
- [ ] Vi los partidos
- [ ] Ingresé goles
- [ ] Hice clic en "Guardar Predicciones"
- [ ] Vi ✅ "Predicciones guardadas correctamente!"
- [ ] Verifiqué en Supabase que username aparece correcto

---

¡Login actualizado y listo para usar! 🚀

