const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = '7616245560:AAEL2UxyKuLQlh4bRHuEJnLOTuxeySReTko';

async function getChatId() {
  const bot = new TelegramBot(BOT_TOKEN);
  
  console.log('🤖 Esperando mensajes...');
  console.log('📱 Envía un mensaje en tu grupo mencionando al bot: @GitToTelegramBot test');
  console.log('⏰ Esperaré 30 segundos...\n');
  
  // Escuchar mensajes por 30 segundos
  bot.on('message', (msg) => {
    console.log('✅ ¡Mensaje recibido!');
    console.log('📊 Chat ID:', msg.chat.id);
    console.log('📝 Tipo de chat:', msg.chat.type);
    console.log('👥 Nombre del chat:', msg.chat.title || msg.chat.first_name);
    console.log('\n🎯 Tu Chat ID es:', msg.chat.id);
    console.log('\n💾 Guarda este número para la configuración:');
    console.log('TELEGRAM_CHAT_ID =', msg.chat.id);
    
    process.exit(0);
  });
  
  // Timeout después de 30 segundos
  setTimeout(() => {
    console.log('⏰ Tiempo agotado. No se recibieron mensajes.');
    console.log('\n🔧 Verifica que:');
    console.log('1. El bot esté añadido al grupo');
    console.log('2. Hayas enviado un mensaje mencionando al bot');
    console.log('3. El token del bot sea correcto');
    process.exit(1);
  }, 30000);
}

getChatId();
