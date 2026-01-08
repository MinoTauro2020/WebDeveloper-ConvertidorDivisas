#!/bin/bash
set -e

# Variables (se pasan desde el workflow)
APP_PATH="${VPS_APP_PATH}"
DEPLOY_PATH="${VPS_DEPLOY_PATH}"
FILE_OWNER="${VPS_FILE_OWNER}"
BACKUP_DIR="/home/backup-deploys"

echo "🚀 Iniciando deploy..."

# Crear directorio de backup si no existe
mkdir -p "$BACKUP_DIR"

# Backup del deploy anterior
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
echo "📦 Creando backup: $BACKUP_DIR/backup_$TIMESTAMP"
if [ -d "$DEPLOY_PATH" ]; then
  cp -r "$DEPLOY_PATH" "$BACKUP_DIR/backup_$TIMESTAMP" || echo "⚠️  No se pudo crear backup completo"
fi

# Ir al directorio de la aplicación
cd "$APP_PATH"

# Stash de cambios locales si existen
echo "💾 Guardando cambios locales..."
git stash push -m "Guardando cambios locales antes del pull - $TIMESTAMP" || true

# Pull del código actualizado
echo "📥 Obteniendo código actualizado..."
git pull origin main || {
  echo "❌ Error al hacer git pull"
  exit 1
}

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Verificar si react-snap está instalado, si no, instalarlo
if ! npm list react-snap > /dev/null 2>&1; then
  echo "📦 Instalando react-snap..."
  npm install react-snap --save-dev
fi

# Build de la aplicación
echo "🏗️  Ejecutando build..."
npm run build || {
  echo "❌ Error durante el build"
  exit 1
}

# Verificar que el build se creó correctamente
if [ ! -d "build" ]; then
  echo "❌ El directorio build no se creó"
  exit 1
fi

# Copiar build a producción
echo "📋 Copiando archivos a producción..."
cp -a build/* "$DEPLOY_PATH/" || {
  echo "❌ Error al copiar archivos"
  exit 1
}

# Cambiar permisos y ownership
echo "🔐 Ajustando permisos..."
chown -R $FILE_OWNER "$DEPLOY_PATH/"
chmod -R 755 "$DEPLOY_PATH/"

# Reiniciar servicios
echo "🔄 Reiniciando servicios..."

# Reiniciar backend con Supervisor
if command -v supervisorctl > /dev/null 2>&1; then
  supervisorctl restart conversor-backend || echo "⚠️  No se pudo reiniciar conversor-backend"
else
  echo "⚠️  supervisorctl no encontrado"
fi

# Reiniciar OpenLiteSpeed
if command -v systemctl > /dev/null 2>&1; then
  systemctl restart lsws || echo "⚠️  No se pudo reiniciar lsws"
else
  echo "⚠️  systemctl no encontrado"
fi

# Mantener solo los últimos 5 backups
echo "🧹 Limpiando backups antiguos..."
cd "$BACKUP_DIR"
ls -t | tail -n +6 | xargs -r rm -rf

echo "✅ Deploy completado exitosamente!"
echo "📊 Información del deploy:"
echo "   - Timestamp: $TIMESTAMP"
echo "   - App Path: $APP_PATH"
echo "   - Deploy Path: $DEPLOY_PATH"
echo "   - Backup: $BACKUP_DIR/backup_$TIMESTAMP"
