# 🧪 Instrucciones de Instalación en Fork

## 📁 Archivos a Copiar al Fork

Una vez que hayas hecho fork de `paisaje-biblio/web-ui`, copia estos archivos:

### 1. Crear Estructura de Carpetas
```
.github/workflows/
src/
```

### 2. Copiar Archivos
- `testing-fork/workflows/issues.yml` → `.github/workflows/issues.yml`
- `testing-fork/workflows/pull-requests.yml` → `.github/workflows/pull-requests.yml`  
- `testing-fork/workflows/projects.yml` → `.github/workflows/projects.yml`
- `src/telegram-notifier.js` → `src/telegram-notifier.js`
- `testing-fork/package.json` → `package.json` (solo añadir las dependencias)

## ⚙️ Configurar Secrets

En tu fork: `https://github.com/ricardo-str/web-ui/settings/secrets/actions`

Añadir:
- `TELEGRAM_BOT_TOKEN`: `7616245560:AAGOCGyHKzgERXWCgGl59lmvVsNvF325Nwc`
- `TELEGRAM_CHAT_ID`: `-4862243575` (tu grupo de prueba)

## 🔧 Habilitar GitHub Actions

1. Ve a la pestaña "Actions" en tu fork
2. Click "I understand my workflows, go ahead and enable them"

## 🧪 Testing

1. **Crear issue** en el fork
2. **Asignarte** la issue
3. **Crear PR** de prueba
4. **Verificar notificaciones** en el grupo de prueba

## 🎯 Para Project Board

Si quieres probar movimientos de project board:
1. Ve a: `https://github.com/orgs/paisaje-biblio/projects/1`
2. Settings → Manage access → Linked repositories  
3. Añadir tu fork: `ricardo-str/web-ui`
4. Crear issue en el fork y añadirla al project board
5. Mover entre columnas y ver notificaciones
