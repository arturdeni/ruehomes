# 📚 Guía de Gestión de Propiedades en Hygraph

## ✅ Configuración Completada

Tu proyecto ya está conectado a Hygraph y funcionando con datos reales.

### Archivos Actualizados:
- ✅ [src/pages/Properties.jsx](src/pages/Properties.jsx) - Listado de propiedades desde Hygraph
- ✅ [src/components/property/PropertyDetail.jsx](src/components/property/PropertyDetail.jsx) - Detalles de propiedad
- ✅ [src/components/property/PropertyCard.jsx](src/components/property/PropertyCard.jsx) - Tarjeta de propiedad
- ✅ [src/services/hygraph.js](src/services/hygraph.js) - Cliente GraphQL configurado
- ✅ `.env.local` - Variables de entorno configuradas

---

## 🔧 Configuración Actual

### **Endpoint:**
```
https://ap-south-1.cdn.hygraph.com/content/cmhcwm35h00kb07uqqz5bwwpn/master
```

### **Autenticación:**
- **No requiere token** (endpoint público CDN)
- Ideal para lecturas públicas
- Sin límites de autenticación

---

## 📋 Schema del Modelo Property

Tu modelo actual en Hygraph tiene estos campos:

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| **title** | Single line text | ✅ Sí | Título de la propiedad |
| **description** | Rich text | ✅ Sí | Descripción completa |
| **price** | Number (Int) | ✅ Sí | Precio en euros |
| **propertyType** | Enumeration | ⚠️ No | Tipo: `apartment`, `house`, `penthouse`, `duplex` |
| **propertyStatus** | Enumeration | ✅ Sí | Estado: `sale`, `rent`, `sold` |
| **bedrooms** | Number (Int) | ⚠️ No | Número de habitaciones |
| **bathrooms** | Number (Int) | ⚠️ No | Número de baños |
| **area** | Number (Int) | ✅ Sí | Superficie en m² |
| **address** | Single line text | ✅ Sí (Unique) | Dirección completa |
| **city** | Single line text | ✅ Sí | Ciudad |
| **coordinates** | Location | ⚠️ No | Latitud y longitud |
| **images** | Asset (multiple) | ⚠️ No | Fotos de la propiedad |
| **features** | Multi line text (multiple) | ⚠️ No | Características (array) |
| **energyRating** | Single line text | ⚠️ No | Certificado energético (A-G) |
| **yearBuilt** | Number (Int) | ⚠️ No | Año de construcción |
| **createdAt** | DateTime (System) | ✅ Auto | Fecha de creación |
| **updatedAt** | DateTime (System) | ✅ Auto | Fecha de actualización |

---

## 🚀 Cómo Añadir Propiedades en Hygraph

