require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadHeroVideo() {
  const filePath = path.resolve(__dirname, '../public/assets/hero/who_.mp4');
  console.log('Starting upload of:', filePath);
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: 'video',
    folder: 'hero',
    public_id: 'who_',
    overwrite: true,
  });
  console.log('Upload successful!');
  console.log('Secure URL:', result.secure_url);
}

uploadHeroVideo().catch(console.error);
