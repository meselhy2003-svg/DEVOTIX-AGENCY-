// Inquiries & Leads Inbox Data Store
const STORAGE_KEY = 'devotix_leads_inbox';

export function getStoredLeads() {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Failed to parse leads from localStorage:', e);
  }
  return [];
}

export function saveLeads(leads, syncCloud = true) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    window.dispatchEvent(new CustomEvent('devotix_leads_updated', { detail: leads }));
    if (syncCloud) {
      import('../services/cmsSync').then(({ pushKeyToCloud, CMS_KEYS }) => {
        pushKeyToCloud(CMS_KEYS.LEADS, leads);
      }).catch(() => {});
    }
  } catch (e) {
    console.error('Failed to save leads to localStorage:', e);
  }
}

export function saveStoredLead(lead) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredLeads();
    const newLead = {
      id: 'lead-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'new', // 'new' | 'contacted' | 'archived'
      ...lead,
    };
    const updated = [newLead, ...existing];
    saveLeads(updated, true);
    return newLead;
  } catch (e) {
    console.error('Failed to save lead to localStorage:', e);
  }
}

export function updateLeadStatus(id, newStatus) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredLeads();
    const updated = existing.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead);
    saveLeads(updated, true);
  } catch (e) {
    console.error('Failed to update lead status:', e);
  }
}

export function deleteStoredLead(id) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredLeads();
    const updated = existing.filter(lead => lead.id !== id);
    saveLeads(updated, true);
  } catch (e) {
    console.error('Failed to delete lead from localStorage:', e);
  }
}

export function clearAllLeads() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('devotix_leads_updated', { detail: [] }));
  } catch (e) {
    console.error('Failed to clear leads from localStorage:', e);
  }
}
