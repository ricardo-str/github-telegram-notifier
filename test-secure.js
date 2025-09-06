require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

async function testBot() {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('❌ Error: Faltan variables de entorno');
    console.log('📝 Crea un archivo .env con:');
    console.log('TELEGRAM_BOT_TOKEN=tu_token');
    console.log('TELEGRAM_CHAT_ID=tu_chat_id');
    return;
  }
  
  const bot = new TelegramBot(BOT_TOKEN);
  
  try {
    console.log('🤖 Enviando mensaje de prueba...');
    
    const message = `🎉 <b>Bot de Prueba Funcionando!</b>

📌 Esto es una prueba del sistema de notificaciones:
[Auto-asignación de Tareas] @usuario_prueba - Tarea de ejemplo
[PR] @reviewer - <a href="https://github.com/test/repo/pull/1">Pull Request de prueba</a>
[Información] Tarea movida de TODO → In Progress

✅ Si ves este mensaje, el bot está configurado correctamente.`;

    await bot.sendMessage(CHAT_ID, message, { parse_mode: 'HTML' });
    console.log('✅ Mensaje enviado correctamente!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testBot();
