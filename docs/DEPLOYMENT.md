# 📖 Guía de Despliegue - Conversor de Divisas

## 🏗️ Arquitectura del Sistema de Deploy

### Visión General
El sistema de CI/CD está implementado con GitHub Actions y automatiza completamente el proceso de despliegue de la aplicación React al VPS cuando se realizan cambios en la rama `main`.

### Componentes del Sistema

```
┌─────────────────┐
│  GitHub Repo    │
│   (main branch) │
└────────┬────────┘
         │ Push/Manual Trigger
         ▼
┌─────────────────┐
│ GitHub Actions  │
│  deploy-vps.yml │
└────────┬────────┘
         │ SSH Connection
         ▼
┌─────────────────┐
│   VPS Server    │
│  77.42.36.27    │
└────────┬────────┘
         │
         ├─► Git Pull (código fuente)
         ├─► npm install
         ├─► npm run build (+ react-snap)
         ├─► Copiar a producción
         ├─► Reiniciar servicios
         └─► Health Check
```

## 🔄 Flujo del Workflow

### 1. **Trigger** (Inicio del Deploy)
El workflow se activa de dos formas:
- **Automático**: Cada vez que se hace push a la rama `main`
- **Manual**: Desde la pestaña "Actions" en GitHub → "Deploy to VPS" → "Run workflow"

### 2. **Job: Build and Deploy**

#### Paso 1: Checkout del Código
```yaml
- Descarga el código del repositorio de GitHub
- Prepara el entorno para el deploy
```

#### Paso 2: Setup SSH
```yaml
- Configura la clave SSH privada (desde secrets)
- Agrega el host VPS a known_hosts
- Prepara la conexión segura al servidor
```

#### Paso 3: Copiar Script de Deploy
```yaml
- Copia deploy.sh al VPS (/tmp/deploy.sh)
- Este script contiene toda la lógica de despliegue
```

#### Paso 4: Ejecución del Deploy
El script `deploy.sh` ejecuta en el VPS:

1. **Backup**: Crea una copia de seguridad del deploy anterior
   ```bash
   /home/backup-deploys/backup_YYYYMMDD_HHMMSS/
   ```

2. **Git Stash & Pull**: Guarda cambios locales y obtiene código actualizado
   ```bash
   cd /home/convertidordivisas.com/public_html/app/WebDeveloper/frontend
   git stash push -m "..."
   git pull origin main
   ```

3. **Instalación de Dependencias**
   ```bash
   npm install
   npm install react-snap --save-dev  # Si no está instalado
   ```

4. **Build de la Aplicación**
   ```bash
   npm run build
   # Esto ejecuta automáticamente react-snap para SEO (postbuild)
   ```

5. **Deploy a Producción**
   ```bash
   cp -a build/* /home/convertidordivisas.com/public_html/
   ```

6. **Permisos y Ownership**
   ```bash
   chown -R claude_temp:claude_temp /home/convertidordivisas.com/public_html/
   chmod -R 755 /home/convertidordivisas.com/public_html/
   ```

7. **Reinicio de Servicios**
   ```bash
   supervisorctl restart conversor-backend  # Backend Node.js
   systemctl restart lsws                   # OpenLiteSpeed
   ```

8. **Limpieza de Backups**: Mantiene solo los últimos 5 backups

#### Paso 5: Health Check
```yaml
- Espera 5 segundos
- Realiza un curl a https://convertidordivisas.com/
- Verifica que responda con HTTP 200, 301 o 302
- Si falla, activa el rollback
```

#### Paso 6: Rollback Automático (si algo falla)
```yaml
- Detecta si hubo algún error en el deploy
- Restaura el backup más reciente
- Reinicia servicios
- Notifica del rollback
```

#### Paso 7: Cleanup
```yaml
- Elimina archivos temporales del VPS
- Limpia las claves SSH del runner
```

## 🔙 Rollback Manual

### Opción 1: Usando Backups Automáticos

Los backups se guardan en: `/home/backup-deploys/backup_YYYYMMDD_HHMMSS/`

```bash
# 1. Conectarse al VPS
ssh root@77.42.36.27

# 2. Listar backups disponibles
ls -lht /home/backup-deploys/

# 3. Identificar el backup a restaurar
# Ejemplo: backup_20260108_143022

# 4. Restaurar el backup
BACKUP_DIR="/home/backup-deploys/backup_20260108_143022"
DEPLOY_PATH="/home/convertidordivisas.com/public_html"

cp -a $BACKUP_DIR/* $DEPLOY_PATH/
chown -R claude_temp:claude_temp $DEPLOY_PATH/
chmod -R 755 $DEPLOY_PATH/

# 5. Reiniciar servicios
supervisorctl restart conversor-backend
systemctl restart lsws

# 6. Verificar
curl -I https://convertidordivisas.com/
```

### Opción 2: Rollback a un Commit Específico

```bash
# 1. Conectarse al VPS
ssh root@77.42.36.27

# 2. Ir al directorio de la app
cd /home/convertidordivisas.com/public_html/app/WebDeveloper/frontend

# 3. Ver el historial de commits
git log --oneline -10

# 4. Checkout al commit deseado
git checkout <commit-hash>

# 5. Rebuild y redeploy
npm install
npm run build
cp -a build/* /home/convertidordivisas.com/public_html/
chown -R claude_temp:claude_temp /home/convertidordivisas.com/public_html/
chmod -R 755 /home/convertidordivisas.com/public_html/

# 6. Reiniciar servicios
supervisorctl restart conversor-backend
systemctl restart lsws

# 7. Volver a main cuando esté listo
git checkout main
```

