# 📧 Configuración de Gmail para el Formulario de Contacto

Este documento te guía paso a paso para configurar Gmail con App Password en tu aplicación.

## 📋 Pasos para generar un App Password de Google

### 1. Verificación en Dos Pasos (Requisito)
Primero, debes tener activada la verificación en dos pasos en tu cuenta de Google:

1. Ve a [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. En la sección "Cómo accedes a Google", busca **"Verificación en dos pasos"**
3. Si no está activada, haz clic para activarla y sigue las instrucciones
4. Confirma con tu teléfono u otro método de verificación

### 2. Generar App Password

1. Una vez activada la verificación en dos pasos, regresa a [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Busca la sección **"Contraseñas de aplicaciones"** o **"App Passwords"**
   - También puedes ir directamente a: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Puede que te pida iniciar sesión nuevamente
4. En "Seleccionar la app y el dispositivo":
   - **App**: Selecciona "Correo" o "Mail"
   - **Dispositivo**: Selecciona "Otro (nombre personalizado)" y escribe "Architecture Portfolio" o el nombre que prefieras
5. Haz clic en **"Generar"**
6. Google te mostrará una contraseña de 16 caracteres (ejemplo: `abcd efgh ijkl mnop`)
7. **¡IMPORTANTE!** Copia esta contraseña inmediatamente, no podrás verla de nuevo

### 3. Configurar las Variables de Entorno

1. Abre tu archivo `.env` en la raíz del proyecto
2. Agrega estas dos líneas (reemplaza con tus datos):

```env
GMAIL_USER="tu-email@gmail.com"
GMAIL_APP_PASSWORD="abcdefghijklmnop"
```

**Nota:** Cuando copies la contraseña, quita los espacios. Por ejemplo:
- Google muestra: `abcd efgh ijkl mnop`
- Tú escribes: `abcdefghijklmnop`

### 4. Ejemplo Completo de .env

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
AUTH_SECRET="tu-secret-key"
AUTH_URL="http://localhost:3000"

# Gmail Configuration
GMAIL_USER="fernando.rabago@gmail.com"
GMAIL_APP_PASSWORD="abcdefghijklmnop"
```

### 5. Reiniciar el Servidor

Después de agregar las variables de entorno:

```bash
# Detener el servidor (Ctrl + C)
# Reiniciar
pnpm dev
```

## ✅ Verificar que Funciona

1. Ve a tu sitio web: `http://localhost:3000/es/contact`
2. Llena el formulario de contacto
3. Haz clic en "Enviar mensaje"
4. Deberías recibir un email en tu Gmail en segundos

## 🔒 Seguridad

- **NUNCA** compartas tu App Password
- **NUNCA** subas el archivo `.env` a GitHub (está en `.gitignore`)
- Si crees que tu App Password fue comprometida, elimínala y genera una nueva
- Puedes revocar App Passwords en cualquier momento desde tu cuenta de Google

## ❓ Problemas Comunes

### Error: "Invalid login"
- Verifica que copiaste bien el email y la contraseña
- Asegúrate de quitar los espacios de la App Password
- Verifica que la verificación en dos pasos esté activada

### Error: "Authentication failed"
- Confirma que estás usando un **App Password**, no tu contraseña normal de Gmail
- Regenera el App Password si es necesario

### No recibo emails
- Verifica la carpeta de spam en Gmail
- Revisa los logs de la consola del servidor para ver errores
- Confirma que las variables de entorno están cargadas correctamente

## 📞 Soporte

Si tienes problemas, revisa:
1. Los logs del servidor (terminal donde corre `pnpm dev`)
2. La consola del navegador (F12 > Console)
3. Que las variables de entorno estén bien escritas (sin espacios extra)

---

**¡Listo!** Tu formulario de contacto ahora enviará emails reales a tu Gmail gratuitamente.
