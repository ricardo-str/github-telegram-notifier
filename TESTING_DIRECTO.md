# 🚀 Testing Directo (Si Tienes Acceso de Colaborador)

## ⚠️ Solo Si Eres Colaborador del Repo Real

### Método: Branch de Testing
```bash
# Clonar repo real (requiere acceso)
git clone https://github.com/paisaje-biblio/web-ui.git
cd web-ui

# Crear branch específico para testing bot
git checkout -b testing/telegram-notifications

# Instalar sistema de notificaciones
mkdir -p .github/workflows src
# Copiar archivos del notificador

# Configurar secrets con Chat ID de PRUEBA
# TELEGRAM_CHAT_ID: -4862243575 (grupo de prueba)

# Commit y push a branch de testing
git add .
git commit -m "test: añadir sistema de notificaciones para testing"
git push origin testing/telegram-notifications
```

### Testing:
1. **Issues en el branch** de testing
2. **PRs hacia el branch** de testing  
3. **Notificaciones van al grupo de prueba**
4. **Una vez validado**, hacer PR al main

## 🛡️ Precauciones
- ✅ Usar **Chat ID de prueba** (no grupo real)
- ✅ Testing en **branch separado**
- ✅ **No hacer merge** hasta validar completamente
- ✅ **Documentar bien** que es testing
