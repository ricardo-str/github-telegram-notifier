const core = require('@actions/core');
const github = require('@actions/github');
const TelegramBot = require('node-telegram-bot-api');
const USER_MAPPING = require('./user-mapping');

class TelegramNotifier {
  constructor() {
    this.botToken = core.getInput('telegram-bot-token') || process.env.TELEGRAM_BOT_TOKEN;
    this.chatId = core.getInput('telegram-chat-id') || process.env.TELEGRAM_CHAT_ID;
    this.bot = new TelegramBot(this.botToken);
  }

  // Mapear usuario de GitHub a Telegram
  mapUser(githubUsername) {
    const telegramUsername = USER_MAPPING[githubUsername];
    return telegramUsername ? `@${telegramUsername}` : `@${githubUsername}`;
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
      const assigneeName = this.mapUser(assignee.login);
      return `[Auto-asignación de Tareas] ${assigneeName} - ${taskTitle}`;
    }
    return null;
  }

  formatPRMessage(payload) {
    const { action, pull_request, requested_reviewer } = payload;
    // Soportar opened, ready_for_review y review_requested
    if (action === 'opened' || action === 'ready_for_review' || action === 'review_requested') {
      const prTitle = pull_request.title;
      const author = this.mapUser(pull_request.user.login);
      const prUrl = pull_request.html_url;

      // Origen de reviewers:
      // 1) Cuando action === 'review_requested', GitHub provee requested_reviewer (usuario único)
      // 2) Si no, usar pull_request.requested_reviewers (array nativo)
      // 3) Complementar con @mentions del body
      let reviewers = [];
      if (action === 'review_requested' && requested_reviewer && requested_reviewer.login) {
        reviewers = [requested_reviewer.login];
      } else {
        reviewers = this.extractReviewers(pull_request);
      }

      const reviewersMention = reviewers.length > 0 ?
        reviewers.map(r => this.mapUser(r)).join(' ') : '@team';

      return `[PR] ${reviewersMention} - <a href="${prUrl}">${prTitle}</a> por ${author}`;
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
    // 1) Reviewers nativos del PR
    const requested = Array.isArray(pullRequest.requested_reviewers)
      ? pullRequest.requested_reviewers.map(u => u && u.login).filter(Boolean)
      : [];

    // 2) @mentions en la descripción del PR
    const description = pullRequest.body || '';
    const mentions = description.match(/@(\w+)/g) || [];
    const mentioned = mentions.map(m => m.substring(1));

    // Unificar y eliminar duplicados
    const all = [...requested, ...mentioned];
    return Array.from(new Set(all));
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
