import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env.local
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Instagram API endpoint
app.get('/api/instagram', async (req, res) => {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    if (!accessToken || !userId) {
      return res.status(500).json({
        error: 'Missing Instagram credentials',
        message: 'Please configure INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID in .env.local file'
      });
    }

    // Obtener posts del usuario usando Instagram Graph API
    const response = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,like_count,timestamp&limit=4&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data = await response.json();

    // Transformar los datos al formato esperado por el frontend
    const posts = data.data.map(post => ({
      id: post.id,
      thumbnail: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
      caption: post.caption || '',
      link: post.permalink,
      likes: post.like_count || 0,
      type: post.media_type
    }));

    res.json({ posts });
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    res.status(500).json({
      error: 'Failed to fetch Instagram posts',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
