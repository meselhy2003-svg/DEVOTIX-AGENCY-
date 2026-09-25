require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function getImages() {
  // Try multiple folder name variations (Cloudinary is case-sensitive)
  const folders = ['Fashion', 'fashion', 'FASHION'];
  for (const folder of folders) {
    const result = await cloudinary.search
      .expression(`asset_folder:"${folder}"`)
      .with_field('context')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    if (result.resources.length > 0) {
      console.log(`Found ${result.resources.length} images in folder: "${folder}"`);
      const urls = result.resources.map((r, i) => ({
        index: i + 1,
        public_id: r.public_id,
        url: r.secure_url,
        w: r.width,
        h: r.height,
      }));
      console.log(JSON.stringify(urls, null, 2));
      return;
    } else {
      console.log(`No images in folder: "${folder}"`);
    }
  }

  // If nothing found, list all folders available
  console.log('\nNo images found — listing all available folders:');
  const all = await cloudinary.search
    .expression('resource_type:image')
    .aggregate('asset_folder')
    .max_results(1)
    .execute();
  console.log(JSON.stringify(all, null, 2));
}

getImages().catch(console.error);
