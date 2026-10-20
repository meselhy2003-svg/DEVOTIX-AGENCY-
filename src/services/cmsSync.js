// Centralized Cloud CMS Synchronization Engine
// Seamlessly syncs between Supabase Cloud DB, LocalStorage, and Component Events

import {
  isSupabaseConfigured,
  fetchAllCmsDataFromSupabase,
  saveCmsKeyToSupabase,
  bulkSyncToSupabase,
} from './supabaseClient';

import { getPhotographyGalleries, savePhotographyGalleries } from '../data/photographyData';
import { getGraphicsData, saveGraphicsData } from '../data/graphicsData';
import { getSocialLinks, saveSocialLinks } from '../data/socialLinks';
import { getContentViewsData, saveContentViewsData } from '../data/contentViewsData';
import { getProductionGalleries, saveProductionGalleries } from '../data/productionData';
import { getCampaignsData, saveCampaignsData } from '../data/campaignsData';
import { getStoredLeads, saveLeads } from '../data/leadsInbox';

export const CMS_KEYS = {
  PHOTOGRAPHY: 'photography_galleries',
  GRAPHICS: 'graphics',
  SOCIAL: 'social_links',
  CONTENT_VIEWS: 'content_views',
  PRODUCTION: 'production',
  CAMPAIGNS: 'campaigns',
  LEADS: 'leads',
};

let _hasInitialized = false;

/**
 * Initializes Cloud Sync on app startup:
 * Fetches all keys from Supabase and hydrates local storage + UI events.
 */
export async function initCmsSync(force = false) {
  if (_hasInitialized && !force) return;

  if (!isSupabaseConfigured()) {
    return { synced: false, reason: 'not_configured' };
  }

  _hasInitialized = true;

  try {
    const cloudData = await fetchAllCmsDataFromSupabase();
    if (!cloudData || Object.keys(cloudData).length === 0) {
      return { synced: false, reason: 'empty_cloud' };
    }

    // Hydrate each section if present in cloud
    if (cloudData[CMS_KEYS.PHOTOGRAPHY] && Array.isArray(cloudData[CMS_KEYS.PHOTOGRAPHY])) {
      savePhotographyGalleries(cloudData[CMS_KEYS.PHOTOGRAPHY], false);
    }
    if (cloudData[CMS_KEYS.GRAPHICS] && Array.isArray(cloudData[CMS_KEYS.GRAPHICS])) {
      saveGraphicsData(cloudData[CMS_KEYS.GRAPHICS], false);
    }
    if (cloudData[CMS_KEYS.SOCIAL] && typeof cloudData[CMS_KEYS.SOCIAL] === 'object') {
      saveSocialLinks(cloudData[CMS_KEYS.SOCIAL], false);
    }
    if (cloudData[CMS_KEYS.CONTENT_VIEWS] && Array.isArray(cloudData[CMS_KEYS.CONTENT_VIEWS])) {
      saveContentViewsData(cloudData[CMS_KEYS.CONTENT_VIEWS], false);
    }
    if (cloudData[CMS_KEYS.PRODUCTION] && Array.isArray(cloudData[CMS_KEYS.PRODUCTION])) {
      saveProductionGalleries(cloudData[CMS_KEYS.PRODUCTION], false);
    }
    if (cloudData[CMS_KEYS.CAMPAIGNS] && Array.isArray(cloudData[CMS_KEYS.CAMPAIGNS])) {
      saveCampaignsData(cloudData[CMS_KEYS.CAMPAIGNS], false);
    }
    if (cloudData[CMS_KEYS.LEADS] && Array.isArray(cloudData[CMS_KEYS.LEADS])) {
      saveLeads(cloudData[CMS_KEYS.LEADS], false);
    }

    return { synced: true, count: Object.keys(cloudData).length };
  } catch (err) {
    console.warn('[CMS Sync] Error initializing from cloud:', err);
    return { synced: false, error: err.message };
  }
}

/**
 * Uploads all current local datasets into Supabase in one batch.
 */
export async function syncAllLocalDataToCloud() {
  const allDatasets = {
    [CMS_KEYS.PHOTOGRAPHY]: getPhotographyGalleries(),
    [CMS_KEYS.GRAPHICS]: getGraphicsData(),
    [CMS_KEYS.SOCIAL]: getSocialLinks(),
    [CMS_KEYS.CONTENT_VIEWS]: getContentViewsData(),
    [CMS_KEYS.PRODUCTION]: getProductionGalleries(),
    [CMS_KEYS.CAMPAIGNS]: getCampaignsData(),
    [CMS_KEYS.LEADS]: getStoredLeads(),
  };

  await bulkSyncToSupabase(allDatasets);
  return true;
}

/**
 * Helper to dispatch save to both localStorage and Supabase
 */
export function pushKeyToCloud(key, value) {
  if (!isSupabaseConfigured()) return;
  saveCmsKeyToSupabase(key, value).catch((err) => {
    console.error(`[CMS Sync] Failed to push ${key} to Supabase:`, err);
  });
}
