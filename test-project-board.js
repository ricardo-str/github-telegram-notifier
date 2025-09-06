// Simulación de evento de project board para testing
const TelegramNotifier = require('./src/telegram-notifier');

// Simular payload de GitHub para movimiento de project board
const mockProjectEvent = {
  action: 'edited',
  projects_v2_item: {
    id: 'PVI_123'
  },
  changes: {
    field_value: {
      from: 'Todo',
      to: 'In Progress'
    }
  }
};

// Simular contexto de GitHub
const mockGitHubContext = {
  payload: mockProjectEvent,
  eventName: 'projects_v2_item'
};

// Testing manual
async function testProjectBoard() {
  console.log('🧪 Testing simulado de project board...');
  
  // Crear instancia del notificador
  const notifier = new TelegramNotifier();
  
  // Simular el procesamiento
  const message = notifier.formatProjectMessage(mockProjectEvent);
  
  if (message) {
    console.log('✅ Mensaje generado:', message);
    
    // Enviar mensaje de prueba
    try {
      await notifier.sendMessage(`🧪 SIMULACIÓN: ${message}`);
      console.log('✅ Mensaje enviado a Telegram');
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  } else {
    console.log('❌ No se generó mensaje');
  }
}

// Ejecutar test
testProjectBoard();
