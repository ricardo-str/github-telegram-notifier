# Ejemplos de Configuración

## Variables de Entorno para Testing Local

Crea un archivo `.env` (no incluido en git) para testing local:

```bash
TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
TELEGRAM_CHAT_ID=-1001234567890
```

## Ejemplo de Payload de GitHub

Para testing local, puedes simular eventos de GitHub:

### Issue Assignment Event
```json
{
  "action": "assigned",
  "issue": {
    "title": "Implementar sistema de login",
    "number": 42,
    "html_url": "https://github.com/paisaje-biblio/repo/issues/42"
  },
  "assignee": {
    "login": "rsepulveda"
  }
}
```

### Pull Request Event
```json
{
  "action": "opened",
  "pull_request": {
    "title": "Feature: Add login system",
    "number": 15,
    "html_url": "https://github.com/paisaje-biblio/repo/pull/15",
    "user": {
      "login": "rsepulveda"
    },
    "body": "Este PR implementa el sistema de login. @reviewer1 @reviewer2 por favor revisen."
  }
}
```

### Project Board Event
```json
{
  "action": "edited",
  "projects_v2_item": {
    "id": "PVI_123"
  },
  "changes": {
    "field_value": {
      "from": "Todo",
      "to": "In Progress"
    }
  }
}
```

## Testing Manual

Para probar el script localmente:

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
export TELEGRAM_BOT_TOKEN="tu_token"
export TELEGRAM_CHAT_ID="tu_chat_id"

# Simular evento con GitHub context (requiere @actions/github)
node -e "
const github = require('@actions/github');
const TelegramNotifier = require('./src/telegram-notifier');

// Simular payload de issue assignment
github.context.payload = {
  action: 'assigned',
  issue: {
    title: 'Test issue',
    number: 1
  },
  assignee: {
    login: 'testuser'
  }
};
github.context.eventName = 'issues';

const notifier = new TelegramNotifier();
notifier.processWebhook();
"
```