### 1. Acceder a Hygraph
1. Ve a [app.hygraph.com](https://app.hygraph.com)
2. Inicia sesión
3. Selecciona el proyecto **Rue Homes**

### 2. Crear una Nueva Propiedad

1. **Click en "Content"** en el menú lateral
2. **Click en "Properties"**
3. **Click en "+ Create entry"**

### 3. Rellenar los Campos

#### **📝 Campos Obligatorios:**

```
✅ Title: "Ático luminoso en el centro de Barcelona"
✅ Description: Descripción detallada con formato rich text
✅ Price: 450000 (euros)
✅ Property Status: "sale" (o "rent", "sold")
✅ Area: 120 (m²)
✅ Address: "Calle Aragón 245, 3ºA"
✅ City: "Barcelona"
```

#### **📸 Subir Imágenes:**

1. **Click en el campo "Images"**
2. **Arrastra y suelta** tus fotos o **click en "Upload"**
3. **Orden de imágenes:**
   - La primera imagen = imagen principal
   - Resto = galería
4. **Formatos recomendados:**
   - WebP (mejor compresión)
   - JPEG de alta calidad
   - Resolución: 1920x1080px
   - Peso: 200-500KB

#### **🏠 Campos Opcionales (pero recomendados):**

```
⚠️ Property Type: "apartment" (apartment, house, penthouse, duplex)
⚠️ Bedrooms: 3
⚠️ Bathrooms: 2
⚠️ Coordinates: Marcar en el mapa
⚠️ Features:
   - Ascensor
   - Terraza
   - Aire acondicionado
   - Parking
⚠️ Energy Rating: "B"
⚠️ Year Built: 1985
```

---

## 📤 Publicar una Propiedad

**IMPORTANTE:** Las propiedades solo aparecen en la web cuando están **Publicadas**.

### Pasos:
1. Completa todos los campos obligatorios
2. **Click en "Save"** (arriba a la derecha)
3. **Click en "Publish"** (botón verde)
4. ✅ La propiedad aparece inmediatamente en la web

### Estados de Contenido:
- 🟡 **Draft** (Borrador) - No visible en la web
- 🟢 **Published** (Publicado) - ✅ Visible en la web
- 🟠 **Changed** (Modificado) - Hay cambios sin publicar

**Recuerda publicar después de cada cambio para que se vean en la web.**

---

## 🖼️ Gestión de Imágenes

### **Capacidad de Hygraph (Plan Free):**
- **Storage:** 500 GB de assets
- **Bandwidth:** 50 GB/mes de transferencia
- **Optimización:** Automática vía CDN global
- **Transformaciones:** On-the-fly (resize, quality, format)

### **Mejores Prácticas:**

#### **1. Formato Recomendado:**
```
✅ WebP (mejor compresión, soporte moderno)
✅ JPEG de alta calidad (mayor compatibilidad)
❌ PNG (muy pesado, solo para logos/transparencias)
```

#### **2. Resolución:**
```
Foto principal: 1920x1080px (Full HD)
Fotos galería: 1920x1080px
Peso objetivo: 200-500KB por imagen
```

#### **3. Optimización Automática:**
Hygraph optimiza las imágenes automáticamente. El código ya usa transformaciones:

```javascript
// Ejemplo de URL transformada automáticamente
Original: https://media.graphassets.com/abc123/image.jpg
→ Hygraph CDN optimiza automáticamente
```

---

## 🔄 Editar Propiedades Existentes

1. Ve a **Content → Properties**
2. **Click en la propiedad** que quieres editar
3. Realiza los cambios
4. **Click en "Save"**
5. ⚠️ **Click en "Publish"** para aplicar los cambios

---

## 🗑️ Eliminar una Propiedad

### Opción 1: Ocultar temporalmente
1. Click en la propiedad
2. Click en **"..."** (menú)
3. Selecciona **"Unpublish"**
4. La propiedad desaparece de la web pero sigue en Hygraph

### Opción 2: Eliminar permanentemente
1. Click en la propiedad
2. Click en **"..."** (menú)
3. Selecciona **"Delete"**
4. ⚠️ **No se puede recuperar**

---

## 📊 Tipos de Propiedad Disponibles

En el campo **Property Type**, puedes elegir:

| Valor | Etiqueta en la web |
|-------|-------------------|
| `apartment` | Piso |
| `house` | Casa |
| `penthouse` | Ático |
| `duplex` | Dúplex |

*Si necesitas más tipos, puedes editar el Enumeration en Schema → Property → propertyType*

---

## 🏷️ Estados de Propiedad

En el campo **Property Status**:

| Valor | Significado | Uso |
|-------|-------------|-----|
| `sale` | En Venta | Propiedades disponibles para comprar |
| `rent` | En Alquiler | Propiedades disponibles para alquilar |
| `sold` | Vendido | Propiedades ya vendidas (histórico) |

---

## ⚙️ Configuración de Campos del Sistema

Los campos **createdAt** y **updatedAt** ya están habilitados y funcionando.

### Si necesitas verificar:
1. Ve a **Schema → Property**
2. Los campos del sistema aparecen automáticamente en las queries
3. No necesitas configuración adicional

---

## 🔍 Probar las Queries en API Playground

Hygraph tiene un playground para probar queries GraphQL:

1. Ve a **API Playground** en el menú lateral
2. Prueba esta query:

```graphql
{
  properties {
    id
    title
    price
    propertyStatus
    images {
      url
    }
    createdAt
    updatedAt
  }
}
```

3. Deberías ver todas tus propiedades publicadas

---

## 🚨 Solución de Problemas

### ❌ Las propiedades no aparecen en la web

**Verifica:**
1. ✅ ¿Está **Published** la propiedad? (no solo guardada)
2. ✅ ¿El endpoint en `.env.local` es correcto?
3. ✅ ¿Reiniciaste el servidor de desarrollo después de cambiar `.env`?
4. ✅ Abre la consola del navegador (F12) para ver errores

**Solución:**
- Ve a Content → Properties
- Click en la propiedad
- Click en **"Publish"** (botón verde)
- Recarga la web (F5)

---

### ❌ Las imágenes no cargan

**Verifica:**
1. ✅ Las imágenes están subidas en Assets
2. ✅ Las imágenes tienen URL válida
3. ✅ El formato es WebP o JPEG

**Solución:**
- Re-sube la imagen
- Usa formato WebP o JPEG
- Verifica que la URL comienza con `https://media.graphassets.com/`

---

### ❌ Error en la consola del navegador

**Errores comunes:**

**1. Error 400 "field 'X' is not defined":**
- El campo no existe en tu schema de Hygraph
- Revisa que tu schema coincida con la guía

**2. Error de CORS:**
- El endpoint CDN público no debería dar CORS
- Verifica que usas el endpoint correcto

**3. Error "Cannot read properties of undefined":**
- Campos opcionales sin datos
- El código ya maneja campos vacíos con valores por defecto

---

## 📝 Campos Calculados Automáticamente

Estos campos se añaden automáticamente en el código:

| Campo | Valor por Defecto | Descripción |
|-------|-------------------|-------------|
| `agent` | Rue Homes | Información de contacto placeholder |
| `nearbyPlaces` | `[]` | Array vacío (para futuras expansiones) |
| `status` | `propertyStatus` | Compatibilidad con código antiguo |

---

## 🎯 Próximos Pasos (Opcional)

### 1. Añadir más propiedades
- Sube 5-10 propiedades reales
- Usa imágenes de calidad
- Completa todos los campos

### 2. Personalizar información de contacto
En el futuro, puedes crear un modelo `Agent` en Hygraph y relacionarlo con propiedades.

### 3. Añadir filtros avanzados
El código ya soporta filtros por:
- ✅ Ciudad
- ✅ Tipo de propiedad
- ✅ Número de habitaciones
- ✅ Rango de precio
- ✅ Búsqueda por texto

---

## 🔐 Seguridad y Rendimiento

### **Endpoint Público CDN:**
- ✅ **Sin autenticación** necesaria
- ✅ **Cacheo automático** vía CDN global
- ✅ **Alta disponibilidad**
- ✅ **Solo lectura** (no se puede modificar desde el frontend)

### **Límites del Plan Free:**
```
✅ 1M API requests/mes
✅ 500 GB storage
✅ 50 GB bandwidth/mes
✅ Propiedades ilimitadas
✅ CDN global incluido
```

**Suficiente para una agencia pequeña/mediana.**

---

## 📞 Recursos Adicionales

- **Documentación Hygraph:** [hygraph.com/docs](https://hygraph.com/docs)
- **API Playground:** Disponible en tu panel de Hygraph
- **GraphQL Docs:** Generadas automáticamente en el playground
- **Community:** [hygraph.com/community](https://hygraph.com/community)

---

## ✨ Resumen de Uso Diario

### **Para añadir una propiedad:**
1. Content → Properties → + Create entry
2. Rellena campos obligatorios
3. Sube imágenes
4. Save → Publish ✅

### **Para editar una propiedad:**
1. Content → Properties → Click en la propiedad
2. Edita lo que necesites
3. Save → Publish ✅

### **Para ocultar/eliminar:**
1. Content → Properties → Click en la propiedad
2. Menu (...) → Unpublish (ocultar) o Delete (eliminar)

---

## 🎉 ¡Todo Listo!

Tu sitio web ya está funcionando con datos reales de Hygraph. Solo necesitas:

1. ✅ Añadir tus propiedades reales
2. ✅ Subir fotos de calidad
3. ✅ Publicar cada propiedad
4. ✅ ¡Listo para mostrar a tus clientes!

**¡Bienvenido a tu nueva plataforma inmobiliaria! 🏡**
