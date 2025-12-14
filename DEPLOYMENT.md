# 🚀 GUÍA DE DEPLOYMENT - ConvertidorDivisas.es

## RESUMEN EJECUTIVO

Esta es una **web completamente estática** (HTML, CSS, JavaScript). No necesita:
- ❌ Base de datos
- ❌ Backend/Servidor
- ❌ Node.js o Python instalado
- ❌ SSL/Certificados especiales

Solo necesita:
- ✅ Servidor HTTP (Apache, Nginx, Vercel, etc)
- ✅ Soporte para .htaccess (si usas Apache)
- ✅ HTTPS (recomendado)

---

## OPCIÓN 1: VERCEL (RECOMENDADO - MÁS FÁCIL) ⭐

### Paso 1: Crear cuenta
```
Ve a: https://vercel.com/signup
Crea cuenta con GitHub/GitLab/Bitbucket
```

### Paso 2: Importar proyecto
```
1. En Vercel Dashboard → "New Project"
2. Selecciona tu repositorio
3. Click "Import"
```

### Paso 3: Configurar
```
Framework: Other (es estático)
Build Command: (dejar en blanco)
Output Directory: . (punto)
```

### Paso 4: Deploy
```
Click "Deploy"
¡Hecho! Tu sitio está en vivo en: yourdomain.vercel.app
```

### Paso 5: Dominio personalizado
```
1. Compra dominio en Namecheap/Google Domains
2. En Vercel → Settings → Domains
3. Añade tu dominio
4. Apunta nameservers (Vercel te guía)
```

---

## OPCIÓN 2: NETLIFY (TAMBIÉN FÁCIL)

### Paso 1: Conectar repositorio
```
Ve a: https://app.netlify.com/
Click "New site from Git"
Selecciona tu repositorio
```

### Paso 2: Build settings
```
Build command: (dejar vacío)
Publish directory: . (punto)
```

### Paso 3: Deploy
```
Click "Deploy Site"
Tu sitio está en: yourname.netlify.app
```

---

## OPCIÓN 3: GITHUB PAGES (GRATIS)

### Paso 1: Pushear a rama main
```bash
git checkout main
git merge claude/add-exchange-articles-01XfhSYjkhgW7rB6YMMGHkxm
git push origin main
```

### Paso 2: Habilitar Pages
```
1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: Deploy from branch
4. Branch: main
5. Folder: / (root)
6. Click "Save"
```

### Paso 3: Dominio personalizado
```
En Settings → Pages → Custom domain
Ingresa: convertidordivisas.es
Apunta nameservers en tu registrador
```

---

## OPCIÓN 4: HOSTING TRADICIONAL (CPANEL)

### Paso 1: Preparar archivos
```bash
# En tu máquina local
zip -r site.zip .
```

### Paso 2: Subir archivos
```
1. En cPanel → File Manager
2. O vía FTP (Filezilla)
3. Sube archivos a: public_html/
4. Asegúrate que .htaccess está VISIBLE
```

### Paso 3: Verificar
```
1. Ve a: https://tudominio.com
2. Si falla, contacta soporte del hosting
3. Verifica que mod_rewrite está activo
```

### Paso 4: Habilitar HTTPS
```
En cPanel → AutoSSL
Click "Check & Install"
(Generalmente automático)
```

---

## OPCIÓN 5: RENDER

### Paso 1: Conectar
```
Ve a: https://render.com
"New Static Site"
Selecciona repositorio
```

### Paso 2: Configurar
```
Build command: (vacío)
Publish directory: . (punto)
```

### Paso 3: Deploy
```
Click "Create Static Site"
Tu sitio está en vivo
```

---

## POST-DEPLOYMENT CHECKLIST

### ✅ Verificaciones técnicas
- [ ] Sitio carga en https://tudominio.com
- [ ] index.html carga correctamente
- [ ] /blog/ redirecciona correctamente
- [ ] Todas las imágenes cargan
- [ ] CSS y JavaScript funcionan
- [ ] Formularios responden
- [ ] Widget JavaScript funciona

