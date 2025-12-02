# 🖼️ Guía del Editor de Imágenes

## Descripción General

El sistema de carga de imágenes ahora incluye un **editor visual completo** similar a Instagram, que te permite ver la imagen completa, ajustar el encuadre, hacer zoom y definir cómo se verá la imagen en tu portfolio.

---

## ✨ Características Principales

### 1. **Vista Previa Completa**
- Ver la imagen completa en alta calidad antes de publicar
- Preview en pantalla completa con fondo oscuro
- Grid de referencia para mejor composición

### 2. **Ajuste de Relación de Aspecto**
- **Original**: Mantiene las proporciones originales de la imagen
- **16:9**: Ideal para imágenes destacadas (Featured Image)
- **4:3**: Perfecto para galería de proyectos
- **1:1**: Formato cuadrado
- **3:2**: Formato clásico de fotografía

### 3. **Controles de Ajuste de Imagen**
- **Cubrir (Cover)**: Llena todo el espacio, puede recortar bordes
- **Contener (Contain)**: Muestra toda la imagen completa
- **Llenar (Fill)**: Estira la imagen para llenar el espacio

### 4. **Control de Zoom**
- Rango: 50% a 200%
- Controles rápidos: -10%, Reset (100%), +10%
- Slider visual para ajuste preciso

### 5. **Posicionamiento**
- Control horizontal: Ajusta izquierda/derecha
- Control vertical: Ajusta arriba/abajo
- Botón de centrado rápido

---

## 🎯 Cómo Usar

### Paso 1: Subir Imagen

1. Ve a **Admin Dashboard** → **Projects** → **New Project** o **Edit Project**
2. En la sección de imágenes, haz click en el área de carga
3. Selecciona tu imagen (PNG, JPG, JPEG, WebP, máx 5MB)
4. La imagen se sube automáticamente

### Paso 2: Ajustar Imagen (Automático)

Después de subir, el **editor visual se abre automáticamente** mostrando:
- Vista previa de tu imagen en pantalla completa
- Controles de ajuste en el panel lateral
- Grid de referencia para composición

### Paso 3: Personalizar

#### **Seleccionar Relación de Aspecto:**
```
Click en uno de los botones:
- Original (sin recorte)
- 16:9 (landscape amplio)
- 4:3 (landscape estándar)
- 1:1 (cuadrado)
- 3:2 (clásico)
```

#### **Elegir Ajuste:**
```
Cubrir (Cover):
✓ La imagen llena todo el espacio
✓ Puede recortar bordes
✓ Ideal para: Hero images, featured images

Contener (Contain):
✓ Muestra toda la imagen completa
✓ Puede dejar espacios en blanco
✓ Ideal para: Imágenes con detalles importantes

Llenar (Fill):
✓ Estira la imagen para llenar
✗ Puede distorsionar
✓ Ideal para: Backgrounds, patrones
```

#### **Hacer Zoom:**
```
1. Mueve el slider de zoom (50% - 200%)
2. O usa los botones rápidos:
   - Zoom Out (-10%)
   - Reset (100%)
   - Zoom In (+10%)
```

#### **Posicionar:**
```
1. Ajusta el slider horizontal (izquierda/derecha)
2. Ajusta el slider vertical (arriba/abajo)
3. O click en "Centrar" para resetear
```

### Paso 4: Confirmar

1. Revisa cómo se ve tu imagen en el preview
2. Click en **"Confirmar"** para aplicar los ajustes
3. La imagen se guarda con tus preferencias

---

## 📋 Casos de Uso

### **Featured Image (Imagen Principal)**
```
Tipo de imagen: Portada del proyecto
Relación recomendada: 16:9
Ajuste recomendado: Cover
Razón: Máximo impacto visual, llena todo el ancho
```

### **Gallery Images (Galería)**
```
Tipo de imagen: Fotos detalladas del proyecto
Relación recomendada: 4:3 o 3:2
Ajuste recomendado: Cover o Contain
Razón: Balance entre detalle y uniformidad
```

### **Imágenes con Detalles Importantes**
```
Ejemplo: Planos, diagramas, renders técnicos
Relación recomendada: Original
Ajuste recomendado: Contain
Razón: Preserva todos los detalles sin recortar
```

### **Fotografías Artísticas**
```
Ejemplo: Escultura, instalación, arte
Relación recomendada: 1:1 o 3:2
Ajuste recomendado: Cover
Razón: Formato clásico y profesional
```

---

## 🔄 Flujo de Trabajo Recomendado

### Para Nuevo Proyecto:

1. **Preparar imágenes antes:**
   - Resolución mínima: 1920x1080px para featured
   - Resolución mínima: 1200x800px para galería
   - Formato: JPG o WebP para mejor rendimiento

