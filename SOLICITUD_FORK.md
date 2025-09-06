# 📧 Solicitud para Habilitar Fork Temporal

## Para el Administrador de paisaje-biblio

### Contexto:
Necesitamos testing del sistema de notificaciones Telegram antes de implementarlo en producción.

### Solicitud:
Habilitar forks temporalmente en `paisaje-biblio/web-ui` para testing del sistema de notificaciones.

### Duración:
- **1-2 días** para testing completo
- **Deshabilitar** una vez terminado el testing

### Justificación:
- Testing real sin afectar producción
- Validar funcionamiento antes de implementar
- Evitar errores en el flujo de trabajo real

### Ubicación del Setting:
1. `https://github.com/paisaje-biblio/web-ui/settings`
2. General → Features → "Allow forking"
3. ✅ Marcar temporalmente
4. ❌ Desmarcar después del testing

### Alternativa Segura:
Si prefieren no habilitar forks, podemos:
- Crear repositorio de testing independiente
- Simular estructura y eventos
- Testing igual de efectivo

### Compromiso:
- Fork será **privado** si es posible
- Solo para testing, no desarrollo
- Eliminar fork después de validar
