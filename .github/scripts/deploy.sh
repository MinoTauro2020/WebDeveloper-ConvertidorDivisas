#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Variables
REPO_URL="https://github.com/MinoTauro2020/WebDeveloper-ConvertidorDivisas.git"
APP_DIR="/home/convertidordivisas.com/public_html/app/WebDeveloper"
FRONTEND_DIR="$APP_DIR/frontend"
BACKUP_DIR="/home/backup-deploys/$(date +%Y%m%d_%H%M%S)"

# Create backup
echo "📦 Creating backup..."
mkdir -p "$BACKUP_DIR"
if [ -d "$FRONTEND_DIR" ]; then
  cp -a "$FRONTEND_DIR"/* "$BACKUP_DIR/" || true
fi

# Navigate to frontend directory
cd "$FRONTEND_DIR"

# Pull latest changes
echo "📥 Pulling latest changes from GitHub..."
git fetch origin main
git reset --hard origin/main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Set correct permissions
echo "🔐 Setting permissions..."
chown -R claude_temp:claude_temp "$FRONTEND_DIR"
find "$FRONTEND_DIR" -type d -exec chmod 755 {} \;
find "$FRONTEND_DIR" -type f -exec chmod 644 {} \;

# Restart web server
echo "🔄 Restarting web server..."
systemctl restart lsws || true

echo "✅ Deployment completed successfully!"