## 🔧 Troubleshooting

### Problema: El deploy falla en "git pull"

**Síntomas**: Error "Your local changes would be overwritten by merge"

**Solución**:
```bash
ssh root@77.42.36.27
cd /home/convertidordivisas.com/public_html/app/WebDeveloper/frontend
git stash push -m "Manual stash"
git pull origin main
```

### Problema: El build falla

**Síntomas**: Error durante "npm run build"

**Solución**:
```bash
ssh root@77.42.36.27
cd /home/convertidordivisas.com/public_html/app/WebDeveloper/frontend

# Limpiar y reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
npm install react-snap --save-dev

# Intentar build de nuevo
npm run build
```

### Problema: Los servicios no reinician

**Síntomas**: "No se pudo reiniciar conversor-backend" o "No se pudo reiniciar lsws"

**Solución**:
```bash
ssh root@77.42.36.27

# Verificar estado de Supervisor
supervisorctl status

# Si no está corriendo conversor-backend, iniciarlo
supervisorctl start conversor-backend

# Verificar estado de OpenLiteSpeed
systemctl status lsws

# Reiniciar manualmente
systemctl restart lsws

# Ver logs si hay problemas
journalctl -u lsws -n 50
tail -f /usr/local/lsws/logs/error.log
```

### Problema: Permisos incorrectos

**Síntomas**: Error 403 o archivos no accesibles

**Solución**:
```bash
ssh root@77.42.36.27
cd /home/convertidordivisas.com/public_html

# Corregir ownership
chown -R claude_temp:claude_temp .

# Corregir permisos
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;

# Reiniciar servidor web
systemctl restart lsws
```

### Problema: Health check falla

**Síntomas**: El workflow completa pero el health check da error

**Solución**:
```bash
# Verificar que el sitio responde
curl -I https://convertidordivisas.com/

# Verificar logs del servidor
ssh root@77.42.36.27
tail -f /usr/local/lsws/logs/error.log

# Verificar que los archivos están en su lugar
ls -la /home/convertidordivisas.com/public_html/index.html

# Si el sitio está caído, hacer rollback
cd /home/backup-deploys
ls -lht
# Seguir los pasos de Rollback Manual
```

## 📊 Comandos Útiles para Verificación

### Verificar Estado del Deploy

```bash
# Conectarse al VPS
ssh root@77.42.36.27

# Ver último commit desplegado
cd /home/convertidordivisas.com/public_html/app/WebDeveloper/frontend
git log -1 --oneline

# Ver fecha de los archivos de producción
ls -lht /home/convertidordivisas.com/public_html/ | head -10

# Verificar que el sitio responde
curl -I https://convertidordivisas.com/
```

### Verificar Servicios

```bash
# Estado de todos los servicios supervisados
supervisorctl status

# Estado de OpenLiteSpeed
systemctl status lsws

# Logs en tiempo real
tail -f /usr/local/lsws/logs/error.log
tail -f /usr/local/lsws/logs/access.log
```

### Verificar Backups

```bash
# Listar backups disponibles
ls -lht /home/backup-deploys/

# Ver espacio usado por backups
du -sh /home/backup-deploys/*

# Contenido de un backup específico
ls -la /home/backup-deploys/backup_20260108_143022/
```

### Verificar Build

```bash
cd /home/convertidordivisas.com/public_html/app/WebDeveloper/frontend

# Ver si el directorio build existe
ls -la build/

# Ver archivos generados por react-snap
ls -la build/dolar-a-euro/
ls -la build/euro-a-dolar/

# Verificar package.json
cat package.json | grep -A 5 scripts
```

### Monitoreo de GitHub Actions

```bash
# Ver workflows en ejecución
gh run list --limit 5

# Ver detalles de un workflow específico
gh run view <run-id>

# Ver logs de un workflow
gh run view <run-id> --log
```

## 🎯 Mejores Prácticas

### Antes de Hacer Push a Main

1. **Probar localmente**: Asegurarse de que `npm run build` funciona
2. **Revisar cambios**: Verificar qué archivos se están modificando
3. **Commits descriptivos**: Usar mensajes claros para entender qué se deployó

### Después del Deploy

1. **Verificar el sitio**: Navegar a https://convertidordivisas.com/
2. **Probar funcionalidad**: Hacer una conversión de prueba
3. **Revisar logs**: Verificar que no hay errores en GitHub Actions
4. **Verificar SEO**: Comprobar que las páginas pre-renderizadas funcionan

### Mantenimiento Regular

1. **Limpiar backups antiguos**: El script mantiene 5, pero revisar periódicamente
2. **Monitorear espacio en disco**: Los builds pueden acumularse
3. **Actualizar dependencias**: Mantener npm packages actualizados
4. **Revisar logs**: Buscar patrones de errores

## 🔗 Referencias

- **Repositorio**: https://github.com/MinoTauro2020/WebDeveloper-ConvertidorDivisas
- **Sitio web**: https://convertidordivisas.com/
- **GitHub Actions**: [Ver workflows en el repositorio]
- **Documentación de Secrets**: Ver `docs/SECRETS_SETUP.md`

## 📞 Soporte

Si tienes problemas con el deploy:

1. Revisa los logs en GitHub Actions
2. Consulta esta documentación de troubleshooting
3. Verifica el estado de los servicios en el VPS
4. Si persiste, realiza un rollback manual
