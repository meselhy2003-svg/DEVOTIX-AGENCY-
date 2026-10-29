require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function checkVideos() {
  const result = await cloudinary.api.resources({
    resource_type: 'video',
    max_results: 30
  });
  console.log('Videos in Cloudinary:', result.resources.length);
  result.resources.forEach(v => {
    console.log(v.public_id, v.secure_url, v.bytes);
  });
}

checkVideos().catch(console.error);
