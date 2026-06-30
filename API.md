# 📡 Documentación de APIs - Porra Mundial

## Autenticación (Supabase Auth)

### Sign In
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
})
```

**Respuesta exitosa:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "user_metadata": {}
  },
  "session": {
    "access_token": "jwt_token",
    "expires_in": 3600
  }
}
```

### Get Session
```typescript
const { data: { session } } = await supabase.auth.getSession()
```

### Sign Out
```typescript
await supabase.auth.signOut()
```

### On Auth State Change
```typescript
const { data: { subscription } } = supabase.auth.onAuthStateChange(
  (event, session) => {
    console.log(event, session)
  }
)
```

## Predicciones (Database)

### Fetch Predicciones del Usuario
```typescript
const { data, error } = await supabase
  .from('predictions')
  .select('*')
  .eq('username', user.email)
```

**Respuesta:**
```json
[
  {
    "id": "uuid",
    "username": "user@example.com",
    "match_id": "match-1",
    "home_score": 2,
    "away_score": 1,
    "created_at": "2026-01-01T10:00:00Z",
    "updated_at": "2026-01-01T10:30:00Z"
  }
]
```

### Upsert Predicciones
```typescript
const { error } = await supabase
  .from('predictions')
  .upsert([
    {
      username: user.email,
      match_id: 'match-1',
      home_score: 2,
      away_score: 1,
    },
    {
      username: user.email,
      match_id: 'match-2',
      home_score: 3,
      away_score: 0,
    }
  ], {
    onConflict: 'username,match_id'
  })
```

**Comportamiento:**
- Si el registro existe: lo actualiza
- Si no existe: lo crea
- `onConflict` indica la columna única

### Fetch Todas las Predicciones
```typescript
const { data, error } = await supabase
  .from('predictions')
  .select('*')
  .eq('match_id', 'match-1')
```

### Eliminar Predicción
```typescript
const { error } = await supabase
  .from('predictions')
  .delete()
  .eq('username', user.email)
  .eq('match_id', 'match-1')
```

## Resultados (Database)

### Fetch Resultados
```typescript
const { data, error } = await supabase
  .from('results')
  .select('*')
  .order('match_date', { ascending: false })
```

### Insertar Resultado
```typescript
const { error } = await supabase
  .from('results')
  .insert([
    {
      match_id: 'match-1',
      home_team: 'Argentina',
      away_team: 'Brasil',
      home_score: 2,
      away_score: 1,
    }
  ])
```

### Comparar Predicción con Resultado
```typescript
const { data: predictions } = await supabase
  .from('predictions')
  .select('*')
  .eq('match_id', 'match-1')

const { data: result } = await supabase
  .from('results')
  .select('*')
  .eq('match_id', 'match-1')
  .single()

const isCorrect = 
  predictions[0].home_score === result.home_score &&
  predictions[0].away_score === result.away_score
```

## Manejo de Errores

### Error Handling Básico
```typescript
const { data, error } = await supabase
  .from('predictions')
  .select('*')

if (error) {
  console.error('Error:', error.message)
  // Mostrar mensaje al usuario
}
```

### Tipos de Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `PGRST301` | Tabla no existe | Crear tabla en Supabase |
| `42P01` | Columna no existe | Verificar nombres de columnas |
| `23505` | Violación de UNIQUE | Usar upsert en lugar de insert |
| `42883` | Función no existe | Usar sintaxis correcta |
| `401` | No autenticado | Hacer login |
| `403` | Acceso denegado | Revisar RLS policies |

## Rate Limiting

- **Auth requests**: 60/min por IP
- **Database requests**: Sin límite (depende del plan)

## Ejemplos de Uso Completo

### Login y Fetch Predicciones
```typescript
const { error: signInError } = await supabase.auth
  .signInWithPassword({ email, password })

if (signInError) throw new Error(signInError.message)

const { data: { session } } = await supabase.auth.getSession()

const { data: predictions } = await supabase
  .from('predictions')
  .select('*')
  .eq('username', session.user.email)
```

### Guardar Múltiples Predicciones
```typescript
const predictionsToSave = Array.from(predictionsMap.values())
  .map(pred => ({
    username: user.email,
    match_id: pred.match_id,
    home_score: pred.home_score,
    away_score: pred.away_score,
  }))

const { error } = await supabase
  .from('predictions')
  .upsert(predictionsToSave, {
    onConflict: 'username,match_id'
  })
```

## Real-time Subscriptions (Avanzado)

```typescript
const subscription = supabase
  .from('predictions')
  .on('*', payload => {
    console.log('Cambio:', payload)
  })
  .subscribe()

// Desuscribirse
subscription.unsubscribe()
```

---

Para más información: [Supabase Docs](https://supabase.com/docs)
