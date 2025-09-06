# 📋 Guía de Instalación - web-ui (Principal)

## 🎯 Configuración para web-ui

Este repositorio tendrá **todas** las notificaciones:
- [Auto-asignación de Tareas]
- [PR] 
- [Información] - Movimientos de project board

## 📥 Archivos a Copiar

Desde tu repo `github-telegram-notifier`, copia estos archivos a `web-ui`:

```
.github/workflows/issues.yml
.github/workflows/pull-requests.yml  
.github/workflows/projects.yml
src/telegram-notifier.js
package.json (solo las dependencias necesarias)
```

## ⚙️ Configuración en GitHub

### Secrets a Añadir:
1. Ve a: `https://github.com/paisaje-biblio/web-ui/settings/secrets/actions`
2. Añade:
   - `TELEGRAM_BOT_TOKEN`: Token del bot de producción
   - `TELEGRAM_CHAT_ID`: Chat ID del grupo real de avisos

### Habilitar Actions:
1. Settings → Actions → General
2. "Allow all actions and reusable workflows"
3. "Read and write permissions"

## 🔧 Modificaciones Necesarias

### En los workflows, cambiar de:
```yaml
on:
  workflow_dispatch:  # Solo ejecutar manualmente
  # issues:
  #   types: [assigned, unassigned, opened, closed]
```

### A:
```yaml
on:
  issues:
    types: [assigned, unassigned, opened, closed]
```

Hacer esto en los 3 archivos de workflow.

## ✅ Testing

1. Crear issue de prueba en web-ui
2. Asignarse la issue
3. Verificar notificación en Telegram
