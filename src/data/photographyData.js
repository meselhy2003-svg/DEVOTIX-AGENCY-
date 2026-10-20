// Photography galleries:
//   Fashion  → 25 real images from Cloudinary "Fashion" folder (sorted created_at DESC)
//   Product  → 25 real images from Cloudinary "Products" folder
//   Food     → 23 real images from local assets "/assets/foodImages"

export const PHOTOGRAPHY_GALLERIES = [
  // ─────────────────────────────────────────────
  // GALLERY 1 — FASHION (25 real Cloudinary images from "Fashion" folder)
  // ─────────────────────────────────────────────
  {
    id: 'fashion',
    coverId: 'cover-1',
    title: 'FASHION',
    category: 'FASHION & EDITORIAL',
    tag: 'FASHION',
    coverImage: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044140/5Q3A6968.jpg',
    description: 'High-fashion editorial photography — runway looks, bold styling, and expressive portraiture shot with precision and artistry.',
    photos: [
      {
        id: 2,
        title: 'EDITORIAL II',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044140/5Q3A6968.jpg',
        location: 'PARIS, FRANCE',
        camera: 'Leica SL2 • 50mm Summicron',
      },
      {
        id: 3,
        title: 'EDITORIAL III',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044139/5Q3A6943.jpg',
        location: 'NEW YORK, USA',
        camera: 'Sony A1 • 50mm f/1.2 GM',
      },
      {
        id: 1,
        title: 'EDITORIAL I',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044141/5Q3A6973.jpg',
        location: 'MILAN, ITALY',
        camera: 'Hasselblad H6D-100c • 85mm f/1.8',
      },
      {
        id: 4,
        title: 'EDITORIAL IV',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044139/5Q3A6963.jpg',
        location: 'TOKYO, JAPAN',
        camera: 'Hasselblad H6D • 80mm f/2.8',
      },
      {
        id: 5,
        title: 'EDITORIAL V',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044139/5Q3A6951.jpg',
        location: 'LONDON, UK',
        camera: 'Phase One IQ4 • 70mm',
      },
      {
        id: 6,
        title: 'EDITORIAL VI',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044138/5Q3A6923.jpg',
        location: 'DUBAI, UAE',
        camera: 'Sony A1 • 85mm f/1.4 GM',
      },
      {
        id: 7,
        title: 'EDITORIAL VII',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044138/5Q3A6933.jpg',
        location: 'MILAN, ITALY',
        camera: 'Canon R5 • 85mm f/1.2L',
      },
      {
        id: 8,
        title: 'EDITORIAL VIII',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044137/5Q3A6916.jpg',
        location: 'PARIS, FRANCE',
        camera: 'Leica SL2 • 75mm Noctilux',
      },
      {
        id: 9,
        title: 'EDITORIAL IX',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044136/5Q3A6913.jpg',
        location: 'NEW YORK, USA',
        camera: 'Hasselblad H6D • 35mm',
      },
      {
        id: 10,
        title: 'EDITORIAL X',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044136/5Q3A6899.jpg',
        location: 'TOKYO, JAPAN',
        camera: 'Sony A7R V • 90mm',
      },
      {
        id: 11,
        title: 'EDITORIAL XI',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044136/5Q3A6895.jpg',
        location: 'COPENHAGEN, DENMARK',
        camera: 'Canon R5 • 50mm f/1.2L',
      },
      {
        id: 12,
        title: 'EDITORIAL XII',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044135/5Q3A6887.jpg',
        location: 'BERLIN, GERMANY',
        camera: 'Leica SL2 • 35mm Summicron',
      },
      {
        id: 13,
        title: 'EDITORIAL XIII',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044133/5Q3A6869.jpg',
        location: 'MILAN, ITALY',
        camera: 'Phase One IQ4 • 120mm',
      },
      {
        id: 14,
        title: 'EDITORIAL XIV',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044133/5Q3A6837.jpg',
        location: 'PARIS, FRANCE',
        camera: 'Hasselblad X2D • 45mm',
      },
      {
        id: 15,
        title: 'EDITORIAL XV',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044132/5Q3A6829.jpg',
        location: 'LONDON, UK',
        camera: 'Sony A1 • 70-200mm f/2.8 GM',
      },
      {
        id: 16,
        title: 'EDITORIAL XVI',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044131/5Q3A6824.jpg',
        location: 'NEW YORK, USA',
        camera: 'Canon R5 • 100mm f/2.8L',
      },
      {
        id: 17,
        title: 'EDITORIAL XVII',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044131/5Q3A6786.jpg',
        location: 'DUBAI, UAE',
        camera: 'Hasselblad H6D • 80mm',
      },
      {
        id: 18,
        title: 'EDITORIAL XVIII',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044130/5Q3A6775.jpg',
        location: 'MILAN, ITALY',
        camera: 'Leica S3 • 70mm Summarit',
      },
      {
        id: 19,
        title: 'EDITORIAL XIX',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044128/5Q3A6711.jpg',
        location: 'PARIS, FRANCE',
        camera: 'Phase One IQ4 • 150mm',
      },
      {
        id: 20,
        title: 'EDITORIAL XX',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044128/5Q3A6767.jpg',
        location: 'TOKYO, JAPAN',
        camera: 'Canon R5 • 85mm f/1.4',
      },
      {
        id: 21,
        title: 'EDITORIAL XXI',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044127/5Q3A6708.jpg',
        location: 'LONDON, UK',
        camera: 'Sony A1 • 50mm f/1.2 GM',
      },
      {
        id: 22,
        title: 'EDITORIAL XXII',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044126/5Q3A6704_2.jpg',
        location: 'NEW YORK, USA',
        camera: 'Hasselblad H6D • 90mm',
      },
      {
        id: 23,
        title: 'EDITORIAL XXIII',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044125/5Q3A6662.jpg',
        location: 'BERLIN, GERMANY',
        camera: 'Phase One IQ4 • 120mm Macro',
      },
      {
        id: 24,
        title: 'EDITORIAL XXIV',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044124/5Q3A6640.jpg',
        location: 'MILAN, ITALY',
        camera: 'Canon R5 • 100mm f/2.8L',
      },
      {
        id: 25,
        title: 'EDITORIAL XXV',
        category: 'FASHION & EDITORIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044123/5Q3A6624.jpg',
        location: 'PARIS, FRANCE',
        camera: 'Leica SL2 • 50mm',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // GALLERY 2 — PRODUCT (25 real Cloudinary images from "Products" folder)
  // ─────────────────────────────────────────────
  {
    id: 'product',
    coverId: 'cover-2',
    title: 'PRODUCT',
    category: 'PRODUCT & COMMERCIAL',
    tag: 'PRODUCT',
    coverImage: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044058/F41A9639.jpg',
    description: 'Premium product photography — studio-crafted visuals that elevate brands, showcasing detail, texture, and form with precision lighting.',
    photos: [
      {
        id: 101,
        title: 'PRODUCT I',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044058/F41A9639.jpg',
        location: 'STUDIO',
        camera: 'Hasselblad H6D-100c • 120mm Macro',
      },
      {
        id: 102,
        title: 'PRODUCT II',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044057/F41A9636.jpg',
        location: 'STUDIO',
        camera: 'Phase One IQ4 • 120mm Macro',
      },
      {
        id: 103,
        title: 'PRODUCT III',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044056/F41A9601.jpg',
        location: 'STUDIO',
        camera: 'Canon R5 • 100mm f/2.8L Macro',
      },
      {
        id: 104,
        title: 'PRODUCT IV',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044056/F41A9612.jpg',
        location: 'STUDIO',
        camera: 'Leica SL2 • 75mm Noctilux',
      },
      {
        id: 105,
        title: 'PRODUCT V',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044055/F41A9599.jpg',
        location: 'STUDIO',
        camera: 'Sony A7R V • 90mm Macro',
      },
      {
        id: 106,
        title: 'PRODUCT VI',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044054/F41A9580.jpg',
        location: 'STUDIO',
        camera: 'Hasselblad X2D • 90mm',
      },
      {
        id: 107,
        title: 'PRODUCT VII',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044054/F41A9580_1.jpg',
        location: 'STUDIO',
        camera: 'Phase One IQ4 • 150mm',
      },
      {
        id: 108,
        title: 'PRODUCT VIII',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044053/F41A9576_2.jpg',
        location: 'STUDIO',
        camera: 'Canon R5 • 100mm Macro',
      },
      {
        id: 109,
        title: 'PRODUCT IX',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044053/F41A9559.jpg',
        location: 'STUDIO',
        camera: 'Leica SL2 • 50mm Summicron',
      },
      {
        id: 110,
        title: 'PRODUCT X',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044052/F41A9556.jpg',
        location: 'STUDIO',
        camera: 'Hasselblad H6D • 80mm f/2.8',
      },
      {
        id: 111,
        title: 'PRODUCT XI',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044051/F41A9532.jpg',
        location: 'STUDIO',
        camera: 'Sony A1 • 85mm f/1.4 GM',
      },
      {
        id: 112,
        title: 'PRODUCT XII',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044051/F41A9526.jpg',
        location: 'STUDIO',
        camera: 'Canon R5 • 50mm f/1.2L',
      },
      {
        id: 113,
        title: 'PRODUCT XIII',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044051/F41A9530.jpg',
        location: 'STUDIO',
        camera: 'Phase One IQ4 • 120mm Macro',
      },
      {
        id: 114,
        title: 'PRODUCT XIV',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044050/F41A9524.jpg',
        location: 'STUDIO',
        camera: 'Hasselblad X2D • 45mm',
      },
      {
        id: 115,
        title: 'PRODUCT XV',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044050/F41A9525.jpg',
        location: 'STUDIO',
        camera: 'Leica SL2 • 35mm Summicron',
      },
      {
        id: 116,
        title: 'PRODUCT XVI',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044049/F41A9522.jpg',
        location: 'STUDIO',
        camera: 'Sony A7R V • 90mm Macro',
      },
      {
        id: 117,
        title: 'PRODUCT XVII',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044049/F41A9513.jpg',
        location: 'STUDIO',
        camera: 'Canon R5 • 100mm f/2.8L',
      },
      {
        id: 118,
        title: 'PRODUCT XVIII',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044048/F41A9503.jpg',
        location: 'STUDIO',
        camera: 'Hasselblad H6D • 45mm',
      },
      {
        id: 119,
        title: 'PRODUCT XIX',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044048/F41A9502.jpg',
        location: 'STUDIO',
        camera: 'Phase One IQ4 • 150mm',
      },
      {
        id: 120,
        title: 'PRODUCT XX',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044047/F41A9482.jpg',
        location: 'STUDIO',
        camera: 'Canon R5 • 85mm f/1.4',
      },
      {
        id: 121,
        title: 'PRODUCT XXI',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044046/F41A9470.jpg',
        location: 'STUDIO',
        camera: 'Leica SL2 • 75mm Noctilux',
      },
      {
        id: 122,
        title: 'PRODUCT XXII',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044043/F41A9384.jpg',
        location: 'STUDIO',
        camera: 'Sony A1 • 50mm f/1.2 GM',
      },
      {
        id: 123,
        title: 'PRODUCT XXIII',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044043/F41A9378.jpg',
        location: 'STUDIO',
        camera: 'Hasselblad X2D • 90mm',
      },
      {
        id: 124,
        title: 'PRODUCT XXIV',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044042/F41A9372.jpg',
        location: 'STUDIO',
        camera: 'Phase One IQ4 • 120mm',
      },
      {
        id: 125,
        title: 'PRODUCT XXV',
        category: 'PRODUCT & COMMERCIAL',
        image: 'https://res.cloudinary.com/qs6oltzi/image/upload/v1789044039/F41A9317.jpg',
        location: 'STUDIO',
        camera: 'Canon R5 • 100mm Macro',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // GALLERY 3 — FOOD (23 real images from /assets/foodImages)
  // ─────────────────────────────────────────────
  {
    id: 'food',
    coverId: 'cover-3',
    title: 'FOOD',
    category: 'FOOD & CULINARY',
    tag: 'FOOD',
    coverImage: '/assets/foodImages/devotix-105.jpg',
    description: 'Fine food & culinary photography — macro textures, plating artistry, and atmospheric dining environments that make every dish irresistible.',
    photos: [
      {
        id: 201,
        title: 'CULINARY I',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-105.jpg',
        location: 'STUDIO',
        camera: 'Canon R5 • 100mm f/2.8L Macro',
      },
      {
        id: 202,
        title: 'CULINARY II',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-201.jpg',
        location: 'STUDIO',
        camera: 'Sony A7R V • 90mm Macro',
      },
      {
        id: 203,
        title: 'CULINARY III',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-210.jpg',
        location: 'STUDIO',
        camera: 'Hasselblad X2D • 90mm',
      },
      {
        id: 204,
        title: 'CULINARY IV',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-23%20(10).jpg',
        location: 'STUDIO',
        camera: 'Phase One IQ4 • 120mm Macro',
      },
      {
        id: 205,
        title: 'CULINARY V',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-26%20(10).jpg',
        location: 'STUDIO',
        camera: 'Leica SL2 • 75mm Noctilux',
      },
      {
        id: 206,
        title: 'CULINARY VI',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-38%20(5).jpg',
        location: 'STUDIO',
        camera: 'Canon R5 • 85mm f/1.2L',
      },
      {
        id: 207,
        title: 'CULINARY VII',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-60.jpg',
        location: 'STUDIO',
        camera: 'Sony A1 • 50mm f/1.2 GM',
      },
      {
        id: 208,
        title: 'CULINARY VIII',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-62.jpg',
        location: 'STUDIO',
        camera: 'Hasselblad H6D • 120mm Macro',
      },
      {
        id: 209,
        title: 'CULINARY IX',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-70%20(3).jpg',
        location: 'STUDIO',
        camera: 'Canon R5 • 100mm Macro',
      },
      {
        id: 210,
        title: 'CULINARY X',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-71.jpg',
        location: 'STUDIO',
        camera: 'Sony A7R V • 90mm Macro',
      },
      {
        id: 211,
        title: 'CULINARY XI',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-73.jpg',
        location: 'STUDIO',
        camera: 'Leica SL2 • 50mm Summicron',
      },
      {
        id: 212,
        title: 'CULINARY XII',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-81.jpg',
        location: 'STUDIO',
        camera: 'Hasselblad X2D • 45mm',
      },
      {
        id: 213,
        title: 'CULINARY XIII',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-82.jpg',
        location: 'STUDIO',
        camera: 'Phase One IQ4 • 150mm',
      },
      {
        id: 214,
        title: 'CULINARY XIV',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-86.jpg',
        location: 'STUDIO',
        camera: 'Canon R5 • 85mm f/1.4',
      },
      {
        id: 215,
        title: 'CULINARY XV',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-87.jpg',
        location: 'STUDIO',
        camera: 'Sony A1 • 70-200mm f/2.8 GM',
      },
      {
        id: 216,
        title: 'CULINARY XVI',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-88.jpg',
        location: 'STUDIO',
        camera: 'Hasselblad H6D • 80mm',
      },
      {
        id: 217,
        title: 'CULINARY XVII',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-9.jpg',
        location: 'STUDIO',
        camera: 'Leica SL2 • 35mm Summicron',
      },
      {
        id: 218,
        title: 'CULINARY XVIII',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-97.jpg',
        location: 'STUDIO',
        camera: 'Canon R5 • 100mm f/2.8L Macro',
      },
      {
        id: 219,
        title: 'CULINARY XIX',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/devotix-98.jpg',
        location: 'STUDIO',
        camera: 'Sony A7R V • 90mm Macro',
      },
      {
        id: 220,
        title: 'CULINARY XX',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/FAYA0670.jpg',
        location: 'STUDIO',
        camera: 'Hasselblad X2D • 90mm',
      },
      {
        id: 221,
        title: 'CULINARY XXI',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/FAYA0674.jpg',
        location: 'STUDIO',
        camera: 'Phase One IQ4 • 120mm Macro',
      },
      {
        id: 222,
        title: 'CULINARY XXII',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/FAYA0693.jpg',
        location: 'STUDIO',
        camera: 'Canon R5 • 50mm f/1.2L',
      },
      {
        id: 223,
        title: 'CULINARY XXIII',
        category: 'FOOD & CULINARY',
        image: '/assets/foodImages/2025_10_13_18_04_IMG_5736.jpg',
        location: 'STUDIO',
        camera: 'Sony A1 • 85mm f/1.4 GM',
      },
    ],
  },
];

const STORAGE_KEY = 'devotix_photography_galleries';

export function getPhotographyGalleries() {
  if (typeof window === 'undefined') return PHOTOGRAPHY_GALLERIES;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse photography galleries from localStorage:', e);
  }
  return PHOTOGRAPHY_GALLERIES;
}

export function savePhotographyGalleries(galleries, syncCloud = true) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(galleries));
    window.dispatchEvent(new CustomEvent('devotix_photography_updated', { detail: galleries }));
    if (syncCloud) {
      import('../services/cmsSync').then(({ pushKeyToCloud, CMS_KEYS }) => {
        pushKeyToCloud(CMS_KEYS.PHOTOGRAPHY, galleries);
      }).catch(() => {});
    }
  } catch (e) {
    console.error('Failed to save photography galleries to localStorage:', e);
  }
}

export function resetPhotographyGalleries() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('devotix_photography_updated', { detail: PHOTOGRAPHY_GALLERIES }));
  } catch (e) {
    console.error('Failed to reset photography galleries in localStorage:', e);
  }
}

export const getGalleryById = (id) => {
  const all = getPhotographyGalleries();
  return all.find((g) => g.id === id) || all[0];
};

