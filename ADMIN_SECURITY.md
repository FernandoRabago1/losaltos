# 🔐 Seguridad del Panel de Administración

## Estado Actual de Seguridad

✅ **Registro público deshabilitado** - Nadie puede crear nuevas cuentas desde `/admin/register`
✅ **Solo tú tienes acceso** - Solo las cuentas existentes pueden iniciar sesión
✅ **Contraseñas encriptadas** - Todas las contraseñas están hasheadas con bcrypt

---

## 🔑 Cómo Cambiar tu Contraseña

Sigue estos pasos para cambiar tu contraseña de administrador:

### Método 1: Script Interactivo (Recomendado)

1. **Abre una nueva terminal** (sin detener el servidor)

2. **Ejecuta el comando:**
   ```bash
   pnpm change-password
   ```

3. **Sigue las instrucciones:**
   - Ingresa tu email: `tuEmail@ejemplo.com`
   - Ingresa la nueva contraseña (mínimo 6 caracteres)
   - Confirma la nueva contraseña

4. **¡Listo!** Tu contraseña ha sido actualizada

### Método 2: Prisma Studio (Visual)

1. **Abre Prisma Studio:**
   ```bash
   pnpm db:studio
   ```

2. **Navega a la tabla `User`**

3. **Busca tu usuario** y haz click en él

4. **Para la contraseña, necesitas hashearla primero:**
   - Ve a: https://bcrypt-generator.com/
   - Ingresa tu nueva contraseña
   - Copia el hash generado
   - Pégalo en el campo `password`

5. **Guarda los cambios**

---

## 👥 Gestión de Usuarios

### Ver todos los usuarios

```bash
pnpm db:studio
```

Luego navega a la tabla `User` para ver todos los administradores.

### Eliminar un usuario

1. Abre Prisma Studio: `pnpm db:studio`
2. Ve a la tabla `User`
3. Selecciona el usuario que quieres eliminar
4. Haz click en "Delete"

---

## 🚨 ¿Olvidaste tu Contraseña?

Si olvidaste tu contraseña, puedes restablecerla usando Prisma Studio:

1. **Abre Prisma Studio:**
   ```bash
   pnpm db:studio
   ```

2. **Genera un nuevo hash de contraseña:**
   - Ve a: https://bcrypt-generator.com/
   - Ingresa una nueva contraseña temporal (ej: `temp123456`)
   - Copia el hash generado

3. **Actualiza tu usuario:**
   - En Prisma Studio, ve a la tabla `User`
   - Encuentra tu usuario por email
   - Pega el hash en el campo `password`
   - Guarda

4. **Inicia sesión** con la contraseña temporal

5. **Cambia tu contraseña** usando el script:
   ```bash
   pnpm change-password
   ```

---

## 🛡️ Recomendaciones de Seguridad

### ✅ Buenas Prácticas

- **Usa una contraseña fuerte**: Mínimo 12 caracteres, mezcla de mayúsculas, minúsculas, números y símbolos
- **No compartas tu contraseña**: Cada administrador debe tener su propia cuenta
- **Cierra sesión**: Siempre cierra sesión cuando termines de trabajar
- **Mantén el registro deshabilitado**: No vuelvas a habilitar `/admin/register` en producción

### 🔒 Contraseñas Recomendadas

❌ **Débiles:**
- `123456`
- `password`
- `admin123`

✅ **Fuertes:**
- `MyStr0ng!P@ssw0rd2025`
- `Architecture#2025$Secure`
- `Los@lt0s!Admin#2025`

---

## 📝 Acceso al Panel

**URL de Login:** `https://tudominio.com/admin/login`

**Usuarios Actuales:**
Puedes ver todos los usuarios registrados en Prisma Studio:
```bash
pnpm db:studio
```

---

## 🆘 Soporte

Si tienes algún problema:

1. Verifica que estés usando el email correcto
2. Asegúrate de que la contraseña tenga al menos 6 caracteres
3. Revisa que el servidor de desarrollo esté corriendo
4. Si todo falla, usa Prisma Studio para actualizar manualmente

---

## 📊 Base de Datos

**Ubicación:** `prisma/dev.db` (SQLite)

**Backup:** Siempre haz un backup antes de modificar usuarios:
```bash
cp prisma/dev.db prisma/dev.db.backup
```

**Restaurar backup:**
```bash
cp prisma/dev.db.backup prisma/dev.db
```

---

**Última actualización:** Enero 2025
**Versión:** 1.0.0
