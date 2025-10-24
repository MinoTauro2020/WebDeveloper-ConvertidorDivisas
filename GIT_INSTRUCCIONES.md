# 📦 Guía: Subir a GitHub/GitLab

## ✅ TODO ACTUALIZADO A .ES

He actualizado todos los archivos para usar **convertidordivisas.es**:

- ✅ frontend/.env → REACT_APP_SITE_URL=https://convertidordivisas.es
- ✅ frontend/public/sitemap.xml → Todas las URLs con .es
- ✅ frontend/public/index.html → Meta tags con .es
- ✅ frontend/src/components/SEOHead.js → Todos los schemas con .es
- ✅ frontend/src/components/BlogSection.js → URLs del blog con .es
- ✅ frontend/src/App.js → Branding y contenido con .es
- ✅ .gitignore → Actualizado para no subir archivos sensibles

---

## 🚀 OPCIÓN 1: Subir a GitHub (Recomendado)

### Paso 1: Crear Repositorio en GitHub

1. Ve a: https://github.com/new
2. Nombre: `conversor-divisas` o `convertidordivisas-es`
3. Descripción: `Conversor de divisas online con SEO extremo - React + FastAPI`
4. Privado o Público: Elige según prefieras
5. **NO** marcar "Add README" (ya lo tienes)
6. Click **"Create repository"**

### Paso 2: Inicializar Git (si no está ya)

```bash
cd /app

# Ver si ya existe .git
ls -la .git

# Si NO existe, inicializar
git init

# Configurar tu identidad (primera vez)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### Paso 3: Agregar Archivos

```bash
# Ver qué archivos se agregarán
git status

# Agregar todos los archivos
git add .

# Verificar que .env esté incluido (con placeholders)
git status | grep .env

# Si ves .env en la lista, está bien (tiene placeholders)
```

### Paso 4: Hacer Commit

```bash
git commit -m "Initial commit: Conversor de divisas con SEO extremo

- Backend FastAPI con 5 endpoints
- Frontend React + Tailwind CSS
- 15+ monedas soportadas
- SEO extremo (+2500 palabras)
- 16 preguntas FAQ
- 4 artículos blog
- Schema.org markup completo
- Listo para CyberPanel (.es)
- Documentación completa"
```

### Paso 5: Conectar con GitHub

```bash
# Copiar la URL que GitHub te mostró (algo como):
# https://github.com/tu-usuario/conversor-divisas.git

# Agregar remote
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git

# Verificar
git remote -v
```

### Paso 6: Subir (Push)

```bash
# Primera vez (crear rama main y subir)
git branch -M main
git push -u origin main

# Te pedirá credenciales:
# Username: tu_usuario_github
# Password: usa un Personal Access Token (no tu contraseña)
```

### Paso 7: Obtener Personal Access Token (si lo necesitas)

1. GitHub → Settings (tu perfil)
2. Developer settings → Personal access tokens → Tokens (classic)
3. Generate new token
4. Nombre: "Conversor Divisas Deploy"
5. Marcar: `repo` (full control)
6. Generate token
7. **COPIAR TOKEN** (solo se muestra una vez)
8. Usar como password en git push

---

## 🔄 Actualizaciones Futuras

Cuando hagas cambios:

```bash
# Ver qué cambió
git status

# Agregar cambios
git add .

# O agregar archivos específicos
git add frontend/src/App.js
git add backend/server.py

# Commit con mensaje descriptivo
git commit -m "Feat: Agregar nueva moneda CLP (Peso Chileno)"

# Subir
git push
```

---

## 🔒 IMPORTANTE: Archivos Sensibles

### .env Files - ESTÁN SEGUROS

Los archivos `.env` en el repo tienen **placeholders**:

**frontend/.env:**
```bash
REACT_APP_BACKEND_URL=http://localhost:8001  # ✅ OK para repo
REACT_APP_SITE_URL=https://convertidordivisas.es  # ✅ OK
REACT_APP_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX  # ✅ Placeholder
```

**backend/.env:**
```bash
PORT=8001  # ✅ OK para repo
```

### En Producción (CyberPanel)

**Cambiar solo:**
```bash
# frontend/.env en servidor
REACT_APP_BACKEND_URL=https://convertidordivisas.es
REACT_APP_ADSENSE_CLIENT=ca-pub-TU_ID_REAL_AQUI

