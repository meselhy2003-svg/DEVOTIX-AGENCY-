// Centralized Cloud CMS Synchronization Engine
// Seamlessly syncs between Supabase Cloud DB, LocalStorage, and Component Events

import {
  isSupabaseConfigured,
  fetchAllCmsDataFromSupabase,
  saveCmsKeyToSupabase,
  bulkSyncToSupabase,
} from './supabaseClient.js';

import { getPhotographyGalleries, savePhotographyGalleries } from '../data/photographyData.js';
import { getGraphicsData, saveGraphicsData } from '../data/graphicsData.js';
import { getSocialLinks, saveSocialLinks } from '../data/socialLinks.js';
import { getContentViewsData, saveContentViewsData } from '../data/contentViewsData.js';
import { getProductionGalleries, saveProductionGalleries } from '../data/productionData.js';
import { getCampaignsData, saveCampaignsData } from '../data/campaignsData.js';
import { getStoredLeads, saveLeads } from '../data/leadsInbox.js';

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

    // Hydrate each section if present in cloud with non-empty valid content
    let hasValidContent = false;

    if (Array.isArray(cloudData[CMS_KEYS.PHOTOGRAPHY]) && cloudData[CMS_KEYS.PHOTOGRAPHY].length > 0) {
      savePhotographyGalleries(cloudData[CMS_KEYS.PHOTOGRAPHY], false);
      hasValidContent = true;
    }
    if (Array.isArray(cloudData[CMS_KEYS.GRAPHICS]) && cloudData[CMS_KEYS.GRAPHICS].length > 0) {
      saveGraphicsData(cloudData[CMS_KEYS.GRAPHICS], false);
      hasValidContent = true;
    }
    if (cloudData[CMS_KEYS.SOCIAL] && typeof cloudData[CMS_KEYS.SOCIAL] === 'object' && Object.keys(cloudData[CMS_KEYS.SOCIAL]).length > 0) {
      saveSocialLinks(cloudData[CMS_KEYS.SOCIAL], false);
      hasValidContent = true;
    }
    if (Array.isArray(cloudData[CMS_KEYS.CONTENT_VIEWS]) && cloudData[CMS_KEYS.CONTENT_VIEWS].length > 0) {
      saveContentViewsData(cloudData[CMS_KEYS.CONTENT_VIEWS], false);
      hasValidContent = true;
    }
    if (Array.isArray(cloudData[CMS_KEYS.PRODUCTION]) && cloudData[CMS_KEYS.PRODUCTION].length > 0) {
      saveProductionGalleries(cloudData[CMS_KEYS.PRODUCTION], false);
      hasValidContent = true;
    }
    if (Array.isArray(cloudData[CMS_KEYS.CAMPAIGNS]) && cloudData[CMS_KEYS.CAMPAIGNS].length > 0) {
      saveCampaignsData(cloudData[CMS_KEYS.CAMPAIGNS], false);
      hasValidContent = true;
    }
    if (Array.isArray(cloudData[CMS_KEYS.LEADS]) && cloudData[CMS_KEYS.LEADS].length > 0) {
      saveLeads(cloudData[CMS_KEYS.LEADS], false);
      hasValidContent = true;
    }

    // If cloud has no content or only empty placeholder rows, seed with local defaults
    if (!hasValidContent) {
      syncAllLocalDataToCloud().catch(() => {});
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
