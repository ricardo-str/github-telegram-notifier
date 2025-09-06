const core = require('@actions/core');
const github = require('@actions/github');
const TelegramBot = require('node-telegram-bot-api');

class TelegramNotifier {
  constructor() {
    this.botToken = core.getInput('telegram-bot-token') || process.env.TELEGRAM_BOT_TOKEN;
    this.chatId = core.getInput('telegram-chat-id') || process.env.TELEGRAM_CHAT_ID;
    this.bot = new TelegramBot(this.botToken);
  }

  async sendMessage(message) {
    try {
      await this.bot.sendMessage(this.chatId, message, { parse_mode: 'HTML' });
      console.log('Mensaje enviado a Telegram:', message);
    } catch (error) {
      console.error('Error enviando mensaje a Telegram:', error);
      core.setFailed(`Error enviando mensaje: ${error.message}`);
    }
  }

  formatAssignmentMessage(payload) {
    const { action, issue, assignee } = payload;
    if (action === 'assigned' && assignee) {
      const taskTitle = issue.title;
      const assigneeName = assignee.login;
      return `[Auto-asignación de Tareas] @${assigneeName} - ${taskTitle}`;
    }
    return null;
  }

  formatPRMessage(payload) {
    const { action, pull_request } = payload;
    if (action === 'opened' || action === 'ready_for_review') {
      const prTitle = pull_request.title;
      const author = pull_request.user.login;
      const prUrl = pull_request.html_url;
      
      // Buscar reviewers en la descripción o asignar a todos
      const reviewers = this.extractReviewers(pull_request);
      const reviewersMention = reviewers.length > 0 ? reviewers.map(r => `@${r}`).join(' ') : '@team';
      
      return `[PR] ${reviewersMention} - <a href="${prUrl}">${prTitle}</a> por @${author}`;
    }
    return null;
  }

  formatProjectMessage(payload) {
    const { action, projects_v2_item } = payload;
    if (action === 'edited' && projects_v2_item) {
      // Este evento se dispara cuando se mueve una card en el project board
      const changes = payload.changes;
      if (changes && changes.field_value) {
        const oldValue = changes.field_value.from;
        const newValue = changes.field_value.to;
        
        // Mapear estados del project - actualizado para 6 columnas
        const statusMap = {
          'No Status': 'No Status',
          'On Hold': 'On Hold', 
          'Todo': 'TODO',
          'In Progress': 'In Progress',
          'Review': 'Review',
          'Done': 'DONE'
        };

        const fromStatus = statusMap[oldValue] || oldValue;
        const toStatus = statusMap[newValue] || newValue;
        
        if (fromStatus !== toStatus) {
          // Añadir emojis para mejor visualización
          const statusEmojis = {
            'No Status': '⚪',
            'On Hold': '⏸️',
            'TODO': '📋',
            'In Progress': '🔄',
            'Review': '👀',
            'DONE': '✅'
          };
          
          const fromEmoji = statusEmojis[fromStatus] || '';
          const toEmoji = statusEmojis[toStatus] || '';
          
          return `[Información] Tarea movida ${fromEmoji} ${fromStatus} → ${toEmoji} ${toStatus}`;
        }
      }
    }
    return null;
  }

  extractReviewers(pullRequest) {
    // Buscar @mentions en la descripción del PR
    const description = pullRequest.body || '';
    const mentions = description.match(/@(\w+)/g);
    if (mentions) {
      return mentions.map(m => m.substring(1));
    }
    return [];
  }

  async processWebhook() {
    try {
      const payload = github.context.payload;
      const eventName = github.context.eventName;
      
      console.log('Procesando evento:', eventName);
      console.log('Payload:', JSON.stringify(payload, null, 2));

      let message = null;

      switch (eventName) {
        case 'issues':
          if (payload.action === 'assigned') {
            message = this.formatAssignmentMessage(payload);
          }
          break;
          
        case 'pull_request':
          message = this.formatPRMessage(payload);
          break;
          
        case 'projects_v2_item':
          message = this.formatProjectMessage(payload);
          break;
          
        default:
          console.log('Evento no manejado:', eventName);
      }

      if (message) {
        await this.sendMessage(message);
      } else {
        console.log('No se generó mensaje para este evento');
      }

    } catch (error) {
      console.error('Error procesando webhook:', error);
      core.setFailed(`Error: ${error.message}`);
    }
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const notifier = new TelegramNotifier();
  notifier.processWebhook();
}

module.exports = TelegramNotifier;