2. **Subir Featured Image primero:**
   - Usar relación 16:9
   - Ajuste Cover para impacto
   - Posicionar el punto focal al centro

3. **Subir Gallery Images:**
   - Mantener consistencia en relación de aspecto
   - Usar Cover para uniformidad
   - Ajustar zoom si es necesario

4. **Revisar antes de publicar:**
   - Click en el ícono de editar (✏️) en cada imagen
   - Verificar que se vea bien
   - Ajustar si es necesario

### Para Editar Proyecto Existente:

1. **Ver imagen actual:**
   - Verás un preview grande (300px altura)
   - Botón de editar (✏️) en la esquina superior derecha

2. **Ajustar si necesitas:**
   - Click en el botón de editar
   - Se abre el editor completo
   - Haz tus ajustes
   - Confirmar

3. **Cambiar imagen completamente:**
   - Click en "Cambiar imagen"
   - Sube nueva imagen
   - Ajusta automáticamente

---

## 💡 Tips Profesionales

### **Composición:**
- Usa la regla de los tercios (grid overlay)
- Mantén el punto focal en las intersecciones del grid
- Evita cortar elementos importantes

### **Calidad:**
- Sube imágenes de alta calidad (2000px+ de ancho)
- El sistema optimiza automáticamente
- Mejor subir grande y ajustar, que subir pequeña

### **Consistencia:**
- Mantén la misma relación de aspecto en toda la galería
- Usa el mismo ajuste (Cover/Contain) en imágenes similares
- Posiciona fotos similares de forma similar

### **Performance:**
- WebP es más ligero que JPG (mismo calidad)
- Evita PNG para fotografías (muy pesado)
- Máximo 5MB por imagen

---

## 🛠️ Controles de Teclado (Próximamente)

En futuras versiones:
- `Espacio`: Zoom in/out
- `Flechas`: Mover posición
- `R`: Reset
- `Enter`: Confirmar
- `Esc`: Cancelar

---

## 📱 Responsive

El editor funciona en:
- ✅ Desktop (experiencia completa)
- ✅ Tablet (controles adaptados)
- ⚠️ Mobile (funcional pero limitado)

*Recomendación: Usar desktop para mejor experiencia de edición*

---

## 🎨 Ejemplos Visuales

### Featured Image - Antes vs Después
```
ANTES: Upload directo
❌ Imagen muy zoomed in
❌ Punto focal fuera de cuadro
❌ Aspecto incorrecto

DESPUÉS: Con editor
✅ Zoom ajustado (120%)
✅ Punto focal centrado
✅ Relación 16:9 perfecta
✅ Preview exacto de cómo se verá
```

### Gallery Image - Comparación
```
Cover (Recomendado)
✅ Todas las imágenes del mismo tamaño
✅ Grid uniforme
✅ Profesional

Contain
✅ Se ve toda la imagen
⚠️ Diferentes tamaños visuales
⚠️ Espacios en blanco

Fill
❌ Imágenes distorsionadas
❌ No recomendado para fotografías
```

---

## 🔍 Troubleshooting

### "La imagen se ve cortada"
**Solución:**
1. Abrir editor (click en ✏️)
2. Cambiar a "Contain" en vez de "Cover"
3. O ajustar zoom a menos de 100%

### "La imagen se ve estirada"
**Solución:**
1. Verificar que no estás usando "Fill"
2. Usar "Cover" o "Contain"
3. Ajustar zoom si es necesario

### "No veo el botón de editar"
**Solución:**
1. La imagen debe estar subida primero
2. Busca el ícono de lápiz (✏️) en la esquina
3. O click en "Ajustar imagen"

### "El editor no se abre"
**Solución:**
1. Verifica que la imagen se haya subido correctamente
2. Verifica que no haya errores en consola
3. Recarga la página

---

## 🚀 Próximas Mejoras

Planeadas para futuras versiones:
- [ ] Filtros de imagen (brillo, contraste, saturación)
- [ ] Recorte libre (drag to crop)
- [ ] Rotación de imagen
- [ ] Múltiple upload con drag & drop
- [ ] Comparación lado a lado (antes/después)
- [ ] Presets guardados
- [ ] Historial de ajustes

---

## 📚 Recursos Adicionales

- **Documentación Admin Dashboard**: `ADMIN_DASHBOARD.md`
- **Guía de Features**: `NEW_FEATURES.md`
- **Quick Start**: `QUICK_START.md`

---

**Última actualización:** Enero 2025
**Versión:** 2.1.0
**Estado:** ✅ Production Ready

---

## 🎓 Video Tutorial (Próximamente)

Estará disponible en:
- YouTube: Tutorial completo paso a paso
- Documentación interna: GIFs animados de cada paso
