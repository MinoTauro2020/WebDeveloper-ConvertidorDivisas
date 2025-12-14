# 🚀 GitHub Actions - Auto Deploy a CyberPanel

Este documento explica cómo configurar GitHub Actions para hacer deploy automático a tu servidor CyberPanel cada vez que hagamos cambios.

## 🎯 ¿Qué hace?

Cada vez que haces **push** a GitHub:
1. GitHub Actions detecta el cambio
2. Se conecta a tu servidor CyberPanel vía SSH
3. Ejecuta `git pull` para sincronizar los cambios
4. Recarga Apache/Nginx automáticamente

**Ventaja:** No necesitas hacer nada manual. Los cambios se despliegan automáticamente.

---

## 📋 Requisitos Previos

1. ✅ Servidor CyberPanel con acceso SSH
2. ✅ Usuario SSH con permisos para `git`, `systemctl`
3. ✅ Git instalado en el servidor
4. ✅ Repositorio en GitHub (ya tienes este)

---

## 🔐 PASO 1: Generar SSH Key para GitHub Actions

En tu servidor CyberPanel, crea una SSH key específica para GitHub:

```bash
# Conéctate a tu servidor
ssh root@tu_ip_server

# Generar SSH key (sin password)
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_deploy -N ""

# Ver la clave privada (la necesitarás después)
cat ~/.ssh/github_deploy

# Ver la clave pública (para autorizar)
cat ~/.ssh/github_deploy.pub
```

---

## 🔑 PASO 2: Autorizar la SSH Key en tu Servidor

En tu servidor CyberPanel:

```bash
# Ir a home del usuario
cd ~

# Si no existe .ssh, crearlo
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Agregar la clave pública a authorized_keys
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Verificar que funciona
ssh -i ~/.ssh/github_deploy root@localhost echo "✅ SSH funciona"
```

---

## 🐙 PASO 3: Configurar Secrets en GitHub

1. Ve a tu repositorio en GitHub
2. Click en **Settings**
3. En el menú izquierdo, click en **Secrets and variables** → **Actions**
4. Click en **New repository secret**

Añade estos secrets (botón "New repository secret"):

### Secret 1: CYBERPANEL_HOST
```
Valor: tu_ip_server (ej: 1.2.3.4)
```

### Secret 2: CYBERPANEL_USER
```
Valor: root (o el usuario que uses)
```

### Secret 3: CYBERPANEL_PORT
```
Valor: 22 (puerto SSH, normalmente 22)
```

### Secret 4: CYBERPANEL_SSH_KEY
```
Valor: [Contenido completo de ~/.ssh/github_deploy]
       (Sin modificar, tal cual sale del 'cat' comando)
```

### Secret 5: PROJECT_PATH
```
Valor: /ruta/al/proyecto (ej: /home/username/public_html/convertidordivisas)
```

---

## ✅ Ejemplo de configuración de Secrets

| Secret Name | Valor |
|-------------|-------|
| CYBERPANEL_HOST | 192.168.1.100 |
| CYBERPANEL_USER | root |
| CYBERPANEL_PORT | 22 |
| CYBERPANEL_SSH_KEY | -----BEGIN RSA PRIVATE KEY----- ... -----END RSA PRIVATE KEY----- |
| PROJECT_PATH | /home/user/public_html/convertidordivisas |

---

## 🧪 PASO 4: Probar el Workflow

1. Hacer un pequeño cambio en cualquier archivo
2. Commit y push a GitHub:
   ```bash
   git add .
   git commit -m "test: Test GitHub Actions"
   git push origin main
   ```

3. Ver el resultado:
   - Ve a tu repositorio → **Actions**
   - Busca el workflow "Auto Deploy to CyberPanel"
   - Haz click para ver los logs

Si todo está correcto, verás:
```
✅ Cambios sincronizados
✅ Servidor recargado
```

---

## 🔧 Solucionar Problemas

### Error: "Permission denied (publickey)"
**Causa:** La SSH key no está bien configurada
**Solución:**
```bash
# En tu servidor, verifica que la clave está autorizada
cat ~/.ssh/authorized_keys | grep -i github
```

### Error: "Sudo: no tty present and no askpass program specified"
**Causa:** `sudo` necesita password pero GitHub Actions no puede darlo
**Solución:** Usar `sudo -n` o modificar sudoers (menos recomendado)

### El workflow no se ejecuta
**Causa:** Está desactivado o hay error en el YAML
**Solución:**
- Ve a **Actions** y verifica que está habilitado
- Revisa los logs para ver el error exacto

---

## 📊 Flujo de Deploy Automático

```
1. Haces un cambio en tu código
   ↓
2. git push origin main
   ↓
3. GitHub detecta el push
   ↓
4. Ejecuta el workflow "Auto Deploy to CyberPanel"
   ↓
5. Se conecta a tu servidor vía SSH
   ↓
6. Ejecuta: git pull (sincroniza cambios)
   ↓
7. Ejecuta: systemctl reload apache2/nginx
   ↓
8. 🎉 Tu sitio está actualizado!
   ↓
9. Usuarios ven los cambios automáticamente
```

---

## 🚀 Comandos Útiles

Ver los logs del último deploy:
```bash
# En tu repositorio GitHub → Actions
# Click en el último workflow run
# Expande "Deploy to CyberPanel Server"
```

Ejecutar deploy manual (sin cambios):
```bash
# En tu servidor
cd /ruta/del/proyecto
git pull origin main
sudo systemctl reload apache2  # o nginx
```

---

## 📝 Notas Importantes

1. **Seguridad:** La SSH key es privada y solo GitHub la ve
2. **Permisos:** El usuario SSH necesita permisos para `git` y `systemctl`
3. **Branches:** El workflow se ejecuta en push a `main` y `claude/add-exchange-articles-*`
4. **Recargas:** Usa `reload` en lugar de `restart` para evitar downtime
5. **Sin contraseña:** Asegúrate de que la SSH key NO tiene contraseña

---

## 🎯 Checklist Final

- [ ] SSH key generada en el servidor
- [ ] Clave pública añadida a `authorized_keys`
- [ ] SSH keys configuradas en GitHub Secrets
- [ ] Workflow file presente (`.github/workflows/deploy.yml`)
- [ ] Primer push realizado y sincronizado
- [ ] Verificado que Apache/Nginx se recargó
- [ ] Visto en https://convertidordivisas.es que los cambios aparecen

---

## 💬 Preguntas Frecuentes

**P: ¿Qué pasa si el servidor está fuera de línea?**
R: El workflow fallará, pero puedes reintentar manual en GitHub Actions.

**P: ¿Se elimina la SSH key de GitHub después?**
R: No, GitHub la guarda encriptada. Solo la usa durante el deploy.

**P: ¿Puedo usar una rama diferente?**
R: Sí, edita el `.github/workflows/deploy.yml` y cambial la rama.

**P: ¿Qué pasa si hay conflictos en git?**
R: El workflow fallará. Necesitarás resolver el conflicto manualmente.

---

**Próximo paso:** Ejecutar el setup y reportar si todo funciona ✅
