# 🚀 Sistema de CI/CD con GitHub Actions

Este repositorio ahora cuenta con un sistema completo de **Integración Continua y Despliegue Continuo (CI/CD)** implementado con GitHub Actions.

## ✨ Características

- ✅ **Deploy Automático**: Cada push a `main` despliega automáticamente al VPS
- ✅ **Deploy Manual**: Opción de ejecutar deploy manualmente desde GitHub
- ✅ **Backup Automático**: Crea backup antes de cada deploy
- ✅ **Rollback Automático**: Revierte cambios si algo falla
- ✅ **Health Checks**: Verifica que el sitio funcione después del deploy
- ✅ **Seguridad**: Conexión SSH con claves ed25519, sin contraseñas
- ✅ **Pre-renderizado SEO**: Incluye react-snap automáticamente en el build

## 📁 Archivos Agregados

```
.github/
├── workflows/
│   └── deploy-vps.yml       # Workflow principal de GitHub Actions
└── scripts/
    └── deploy.sh             # Script de deploy ejecutado en el VPS

docs/
├── DEPLOYMENT.md             # Guía completa de despliegue
└── SECRETS_SETUP.md          # Documentación de GitHub Secrets

.gitignore                    # Exclusión de archivos temporales
```

## 🚦 Cómo Funciona

### Deploy Automático

1. Haces commit y push a la rama `main`:
   ```bash
   git add .
   git commit -m "Tu cambio"
   git push origin main
   ```

2. GitHub Actions detecta el push y ejecuta automáticamente:
   - ✅ Conecta al VPS via SSH
   - ✅ Crea backup del deploy actual
   - ✅ Hace `git pull` en el VPS
   - ✅ Ejecuta `npm install` y `npm run build`
   - ✅ Copia archivos a producción
   - ✅ Ajusta permisos
   - ✅ Reinicia servicios (Supervisor + OpenLiteSpeed)
   - ✅ Verifica que el sitio funcione
   - ✅ Si falla, hace rollback automático

3. ¡Listo! Tu aplicación está desplegada en https://convertidordivisas.com/

### Deploy Manual

1. Ve a GitHub → Actions → "Deploy to VPS"
2. Click en "Run workflow"
3. Selecciona la rama `main`
4. Click en "Run workflow"

## 📚 Documentación

### Para entender el sistema completo:
👉 **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Guía completa de despliegue
- Arquitectura del sistema
- Explicación paso a paso del workflow
- Cómo hacer rollback manual
- Troubleshooting completo
- Comandos útiles

### Para configurar o regenerar secrets:
👉 **[docs/SECRETS_SETUP.md](docs/SECRETS_SETUP.md)** - Configuración de GitHub Secrets
- Lista de todos los secrets necesarios
- Cómo regenerar claves SSH
- Mejores prácticas de seguridad

## 🔐 Secrets Configurados

Los siguientes secrets ya están configurados en GitHub:

- `VPS_SSH_PRIVATE_KEY` - Clave SSH para conexión segura
- `VPS_HOST` - IP del servidor (77.42.36.27)
- `VPS_PORT` - Puerto SSH (22)
- `VPS_USER` - Usuario del VPS (root)
- `VPS_APP_PATH` - Ruta del código fuente
- `VPS_DEPLOY_PATH` - Ruta de producción
- `VPS_FILE_OWNER` - Owner de archivos (claude_temp:claude_temp)

## 🎯 Casos de Uso

### Desarrollo Normal
```bash
# Trabajas localmente
git add .
git commit -m "Añadir nueva funcionalidad"
git push origin main

# GitHub Actions se encarga del resto automáticamente
# En ~2-5 minutos tu cambio está en producción
```

### Hotfix Urgente
```bash
# Haces el fix
git add .
git commit -m "Fix: corregir bug crítico"
git push origin main

# O si prefieres deploy manual:
# GitHub → Actions → Deploy to VPS → Run workflow
```

### Verificar Deploy
```bash
# Ver el estado del último workflow
gh run list --limit 1

# Ver logs en tiempo real
gh run watch

# O desde la web:
# https://github.com/MinoTauro2020/WebDeveloper-ConvertidorDivisas/actions
```

## ⚠️ Importante

- ✅ Los deploys a producción solo se hacen desde la rama `main`
- ✅ Cada deploy crea un backup automático
- ✅ Se mantienen los últimos 5 backups
- ✅ Si algo falla, hay rollback automático
- ✅ Siempre puedes hacer rollback manual (ver documentación)

## 🔍 Monitoreo

### Ver estado de deploys:
- **GitHub Actions**: https://github.com/MinoTauro2020/WebDeveloper-ConvertidorDivisas/actions
- **Sitio web**: https://convertidordivisas.com/

### Logs en el VPS:
```bash
ssh root@77.42.36.27

# Ver logs de OpenLiteSpeed
tail -f /usr/local/lsws/logs/error.log

# Ver estado de servicios
supervisorctl status
systemctl status lsws
```

## 🆘 Ayuda

Si algo sale mal:
1. **Revisa los logs** en GitHub Actions
2. **Consulta la documentación** en [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
3. **Haz rollback manual** si es necesario (guía en la documentación)
4. **Verifica los servicios** en el VPS

## 🎉 ¡Disfruta del Deploy Automatizado!

Ya no necesitas conectarte manualmente al VPS para hacer deploy. Todo está automatizado, seguro y documentado.

**Happy deploying! 🚀**
