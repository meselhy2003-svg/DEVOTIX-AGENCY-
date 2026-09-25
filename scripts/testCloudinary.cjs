require('dotenv').config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function getImages() {
  try {
    const result = await cloudinary.search
      .expression('asset_folder:"products"')
      .with_field("context")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    console.log("=== CLOUDINARY SEARCH RESULT COUNT ===");
    console.log("Total resources returned:", result.resources.length);
    console.log("Image titles / IDs:", result.resources.map(r => ({ public_id: r.public_id, secure_url: r.secure_url, width: r.width, height: r.height })));
    console.log("=== FULL RESOURCES LOGGED BELOW ===");
    console.log(result.resources);
    return result.resources;
  } catch (err) {
    console.error("Cloudinary search error:", err);
  }
}

getImages();
