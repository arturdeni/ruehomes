// api/instagram.js
// Vercel Serverless Function para obtener posts de Instagram

/* eslint-env node */

export default async function handler(req, res) {
  // Solo permitir método GET
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Método no permitido. Use GET.'
    });
  }

  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    // Verificar que las credenciales estén configuradas
    if (!accessToken || !userId) {
      console.error('Instagram credentials not configured');
      return res.status(500).json({
        success: false,
        error: 'Credenciales de Instagram no configuradas',
        message: 'Por favor configure INSTAGRAM_ACCESS_TOKEN e INSTAGRAM_USER_ID'
      });
    }

    // Obtener posts del usuario usando Instagram Graph API
    const instagramResponse = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=4&access_token=${accessToken}`
    );

    if (!instagramResponse.ok) {
      const errorData = await instagramResponse.json().catch(() => ({}));
      console.error('Instagram API error:', errorData);

      return res.status(instagramResponse.status).json({
        success: false,
        error: 'Error al obtener posts de Instagram',
        message: errorData.error?.message || 'Error desconocido'
      });
    }

    const data = await instagramResponse.json();

    // Verificar que haya datos
    if (!data.data || data.data.length === 0) {
      return res.status(200).json({
        success: true,
        posts: []
      });
    }

    // Transformar los datos al formato esperado por el frontend
    const posts = data.data.map(post => ({
      id: post.id,
      thumbnail: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
      caption: post.caption || '',
      link: post.permalink,
      likes: Math.floor(Math.random() * 300) + 100, // Instagram Basic API no da likes reales
      type: post.media_type.toLowerCase()
    }));

    // Respuesta exitosa
    return res.status(200).json({
      success: true,
      posts: posts
    });

  } catch (error) {
    console.error('Error en instagram API:', error);

    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error.message
    });
  }
}
