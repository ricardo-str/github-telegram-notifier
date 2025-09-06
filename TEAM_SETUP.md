# 👥 Guía de Instalación para el Equipo

Esta guía está dirigida a **administradores** del repositorio `paisaje-biblio` para instalar el sistema de notificaciones automáticas.

## 🎯 Objetivo

Automatizar las notificaciones del canal de Telegram cuando:
- Alguien se asigna una tarea
- Se abre un Pull Request
- Se mueven tareas en el project board

## 📋 Prerrequisitos

- [ ] Permisos de administrador en el repositorio `paisaje-biblio`
- [ ] Acceso al grupo de Telegram de avisos
- [ ] 10-15 minutos para la configuración inicial

## 🚀 Instalación Paso a Paso

### Paso 1: Crear y Configurar el Bot de Telegram

#### 1.1 Crear el Bot
1. Abre Telegram y busca `@BotFather`
2. Envía: `/newbot`
3. Nombre del bot: `Paisaje Biblio Notifier`
4. Username: `paisaje_biblio_bot` (o similar, debe ser único)
5. **Guarda el token** que te proporciona (formato: `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)

#### 1.2 Configurar el Bot en el Grupo
1. Añade el bot al grupo de avisos de Telegram
2. Dale permisos de administrador (para que pueda enviar mensajes)
3. Envía un mensaje mencionando al bot: `@paisaje_biblio_bot test`

#### 1.3 Obtener el Chat ID
1. Ve a esta URL (reemplaza `TU_TOKEN` con el token del bot):
   ```
   https://api.telegram.org/botTU_TOKEN/getUpdates
   ```
2. Busca el objeto `chat` y copia el `id` (será un número negativo como `-1001234567890`)

### Paso 2: Configurar GitHub

#### 2.1 Añadir Secretos
1. Ve a `https://github.com/paisaje-biblio/NOMBRE_DEL_REPO/settings/secrets/actions`
2. Click en "New repository secret"
3. Añade estos dos secretos:

**Secreto 1:**
- Name: `TELEGRAM_BOT_TOKEN`
- Secret: `el token que te dio BotFather`

**Secreto 2:**
- Name: `TELEGRAM_CHAT_ID`
- Secret: `el chat ID que obtuviste (número negativo)`

#### 2.2 Habilitar GitHub Actions
1. Ve a `Settings → Actions → General`
2. En "Actions permissions" selecciona: **"Allow all actions and reusable workflows"**
3. En "Workflow permissions" selecciona: **"Read and write permissions"**
4. Click "Save"

### Paso 3: Instalar el Código

#### 3.1 Opción A: Copiar Archivos Manualmente
1. Crea estas carpetas en tu repositorio principal:
   ```
   .github/workflows/
   src/
   ```

2. Copia estos archivos del proyecto de notificaciones:
   - `.github/workflows/issues.yml`
   - `.github/workflows/pull-requests.yml`
   - `.github/workflows/projects.yml`
   - `src/telegram-notifier.js`
   - `package.json`

#### 3.2 Opción B: Subtree (Avanzado)
```bash
git subtree add --prefix=.telegram-notifier https://github.com/TU_USUARIO/github-telegram-notifier.git main --squash
```

### Paso 4: Verificar Instalación

#### 4.1 Test de Issues
1. Crea una issue de prueba
2. Asígnate la issue
3. Verifica que llegue el mensaje a Telegram: `[Auto-asignación de Tareas] @tu_usuario - Título de la issue`

#### 4.2 Test de PR
1. Crea un PR de prueba
2. Verifica que llegue el mensaje: `[PR] @team - Link al PR por @tu_usuario`

#### 4.3 Test de Project Board
1. Mueve una card de TODO a In Progress
2. Verifica que llegue: `[Información] Tarea movida de TODO → In Progress`

## 🔧 Configuración del Project Board

Para que funcionen las notificaciones del project board, asegúrate de que:

1. **El project esté vinculado al repositorio**:
   - Ve a tu project: `https://github.com/orgs/paisaje-biblio/projects/1`
   - Settings → Manage access → Linked repositories
   - Añade tu repositorio si no está

2. **Los nombres de las columnas sean exactos**:
   - `Todo` (o `TODO`)
   - `In Progress`
   - `Done`

## 👥 Comunicar al Equipo

Una vez instalado, informa al equipo que:

✅ **Ya no necesitan enviar manualmente**:
- `[Auto-asignación de Tareas]`
- `[PR]` 
- `[Información]` de movimientos de tareas

✅ **Sigue siendo manual**:
- `[Reunión]`
- `[Recordatorio]`

## 🆘 Troubleshooting

### El bot no responde
- Verifica que esté añadido al grupo
- Verifica que tenga permisos de administrador
- Revisa que el `TELEGRAM_CHAT_ID` sea correcto (número negativo)

### GitHub Actions falla
- Ve a Actions tab y revisa los logs
- Verifica que los secretos estén configurados correctamente
- Asegúrate de que GitHub Actions esté habilitado

### No detecta cambios del project
- Verifica que el project esté vinculado al repositorio
- Los eventos de Projects v2 pueden tardar unos minutos en propagarse

## 📞 Soporte

Si algo no funciona:
1. Revisa los logs en GitHub Actions
2. Verifica la configuración paso a paso
3. Contacta al administrador del sistema

---

**¡Listo!** 🎉 El sistema debería estar funcionando automáticamente.
