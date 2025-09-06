# 🤖 GitHub to Telegram Notifier

Automatización de notificaciones del backlog de GitHub Projects a Telegram siguiendo la nomenclatura establecida del equipo.

## 📋 Características

- ✅ **[Auto-asignación de Tareas]** - Notifica cuando alguien se asigna una issue
- ✅ **[PR]** - Notifica cuando se abre un Pull Request
- ✅ **[Información]** - Notifica movimientos de tareas en el project board (TODO → In Progress → Done)
- 🔄 Totalmente automático usando GitHub Actions
- 💰 Completamente gratuito (usa la infraestructura de GitHub)

## 🚀 Instalación Rápida

### Paso 1: Crear el Bot de Telegram

1. Abre Telegram y busca a `@BotFather`
2. Envía `/newbot` y sigue las instrucciones
3. Guarda el **token del bot** que te dará
4. Añade el bot a tu grupo de avisos
5. Para obtener el **Chat ID**:
   - Envía un mensaje al grupo mencionando al bot
   - Ve a: `https://api.telegram.org/bot{TU_BOT_TOKEN}/getUpdates`
   - Busca el `chat.id` en la respuesta (será un número negativo para grupos)

### Paso 2: Configurar el Repositorio

1. **Fork o clona este repositorio** a tu GitHub personal
2. Ve a **Settings → Secrets and Variables → Actions**
3. Añade estos secretos:
   - `TELEGRAM_BOT_TOKEN`: El token que te dio BotFather
   - `TELEGRAM_CHAT_ID`: El ID del chat de tu grupo (número negativo)

### Paso 3: Activar en tu Organización

1. Ve al repositorio de tu organización (`paisaje-biblio`)
2. En **Settings → Actions → General**:
   - Marca "Allow all actions and reusable workflows"
3. Copia los archivos `.github/workflows/` a tu repositorio principal
4. Copia `src/telegram-notifier.js` y `package.json` también

## ⚙️ Configuración Avanzada

### Personalizar Mensajes

Edita `src/telegram-notifier.js` para modificar los formatos de mensaje:

```javascript
// Ejemplo: cambiar formato de auto-asignación
formatAssignmentMessage(payload) {
  const { action, issue, assignee } = payload;
  if (action === 'assigned' && assignee) {
    return `🎯 [Auto-asignación] @${assignee.login} tomó: ${issue.title}`;
  }
  return null;
}
```

### Añadir Nuevos Tipos de Notificación

1. Edita el método correspondiente en `telegram-notifier.js`
2. Añade nuevos eventos en los workflows de `.github/workflows/`

## 📱 Para el Equipo: Cómo Usar

### Auto-asignación de Tareas
- **Qué hace**: Cuando te asignas una issue, el bot notifica automáticamente
- **Cómo activar**: Simplemente asígnate la issue en GitHub
- **Mensaje**: `[Auto-asignación de Tareas] @tu_usuario - Nombre de la tarea`

### Notificaciones de PR
- **Qué hace**: Cuando abres un PR, notifica automáticamente
- **Cómo activar**: Abre un PR normal
- **Mensaje**: `[PR] @reviewers - Link al PR por @autor`

### Movimientos de Tareas
- **Qué hace**: Cuando mueves una card en el project board
- **Cómo activar**: Arrastra la card entre columnas (TODO → In Progress → Done)
- **Mensaje**: `[Información] Tarea movida de TODO → In Progress`

## 🔧 Troubleshooting

### El bot no envía mensajes
1. Verifica que el bot esté en el grupo de Telegram
2. Verifica que los secretos `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID` estén correctos
3. Revisa los logs en Actions → Workflow runs

### No detecta movimientos del project board
- Los eventos de Projects v2 a veces tardan en propagarse
- Verifica que el project esté vinculado al repositorio

### Mensajes duplicados
- Puede pasar si varios repositories tienen el workflow activado
- Desactiva los workflows en repositories secundarios

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
export TELEGRAM_BOT_TOKEN="tu_token"
export TELEGRAM_CHAT_ID="tu_chat_id"

# Ejecutar localmente (requiere payload de GitHub)
node src/telegram-notifier.js
```

## 📝 Estructura del Proyecto

```
github-telegram-notifier/
├── .github/workflows/          # GitHub Actions
│   ├── issues.yml             # Notificaciones de issues
│   ├── pull-requests.yml      # Notificaciones de PRs
│   └── projects.yml           # Notificaciones de project board
├── src/
│   └── telegram-notifier.js   # Script principal
├── package.json               # Dependencias
└── README.md                  # Esta documentación
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - puedes usar este código libremente para tus proyectos.

---

¿Problemas? Abre un issue en este repositorio o contacta al equipo 💬
