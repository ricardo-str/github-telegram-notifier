# 🔒 Guía de Testing Seguro

## Variables de Entorno

Para testing local, crea un archivo `.env` (que NO se sube a GitHub):

```bash
TELEGRAM_BOT_TOKEN=tu_nuevo_token_aqui
TELEGRAM_CHAT_ID=tu_chat_id
```

## Ejecutar Tests

```bash
# Instalar dependencias
npm install

# Ejecutar test seguro
node test-secure.js
```

## ⚠️ Seguridad

- ✅ Los tokens están en `.env` (no en el código)
- ✅ `.env` está en `.gitignore`
- ✅ Los archivos de test con tokens están excluidos
- ✅ GitHub Actions usa secrets (no variables hardcodeadas)

## 🔄 Si Expones un Token Accidentalmente

1. Ve a @BotFather en Telegram
2. Envía `/revoke` y selecciona tu bot
3. Envía `/token` para generar uno nuevo
4. Actualiza tus variables de entorno y secrets de GitHub
