# 🔐 Configuración de GitHub Secrets

## 📋 Secrets Requeridos

Para que el workflow de GitHub Actions funcione correctamente, se necesitan los siguientes secrets configurados en el repositorio. Todos estos valores **YA ESTÁN CONFIGURADOS** en el repositorio `MinoTauro2020/WebDeveloper-ConvertidorDivisas`.

## 🔑 Lista de Secrets

### 1. `VPS_SSH_PRIVATE_KEY`
**Descripción**: Clave privada SSH para autenticación en el VPS

**Tipo**: Clave privada ed25519

**Formato**:
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
...
[contenido de la clave privada]
...
-----END OPENSSH PRIVATE KEY-----
```

**Uso**: Permite que GitHub Actions se conecte de forma segura al VPS sin contraseñas

**Nota de Seguridad**: 
- ⚠️ NUNCA compartir esta clave
- ⚠️ NUNCA commitear esta clave al repositorio
- ⚠️ Solo debe estar en GitHub Secrets

---

### 2. `VPS_HOST`
**Descripción**: Dirección IP o dominio del servidor VPS

**Valor**: `77.42.36.27`

**Tipo**: String

**Uso**: Especifica a qué servidor conectarse via SSH

---

### 3. `VPS_PORT`
**Descripción**: Puerto SSH del servidor VPS

**Valor**: `22`

**Tipo**: Número

**Uso**: Puerto para la conexión SSH (puerto estándar)

---

### 4. `VPS_USER`
**Descripción**: Usuario para conectarse al VPS

**Valor**: `root`

**Tipo**: String

**Uso**: Usuario con permisos para:
- Hacer git pull
- Ejecutar npm install/build
- Copiar archivos a producción
- Cambiar ownership y permisos
- Reiniciar servicios (supervisor, lsws)

**Nota**: Se usa `root` porque se necesitan permisos para `systemctl` y `chown`

---

### 5. `VPS_APP_PATH`
**Descripción**: Ruta absoluta donde está el código fuente de la aplicación React en el VPS

**Valor**: `/home/convertidordivisas.com/public_html/app/WebDeveloper/frontend`

**Tipo**: String

**Estructura del directorio**:
```
/home/convertidordivisas.com/public_html/app/WebDeveloper/frontend/
├── .git/                    # Repositorio git
├── node_modules/            # Dependencias npm
├── public/                  # Archivos públicos React
├── src/                     # Código fuente React
├── build/                   # Build generado (después de npm run build)
├── package.json
├── package-lock.json
└── ...
```

**Uso**: 
- Directorio donde se ejecuta `git pull`
- Donde se ejecuta `npm install` y `npm run build`
- Donde se genera el directorio `build/`

---

### 6. `VPS_DEPLOY_PATH`
**Descripción**: Ruta absoluta donde se copian los archivos de producción

**Valor**: `/home/convertidordivisas.com/public_html`

**Tipo**: String

**Contenido después del deploy**:
```
/home/convertidordivisas.com/public_html/
├── index.html              # Página principal
├── static/                 # Assets estáticos
│   ├── css/
│   ├── js/
│   └── media/
├── dolar-a-euro/          # Rutas pre-renderizadas
├── euro-a-dolar/
├── dolar-a-peso-argentino/
├── asset-manifest.json
├── robots.txt
├── sitemap.xml
└── ...
```

**Uso**: 
- Destino de los archivos del `build/`
- Lo que sirve OpenLiteSpeed a los usuarios
- Donde se aplican los permisos `claude_temp:claude_temp`

---

### 7. `VPS_FILE_OWNER`
**Descripción**: Usuario y grupo que deben ser owners de los archivos de producción

**Valor**: `claude_temp:claude_temp`

**Formato**: `usuario:grupo`

**Tipo**: String

**Uso**: 
- Se usa en `chown -R claude_temp:claude_temp /path/to/files`
- Necesario para que OpenLiteSpeed pueda servir los archivos correctamente
- Importante para permisos de lectura/ejecución

**Nota**: El usuario `claude_temp` debe existir en el VPS y debe ser el mismo usuario con el que corre OpenLiteSpeed

---

## 🔧 Cómo Configurar los Secrets (Referencia)

Si necesitas agregar o actualizar secrets:

### Método 1: Interfaz Web de GitHub

1. Ir al repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, ir a **Secrets and variables** → **Actions**
4. Click en **New repository secret**
5. Ingresar el **Name** (nombre del secret)
6. Ingresar el **Value** (valor del secret)
7. Click en **Add secret**

### Método 2: GitHub CLI

```bash
# Instalar GitHub CLI si no la tienes
# https://cli.github.com/

# Autenticarse
gh auth login

# Agregar un secret
gh secret set SECRET_NAME --body "valor del secret"

# Ejemplo:
gh secret set VPS_HOST --body "77.42.36.27"

# Para archivos (como la clave SSH)
gh secret set VPS_SSH_PRIVATE_KEY < ~/.ssh/id_ed25519
```

---

## 🔄 Regenerar Claves SSH (Si es necesario)

### Cuándo Regenerar

- La clave privada fue comprometida
- Se perdió acceso a la clave
- Como medida de seguridad periódica (recomendado cada 6-12 meses)

### Pasos para Regenerar

#### 1. Generar Nueva Clave ed25519

En tu máquina local:

```bash
# Generar nueva clave ed25519
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_ed25519

