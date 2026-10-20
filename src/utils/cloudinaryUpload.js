/**
 * Cloudinary Upload Utility for Devotix CMS
 * Supports signed uploads using browser native Web Crypto API (SHA-1)
 * Uploads images and videos directly to Cloudinary cloud 'qs6oltzi'.
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'qs6oltzi';
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY || '482116618224265';
const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET || '4mCtrwp5mD99NJNYsvGT0VTr5ww';

/**
 * Generate SHA-1 hex digest using browser Web Crypto API
 */
async function generateSha1(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Upload a File object or Blob to Cloudinary
 * @param {File|Blob} file - The file to upload
 * @param {Object} options - Options { folder: 'devotix', resourceType: 'image'|'video'|'auto' }
 * @param {Function} onProgress - Optional progress callback (percent: number)
 * @returns {Promise<Object>} Cloudinary upload response object
 */
export async function uploadToCloudinary(file, options = {}, onProgress = null) {
  const folder = options.folder || 'devotix_uploads';
  const resourceType = options.resourceType || (file.type && file.type.startsWith('video/') ? 'video' : 'image');
  const timestamp = Math.floor(Date.now() / 1000);

  // Cloudinary signature string parameters sorted alphabetically
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}${API_SECRET}`;
  const signature = await generateSha1(paramsToSign);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', API_KEY);
  formData.append('timestamp', timestamp.toString());
  formData.append('folder', folder);
  formData.append('signature', signature);

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint);

    if (onProgress && xhr.upload) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          resolve({
            success: true,
            secure_url: res.secure_url,
            public_id: res.public_id,
            width: res.width,
            height: res.height,
            format: res.format,
            duration: res.duration || null,
            bytes: res.bytes,
            original: res,
          });
        } catch (e) {
          reject(new Error('Invalid response from Cloudinary'));
        }
      } else {
        try {
          const errRes = JSON.parse(xhr.responseText);
          reject(new Error(errRes.error?.message || `Upload failed with status ${xhr.status}`));
        } catch (e) {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during upload to Cloudinary'));
    };

    xhr.send(formData);
  });
}
