# 📋 Guía de Instalación - web-api (Secundario)

## 🎯 Configuración para web-api

Este repositorio tendrá notificaciones **limitadas** para evitar duplicados:
- ✅ [Auto-asignación de Tareas] (con prefijo [API])
- ✅ [PR] (con prefijo [API])
- ❌ [Información] - Project board (solo en web-ui)

## 📥 Archivos a Copiar

Desde tu repo `github-telegram-notifier`, copia estos archivos a `web-api`:

```
workflows-web-api/issues-api.yml        → .github/workflows/issues.yml
workflows-web-api/pull-requests-api.yml → .github/workflows/pull-requests.yml
src/telegram-notifier-multi-repo.js     → src/telegram-notifier.js
package.json (solo las dependencias necesarias)
```

## ⚙️ Configuración en GitHub

### Secrets a Añadir:
1. Ve a: `https://github.com/paisaje-biblio/web-api/settings/secrets/actions`
2. Añade:
   - `TELEGRAM_BOT_TOKEN`: **El mismo token** que en web-ui
   - `TELEGRAM_CHAT_ID`: **El mismo Chat ID** que en web-ui

### Habilitar Actions:
1. Settings → Actions → General
2. "Allow all actions and reusable workflows"
3. "Read and write permissions"

## 🔍 Diferencias con web-ui

### Los mensajes tendrán prefijo [API]:
- `[API] [Auto-asignación de Tareas] @usuario - Tarea`
- `[API] [PR] @reviewer - Link por @autor`

### NO incluye:
- Workflow de projects.yml
- Notificaciones de movimientos del project board

## ✅ Testing

1. Crear issue de prueba en web-api
2. Asignarse la issue
3. Verificar notificación: `[API] [Auto-asignación de Tareas] @tu_usuario - ...`
