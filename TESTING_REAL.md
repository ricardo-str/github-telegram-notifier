# 🧪 Guía de Testing Real con Grupo de Prueba

## 🎯 Objetivo
Probar el bot con eventos reales del project board pero enviando notificaciones al grupo de prueba (no al grupo real de avisos).

## 📋 Método 1: Fork para Testing

### Paso 1: Crear Fork de Testing
1. Ve a uno de los repos reales: `https://github.com/paisaje-biblio/web-ui`
2. Click en "Fork" 
3. Créalo en tu cuenta personal: `ricardo-str/web-ui-test`

### Paso 2: Configurar el Fork
1. En el fork, ve a Settings → Secrets and Variables → Actions
2. Añade los secrets:
   ```
   TELEGRAM_BOT_TOKEN: tu_token_del_bot
   TELEGRAM_CHAT_ID: -4862243575  (tu grupo de prueba)
   ```

### Paso 3: Instalar el Sistema
1. Copia los workflows y código del notificador al fork
2. Habilita GitHub Actions en el fork

### Paso 4: Testing Real
1. **Crea issues reales** en el fork
2. **Asígnate las issues**
3. **Crea PRs reales**
4. **Mueve tareas** si tienes project board

✅ **Resultado:** Eventos reales pero notificaciones van al grupo de prueba

## 📋 Método 2: Usar el Project Board Real

### Si el Project Board está vinculado a tu fork:
1. Ve a: `https://github.com/orgs/paisaje-biblio/projects/1`
2. Settings → Manage access → Linked repositories
3. Añade tu fork temporal: `ricardo-str/web-ui-test`

### Testing con Project Board Real:
1. **Crea una issue** en el fork
2. **Añádela al project board** de paisaje-biblio
3. **Mueve la card** entre columnas
4. **Ve las notificaciones** en tu grupo de prueba

## 📋 Método 3: Project Board de Prueba

### Crear Project Board Separado:
1. Ve a tu cuenta personal
2. Projects → New project
3. Crea columnas: No Status, On Hold, Todo, In Progress, Review, Done
4. Vincula tu fork de prueba
5. Testing completo sin afectar el project real

## ⚠️ Importante
- Usar siempre el **Chat ID del grupo de prueba** (-4862243575)
- **NO** usar los secrets del grupo real de avisos
- Testing en forks personales, no en repos de producción
