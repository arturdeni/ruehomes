# Configuración de Instagram Graph API

Esta guía te ayudará a obtener los tokens necesarios para mostrar tus posts reales de Instagram en el sitio web.

## Requisitos Previos

1. Tener una **cuenta de Instagram Business o Creator**
2. Tener una **página de Facebook** vinculada a tu cuenta de Instagram
3. Crear una **aplicación de Facebook/Meta**

---

## Paso 1: Convertir tu cuenta de Instagram a Business/Creator

1. Abre la app de Instagram
2. Ve a **Configuración** → **Cuenta** → **Cambiar tipo de cuenta**
3. Selecciona **Cuenta profesional** → **Empresa** o **Creador**
4. Vincula tu cuenta con una página de Facebook (créala si no tienes una)

---

## Paso 2: Crear una aplicación en Meta for Developers

### 2.1 Registrarte como desarrollador

1. Ve a [Meta for Developers](https://developers.facebook.com/)
2. Inicia sesión con tu cuenta de Facebook
3. Acepta los términos de desarrollador si es la primera vez

### 2.2 Crear la aplicación

1. Haz clic en **"Mis aplicaciones"** → **"Crear aplicación"**
2. Selecciona el tipo de aplicación: **"Ninguno"** (Other)
3. Rellena los datos:
   - **Nombre de la aplicación**: "RueHomes Instagram Feed"
   - **Correo de contacto**: tu email
4. Haz clic en **"Crear aplicación"**

---

## Paso 3: Configurar Instagram Graph API

### 3.1 Agregar el producto Instagram

1. En el panel de tu aplicación, busca **"Instagram Graph API"**
2. Haz clic en **"Configurar"** o **"Add to App"**

### 3.2 Configurar Instagram Basic Display (opcional pero recomendado)

1. Ve a **Configuración básica** → **Instagram Basic Display**
2. Haz clic en **"Crear nueva aplicación"**
3. Completa los campos:
   - **Display Name**: RueHomes
   - **Valid OAuth Redirect URIs**: `https://localhost/`
   - **Deauthorize Callback URL**: `https://localhost/`
   - **Data Deletion Request URL**: `https://localhost/`
4. Guarda los cambios

---

## Paso 4: Obtener el Access Token

### 4.1 Usando Graph API Explorer (Método Rápido)

1. Ve a [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Selecciona tu aplicación en el dropdown
3. En **"User or Page"**, selecciona tu página de Facebook
4. Haz clic en **"Generate Access Token"**
5. Acepta los permisos solicitados:
   - `instagram_basic`
   - `pages_show_list`
   - `pages_read_engagement`
6. **Importante**: Este token es de corta duración (1-2 horas)

### 4.2 Obtener el Instagram User ID

Con el Access Token generado:

1. En Graph API Explorer, haz esta consulta:
   ```
   me/accounts
   ```
2. Busca tu página de Facebook y copia el `id`
3. Ahora consulta:
   ```
   {page_id}?fields=instagram_business_account
   ```
4. Copia el `instagram_business_account.id` - **este es tu INSTAGRAM_USER_ID**

### 4.3 Convertir a Long-Lived Token (60 días)

El token generado expira pronto. Para obtener uno de larga duración:

1. Ve a [Access Token Tool](https://developers.facebook.com/tools/accesstoken/)
2. Encuentra tu **User Token**
3. Haz clic en **"Extend Access Token"**
4. Copia el **Long-Lived Access Token**

**O usa esta URL directamente:**

```
https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id={APP_ID}&client_secret={APP_SECRET}&fb_exchange_token={SHORT_LIVED_TOKEN}
```

Reemplaza:
- `{APP_ID}`: ID de tu aplicación (en Configuración básica)
- `{APP_SECRET}`: Clave secreta de tu app (en Configuración básica)
- `{SHORT_LIVED_TOKEN}`: El token que generaste en Graph API Explorer

---

## Paso 5: Configurar las variables de entorno

1. Edita el archivo `.env.local` (ya existe en el proyecto) y agrega tus credenciales de Instagram:
   ```env
   # Frontend Variables (Vite - deben empezar con VITE_)
   VITE_HYGRAPH_ENDPOINT=tu_endpoint_actual
   VITE_HYGRAPH_TOKEN=tu_token_actual
   VITE_GOOGLE_MAPS_KEY=tu_key_actual

   # Backend Variables (Instagram API)
   INSTAGRAM_USER_ID=17841XXXXXXXXXX
   INSTAGRAM_ACCESS_TOKEN=IGQWRXXXXXXXXXXXXXXXXXXXXXXXXXX
   PORT=3001
   ```

2. **IMPORTANTE**: Asegúrate de que `.env.local` esté en tu `.gitignore` para no subir las credenciales a GitHub (ya está configurado)

---

## Paso 6: Instalar dependencias y ejecutar

### 6.1 Instalar las nuevas dependencias

```bash
npm install
```

### 6.2 Ejecutar el proyecto

**Opción 1: Ejecutar frontend y backend por separado**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run dev:server
```

**Opción 2: Ejecutar todo junto**
```bash
npm run dev:all
```

### 6.3 Verificar que funciona

1. Abre `http://localhost:5173` (o el puerto que use Vite)
2. Ve a la sección de Instagram en la home
3. Deberías ver tus posts reales de Instagram

---

## Paso 7: Renovar el Access Token (Cada 60 días)

Los Long-Lived Tokens expiran después de 60 días. Para renovarlos:

### Opción 1: Manualmente

1. Ve de nuevo a [Access Token Tool](https://developers.facebook.com/tools/accesstoken/)
2. Genera un nuevo token
3. Actualiza tu archivo `.env.local`

### Opción 2: Automáticamente (Recomendado para producción)

Puedes configurar un refresh automático usando la API:

```javascript
// Agregar este endpoint a server.js
app.get('/api/instagram/refresh-token', async (req, res) => {
  const response = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
  );
  const data = await response.json();
  // Actualiza el token en tu .env.local o base de datos
});
```

---

## Solución de Problemas

### Error: "Missing Instagram credentials"
- Verifica que el archivo `.env.local` existe y tiene las variables `INSTAGRAM_USER_ID` y `INSTAGRAM_ACCESS_TOKEN`
- Asegúrate de que el servidor backend está corriendo en el puerto 3001

### Error: "Invalid OAuth access token"
- Tu token expiró, genera uno nuevo siguiendo el Paso 4
- Verifica que copiaste el token completo sin espacios

### Error: "Unsupported get request"
- Verifica que tu cuenta de Instagram sea Business o Creator
- Asegúrate de que el User ID es el de tu cuenta Business de Instagram, no el de Facebook

### No aparecen los posts
- Verifica que tu cuenta tiene posts públicos
- Revisa la consola del navegador y del servidor para ver errores específicos
- Prueba la URL directamente: `http://localhost:3001/api/instagram`

---

## Recursos Adicionales

- [Instagram Graph API Documentation](https://developers.facebook.com/docs/instagram-api/)
- [Access Tokens Guide](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/)
- [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api/)

---

## Notas de Seguridad

⚠️ **NUNCA** compartas tu Access Token públicamente
⚠️ **NUNCA** subas tu archivo `.env.local` a GitHub (ya está en .gitignore)
⚠️ Rota tus tokens regularmente
⚠️ En producción, usa variables de entorno del servidor (no un archivo .env.local)
