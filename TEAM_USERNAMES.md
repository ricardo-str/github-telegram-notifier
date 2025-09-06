# 👥 Configuración de Usuarios para Notificaciones

## 🎯 Mapeo GitHub → Telegram

Para que las notificaciones usen los usernames correctos de Telegram, cada miembro debe proporcionar:

### 📝 Información Requerida:
- **GitHub username:** Tu usuario en GitHub
- **Telegram username:** Tu @ en Telegram (sin el @)

### 📋 Plantilla para el Equipo:

```
GitHub: mi-usuario-github
Telegram: mi_usuario_telegram
```

### 👤 Ejemplo:
```
GitHub: ricardo-str
Telegram: Ricardo_s_t
```

## ⚙️ Configuración (Para Administrador)

Editar archivo `src/user-mapping.js`:

```javascript
const USER_MAPPING = {
  'ricardo-str': 'Ricardo_s_t',
  'usuario-github-1': 'usuario_telegram_1',
  'usuario-github-2': 'usuario_telegram_2',
  'usuario-github-3': 'usuario_telegram_3',
  'usuario-github-4': 'usuario_telegram_4',
  'usuario-github-5': 'usuario_telegram_5',
  'usuario-github-6': 'usuario_telegram_6',
};
```

## 📱 Resultado

### Antes:
```
[Auto-asignación de Tareas] @ricardo-str - Tarea
```

### Después:
```
[Auto-asignación de Tareas] @Ricardo_s_t - Tarea
```

## 🔄 Si No Hay Mapeo

Si un usuario no está en el mapeo, se usa su username de GitHub como fallback:
```
[Auto-asignación de Tareas] @usuario-github - Tarea
```

## 📧 Solicitar Información al Equipo

Enviar a cada miembro:

---
**🤖 Configuración Bot de Notificaciones**

Para que las notificaciones de Telegram te mencionen correctamente, necesitamos:

**Tu GitHub username:** _____________
**Tu Telegram username:** _____________

Ejemplo:
- GitHub: juan-perez  
- Telegram: juan_p_dev

---
