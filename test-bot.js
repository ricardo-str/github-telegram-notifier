const TelegramBot = require('node-telegram-bot-api');

// IMPORTANTE: Reemplaza estos valores con los tuyos
const BOT_TOKEN = '7616245560:AAEL2UxyKuLQlh4bRHuEJnLOTuxeySReTko';
const CHAT_ID = -4862243575; // Tu Chat ID del grupo

async function testBot() {
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
    console.log('\n🔧 Posibles soluciones:');
    console.log('1. Verifica que el CHAT_ID sea correcto (número negativo)');
    console.log('2. Asegúrate de que el bot esté añadido al grupo');
    console.log('3. Verifica que el token sea correcto');
  }
}

testBot();
