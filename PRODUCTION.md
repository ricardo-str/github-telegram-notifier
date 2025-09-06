# 🔧 Activar Workflows en Producción

## ⚠️ Estado Actual: DESHABILITADO

Los workflows están temporalmente deshabilitados para evitar spam de notificaciones durante el desarrollo.

## 🚀 Para Activar en el Repositorio de Producción

### Paso 1: Editar los Workflows

En cada archivo de `.github/workflows/`:

**Cambiar de:**
```yaml
on:
  workflow_dispatch:  # Solo ejecutar manualmente
  # issues:
  #   types: [assigned, unassigned, opened, closed]
```

**A:**
```yaml
on:
  issues:
    types: [assigned, unassigned, opened, closed]
```

### Paso 2: Archivos a Editar

1. `.github/workflows/issues.yml`
2. `.github/workflows/pull-requests.yml` 
3. `.github/workflows/projects.yml`

### Paso 3: Configurar Secrets en Producción

En el repositorio `paisaje-biblio`:

1. **Settings → Secrets and Variables → Actions**
2. Añadir:
   - `TELEGRAM_BOT_TOKEN`: Token del bot de producción
   - `TELEGRAM_CHAT_ID`: Chat ID del grupo real de avisos

## 🧪 Testing Manual

Mientras están deshabilitados, puedes probar manualmente:

```bash
# Testing local
node test-secure.js
```

## 📧 Notificaciones

Con `workflow_dispatch`, los workflows:
- ✅ No se ejecutan automáticamente (sin spam)
- ✅ Se pueden ejecutar manualmente si es necesario
- ✅ Están listos para activar en producción