# backend/.env (ya está bien)
PORT=8001
```

---

## 📋 Estructura del Repositorio

```
conversor-divisas/
├── .gitignore                    # Archivos a ignorar
├── README.md                     # Documentación principal
├── INICIO_RAPIDO.md              # Guía rápida
├── DEPLOY_CYBERPANEL.md          # Deploy en CyberPanel
├── IMPORTANTE_CYBERPANEL.md      # Info sobre MySQL
├── KEYWORDS_COMPLETAS.md         # Estudio SEO (611K búsquedas/mes)
├── EJEMPLOS_INTEGRACION_KEYWORDS.md
├── INSTRUCCIONES_ADSENSE_SEO.md
├── CARACTERISTICAS.md
├── keywords_generator.py
├── backend/
│   ├── server.py
│   ├── requirements.txt
│   └── .env                      # ✅ Con placeholders
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── robots.txt
│   │   └── sitemap.xml           # ✅ URLs con .es
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   └── ...
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env                      # ✅ Con placeholders
└── tests/
```

---

## 🎯 OPCIÓN 2: Subir a GitLab

Proceso similar a GitHub:

```bash
# 1. Crear repo en GitLab.com
# 2. Copiar URL del repo

# 3. Agregar remote
git remote add origin https://gitlab.com/TU_USUARIO/TU_REPO.git

# 4. Push
git push -u origin main
```

---

## 🌿 Branches Recomendadas

Para desarrollo organizado:

```bash
# Crear rama de desarrollo
git checkout -b development

# Hacer cambios
# ... editar archivos ...

# Commit
git add .
git commit -m "Feat: Nueva funcionalidad"

# Push a development
git push origin development

# Cuando esté listo, merge a main
git checkout main
git merge development
git push origin main
```

---

## 🔍 Comandos Útiles Git

```bash
# Ver estado
git status

# Ver historial
git log --oneline

# Ver diferencias
git diff

# Deshacer cambios (antes de commit)
git checkout -- archivo.js

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Ver branches
git branch -a

# Cambiar de branch
git checkout nombre-branch

# Crear y cambiar a nueva branch
git checkout -b nueva-branch

# Eliminar branch local
git branch -d nombre-branch

# Ver remote
git remote -v

# Actualizar desde GitHub
git pull origin main
```

---

## 📝 Mensaje de Commit: Convenciones

**Formato:**
```
Tipo: Descripción corta

Descripción larga opcional
```

**Tipos:**
- `Feat:` Nueva funcionalidad
- `Fix:` Corrección de bug
- `Docs:` Cambios en documentación
- `Style:` Formato, sin cambios de código
- `Refactor:` Refactorización de código
- `Test:` Agregar tests
- `Chore:` Mantenimiento

**Ejemplos:**
```bash
git commit -m "Feat: Agregar conversor inverso automático"
git commit -m "Fix: Corregir error en gráfico histórico"
git commit -m "Docs: Actualizar README con instrucciones CyberPanel"
git commit -m "Style: Mejorar diseño responsive en móvil"
```

---

## 🎉 README.md Sugerido para GitHub

El actual README.md está perfecto, pero puedes agregar al inicio:

```markdown
# 💱 Conversor de Divisas - ConvertidorDivisas.es

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://convertidordivisas.es)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> Conversor de divisas online con SEO extremo y monetización AdSense ready

## 🚀 Demo en Vivo

[https://convertidordivisas.es](https://convertidordivisas.es)

## ✨ Características

- 🌍 15+ monedas soportadas
- 📊 Gráficos históricos (30 días)
- ⚡ Tasas en tiempo real
- 🔍 SEO extremo (611K búsquedas/mes target)
- 💰 Monetización AdSense ready
- 📱 100% responsive

## 🛠️ Tech Stack

- **Backend:** FastAPI (Python)
- **Frontend:** React 18 + Tailwind CSS
- **Charts:** Recharts
- **API:** ExchangeRate-API (gratuita)

[... resto del README actual ...]
```

---

## 🔐 GitHub Secrets (para CI/CD futuro)

Si configuras GitHub Actions:

```
Settings → Secrets and variables → Actions

Agregar:
- ADSENSE_CLIENT: tu ID real
- SERVER_IP: IP de tu VPS
- SSH_KEY: clave privada SSH
```

---

## ✅ Checklist Final

- [ ] Repositorio creado en GitHub/GitLab
- [ ] Git inicializado en /app
- [ ] Configurado user.name y user.email
- [ ] Archivos agregados (git add .)
- [ ] Commit inicial realizado
- [ ] Remote agregado (origin)
- [ ] Push exitoso a main
- [ ] Verificar en GitHub que todo está
- [ ] .env tiene solo placeholders
- [ ] README.md visible en GitHub

---

## 🎯 Después de Subir

### Agregar Badge de Estado

En README.md (al inicio):
```markdown
[![GitHub](https://img.shields.io/github/stars/TU_USUARIO/conversor-divisas?style=social)](https://github.com/TU_USUARIO/conversor-divisas)
```

### Configurar GitHub Pages (Opcional)

Para documentación:
```
Settings → Pages
Source: Deploy from a branch
Branch: main → /docs
```

---

**¿Listo para subir al repo?** Sigue los pasos de OPCIÓN 1 🚀

**URL del proyecto:** https://github.com/TU_USUARIO/conversor-divisas

**¡Tu código ya está listo para compartir!** 💻✨