# Esto genera dos archivos:
# ~/.ssh/github_actions_ed25519       (clave PRIVADA)
# ~/.ssh/github_actions_ed25519.pub   (clave PÚBLICA)
```

#### 2. Copiar Clave Pública al VPS

```bash
# Opción A: Usar ssh-copy-id
ssh-copy-id -i ~/.ssh/github_actions_ed25519.pub root@77.42.36.27

# Opción B: Manual
cat ~/.ssh/github_actions_ed25519.pub
# Copiar el contenido

# Conectarse al VPS
ssh root@77.42.36.27

# Agregar al authorized_keys
echo "ssh-ed25519 AAAAC3... github-actions-deploy" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

#### 3. Probar la Conexión

```bash
# Probar que la nueva clave funciona
ssh -i ~/.ssh/github_actions_ed25519 root@77.42.36.27

# Si funciona, continuar al siguiente paso
```

#### 4. Actualizar GitHub Secret

```bash
# Usando GitHub CLI
gh secret set VPS_SSH_PRIVATE_KEY < ~/.ssh/github_actions_ed25519

# O manualmente:
# 1. Copiar el contenido de la clave privada
cat ~/.ssh/github_actions_ed25519

# 2. Ir a GitHub → Settings → Secrets → Actions
# 3. Editar VPS_SSH_PRIVATE_KEY
# 4. Pegar el contenido completo (incluyendo las líneas BEGIN/END)
# 5. Update secret
```

#### 5. Verificar el Deploy

```bash
# Hacer un commit de prueba o ejecutar manualmente el workflow
# desde GitHub Actions → Deploy to VPS → Run workflow

# Verificar que se conecta correctamente
```

#### 6. Limpiar Claves Antiguas (Opcional)

Después de verificar que todo funciona:

```bash
# En el VPS, puedes remover claves antiguas
ssh root@77.42.36.27
nano ~/.ssh/authorized_keys
# Eliminar la línea de la clave antigua
```

---

## 🔍 Verificar Secrets Configurados

### Desde GitHub Web

1. Ir a: `https://github.com/MinoTauro2020/WebDeveloper-ConvertidorDivisas/settings/secrets/actions`
2. Verificar que aparezcan todos los 7 secrets
3. GitHub no muestra los valores (por seguridad)

### Desde GitHub CLI

```bash
gh secret list --repo MinoTauro2020/WebDeveloper-ConvertidorDivisas
```

Deberías ver:
```
VPS_APP_PATH
VPS_DEPLOY_PATH
VPS_FILE_OWNER
VPS_HOST
VPS_PORT
VPS_SSH_PRIVATE_KEY
VPS_USER
```

---

## ⚠️ Mejores Prácticas de Seguridad

### ✅ Hacer

- ✅ Usar claves SSH ed25519 (más seguras que RSA)
- ✅ Usar claves con passphrase (para máxima seguridad)
- ✅ Mantener las claves privadas SOLO en GitHub Secrets
- ✅ Rotar claves periódicamente (cada 6-12 meses)
- ✅ Usar el principio de menor privilegio (aunque aquí se usa root por necesidad)
- ✅ Auditar los logs de GitHub Actions regularmente
- ✅ Limitar quién tiene acceso a modificar secrets

### ❌ NO Hacer

- ❌ NUNCA commitear claves privadas al repositorio
- ❌ NUNCA compartir claves privadas por email/chat
- ❌ NUNCA usar la misma clave para múltiples propósitos
- ❌ NUNCA deshabilitar StrictHostKeyChecking sin validar fingerprint
- ❌ NUNCA exponer secrets en logs (GitHub los oculta automáticamente)
- ❌ NUNCA usar contraseñas en lugar de claves SSH

---

## 📊 Diagrama de Flujo de Autenticación

```
┌─────────────────────────┐
│   GitHub Actions        │
│   (Workflow Runner)     │
└───────────┬─────────────┘
            │
            │ Lee VPS_SSH_PRIVATE_KEY
            │ desde GitHub Secrets
            ▼
┌─────────────────────────┐
│  ~/.ssh/id_ed25519      │
│  (clave privada)        │
└───────────┬─────────────┘
            │
            │ SSH Connection
            │ ssh -i ~/.ssh/id_ed25519
            │ root@77.42.36.27
            ▼
┌─────────────────────────┐
│   VPS Server            │
│   ~/.ssh/authorized_keys│
│   (clave pública)       │
└───────────┬─────────────┘
            │
            │ Autenticación exitosa
            ▼
┌─────────────────────────┐
│  Acceso al servidor     │
│  Ejecutar deploy.sh     │
└─────────────────────────┘
```

---

## 🔗 Referencias

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [SSH Key Generation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [ed25519 vs RSA](https://medium.com/risan/upgrade-your-ssh-key-to-ed25519-c6e8d60d3c54)
- [GitHub Actions Security Best Practices](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)

---

## 📞 Soporte

Si tienes problemas con los secrets:

1. Verifica que todos los 7 secrets estén configurados
2. Verifica que los valores no tengan espacios extra o saltos de línea
3. Para la clave SSH, asegúrate de incluir las líneas BEGIN y END
4. Prueba la conexión SSH manualmente antes de usarla en Actions
5. Revisa los logs de GitHub Actions para errores específicos
