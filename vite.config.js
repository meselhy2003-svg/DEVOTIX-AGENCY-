import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { v2 as cloudinary } from 'cloudinary'

function cloudinaryDevApiPlugin() {
  return {
    name: 'cloudinary-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/cloudinary-products', async (req, res) => {
        try {
          const env = loadEnv('', process.cwd(), '');
          cloudinary.config({
            cloud_name: env.CLOUDINARY_CLOUD_NAME || env.VITE_CLOUDINARY_CLOUD_NAME,
            api_key: env.CLOUDINARY_API_KEY || env.VITE_CLOUDINARY_API_KEY,
            api_secret: env.CLOUDINARY_API_SECRET || env.VITE_CLOUDINARY_API_SECRET,
          });

          const result = await cloudinary.search
            .expression('asset_folder:"products"')
            .with_field('context')
            .sort_by('created_at', 'desc')
            .max_results(100)
            .execute();

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result.resources));
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudinaryDevApiPlugin()],
  server: {
    host: true,
    port: 3000,
    open: false
  }
})