### ✅ SEO y Indexación
- [ ] Google Search Console configurado
- [ ] Sitemap enviado a Google
- [ ] robots.txt accesible
- [ ] Meta tags son correctos
- [ ] Open Graph tags funciona
- [ ] Schema.org data visible

### ✅ Configuración
- [ ] Google AdSense activo
- [ ] Google Analytics funciona
- [ ] Emails de contacto configurados
- [ ] Newsletter form listo
- [ ] 301 redirects funcionan

### ✅ Performance
- [ ] PageSpeed score > 80
- [ ] Tiempo carga < 3 segundos
- [ ] Mobile responsive
- [ ] No hay console errors
- [ ] No hay 404 errors

---

## MONITOREO POST-DEPLOY

### Google Search Console
```
1. Ve a: https://search.google.com/search-console
2. Añade propiedad: https://tudominio.com
3. Verifica con DNS
4. Envía sitemap
5. Monitorea "Cobertura" y "Rendimiento"
```

### Google Analytics
```
1. Ve a: https://analytics.google.com
2. Crea nueva propiedad
3. Añade código de seguimiento
4. Monitorea usuarios, bounces, conversiones
```

### Herramientas SEO
```
Usa regularmente:
- Google PageSpeed Insights
- GTmetrix
- Semrush (versión libre)
- Ahrefs (versión libre)
```

---

## ACTUALIZAR CONTENIDO DESPUÉS DE DEPLOY

### Agregar nuevo artículo de blog
```bash
# 1. Crea carpeta
mkdir -p /home/user/WebDeveloper-ConvertidorDivisas/blog/nuevo-articulo

# 2. Crea index.html con contenido

# 3. Commit y push
git add blog/nuevo-articulo/
git commit -m "feat: Add new blog article"
git push origin main

# 4. Vercel/Netlify auto-deploya
```

### Editar contenido existente
```bash
# 1. Edita archivo HTML
nano /path/to/file.html

# 2. Commit
git add -A
git commit -m "feat: Update content"
git push origin main

# 3. Deploy automático (en Vercel/Netlify)
```

---

## PROBLEMAS COMUNES Y SOLUCIONES

### Problema: "404 Not Found"
```
Causa: Archivos no están en el lugar correcto
Solución:
1. Verifica estructura de carpetas
2. Usa paths absolutos en enlaces
3. Comprueba que .htaccess existe
```

### Problema: "/blog redirecciona infinitamente"
```
Causa: .htaccess mal configurado
Solución:
1. Verifica .htaccess está en raíz
2. Asegura mod_rewrite está activo
3. Prueba en diferente hosting
```

### Problema: "AdSense no muestra anuncios"
```
Causa: Sitio nuevo (Google tarda 48h)
Solución:
1. Espera 48-72 horas
2. Verifica código de cliente
3. Prueba en incógnito
4. Contacta soporte Google
```

### Problema: "Widget no funciona en otros sitios"
```
Causa: CORS o URL incorrecta
Solución:
1. Verifica HTTPS está activo
2. Usa URL completa en script src
3. Prueba en navegador diferente
4. Habilita CORS en servidor
```

---

## COMANDOS ÚTILES

### Ver estado del repositorio
```bash
git status
git log --oneline -10
```

### Hacer cambios y publicar
```bash
git add .
git commit -m "Descripción del cambio"
git push origin main
```

### Ver cambios recientes
```bash
git diff
git diff HEAD~1
```

---

## SOPORTE

Si algo no funciona:
1. Verifica los logs en tu plataforma de hosting
2. Usa Developer Tools (F12) para ver errores
3. Contacta al soporte de la plataforma
4. Email: bugs@convertidordivisas.es

---

## CHECKLIST FINAL ANTES DE PUBLICAR

- [ ] Dominio comprado y apunta correctamente
- [ ] HTTPS está activo
- [ ] Sitio carga sin errores
- [ ] Google AdSense código correcto
- [ ] Sitemap enviado a Google
- [ ] Analytics está recibiendo datos
- [ ] Emails de contacto funcionan
- [ ] Widget se puede insertar en otros sitios
- [ ] Mobile version se ve bien
- [ ] Contacto + Newsletter formas funcionan

**¡LISTO PARA PUBLICAR! 🎉**

---

© 2025 ConvertidorDivisas.es
