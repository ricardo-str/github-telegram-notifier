# 📋 Flujo de Estados del Project Board

## 🔄 Estados Disponibles

El sistema reconoce 6 estados en el project board de paisaje-biblio:

| Estado | Emoji | Descripción |
|--------|-------|-------------|
| **No Status** | ⚪ | Tarea sin estado asignado |
| **On Hold** | ⏸️ | Tarea pausada temporalmente |
| **Todo** | 📋 | Tarea pendiente por hacer |
| **In Progress** | 🔄 | Tarea en desarrollo activo |
| **Review** | 👀 | Tarea en revisión/testing |
| **Done** | ✅ | Tarea completada |

## 📱 Ejemplos de Notificaciones

### Movimientos Típicos:

```
[Información] Tarea movida ⚪ No Status → 📋 TODO
[Información] Tarea movida 📋 TODO → 🔄 In Progress  
[Información] Tarea movida 🔄 In Progress → 👀 Review
[Información] Tarea movida 👀 Review → ✅ DONE
[Información] Tarea movida 🔄 In Progress → ⏸️ On Hold
[Información] Tarea movida ⏸️ On Hold → 🔄 In Progress
```

### Flujos Comunes:

**Flujo Normal:**
```
No Status → TODO → In Progress → Review → Done
```

**Con Pausa:**
```
TODO → In Progress → On Hold → In Progress → Review → Done
```

**Retroceso por Revisión:**
```
Review → In Progress → Review → Done
```

## 🎯 Configuración

Los nombres de columna deben coincidir **exactamente** con:
- `No Status`
- `On Hold` 
- `Todo`
- `In Progress`
- `Review`
- `Done`

## 🔧 Personalización

Si necesitas cambiar los nombres o emojis, edita el objeto `statusMap` y `statusEmojis` en:
- `src/telegram-notifier.js` (versión simple)
- `src/telegram-notifier-multi-repo.js` (versión multi-repo)
