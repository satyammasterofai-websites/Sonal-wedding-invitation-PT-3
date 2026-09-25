/**
 * cardInstance.ts
 * Manages unique database identification, remix isolation, and URL synchronization.
 * Guarantees that remixed websites in AI Studio never overlap or overwrite data from other websites.
 */

export const MASTER_CARD_ID = 'remix-v1';
export const ORIGINAL_APPLET_SUBDOMAIN = 'zu6oj4k573mqstevuaebw5';

/**
 * Detects the AI Studio applet subdomain from window.location.hostname
 * e.g. "ais-dev-zu6oj4k573mqstevuaebw5-18224007398.asia-east1.run.app" -> "zu6oj4k573mqstevuaebw5"
 */
export function detectAppletSubdomain(): string | null {
  if (typeof window === 'undefined' || !window.location) return null;
  const hostname = window.location.hostname || '';
  const match = hostname.match(/^ais-(?:dev|pre)-([a-zA-Z0-9]+)/i);
  return match ? match[1].toLowerCase() : null;
}

/**
 * Determines the appropriate card/database ID for the current instance.
 * Follows strict priority to ensure remixes never overwrite each other:
 * 1. URL search param ?id=... (or ?remix=... or ?card=...)
 * 2. If running on AI Studio:
 *    - If subdomain matches the original applet (zu6oj4k573mqstevuaebw5), use MASTER_CARD_ID ('remix-v1')
 *    - If subdomain is different (this is an AI Studio Remix!), use `remix-${subdomain}`
 * 3. Custom ID previously saved in localStorage
 * 4. Fallback based on host
 */
export function determineInitialCardId(): string {
  if (typeof window === 'undefined') return MASTER_CARD_ID;

  // 1. Explicit URL parameter always wins
  try {
    const params = new URLSearchParams(window.location.search);
    const queryId = params.get('id') || params.get('remix') || params.get('card');
    if (queryId && queryId.trim() !== '') {
      return queryId.trim();
    }
  } catch (e) {
    console.warn('Error reading URL search params:', e);
  }

  // 2. AI Studio applet subdomain detection
  const subdomain = detectAppletSubdomain();
  if (subdomain) {
    if (subdomain === ORIGINAL_APPLET_SUBDOMAIN.toLowerCase()) {
      return MASTER_CARD_ID;
    }
    // This is an AI Studio REMIX! Give it a dedicated, isolated ID
    return `remix-${subdomain}`;
  }

  // 3. Local instance ID stored in browser
  try {
    const storedInstanceId = localStorage.getItem('wedding_custom_card_id');
    if (storedInstanceId && storedInstanceId.trim() !== '') {
      return storedInstanceId.trim();
    }
  } catch (e) {
    console.warn('Error reading wedding_custom_card_id from localStorage:', e);
  }

  // 4. Default for localhost or unknown domain
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (isLocal) {
    return MASTER_CARD_ID;
  }

  // Generate a random stable instance ID for this domain/browser session
  const randomInstanceId = `remix-${Math.random().toString(36).substring(2, 9)}`;
  try {
    localStorage.setItem('wedding_custom_card_id', randomInstanceId);
  } catch (e) {
    // Ignore storage quota
  }
  return randomInstanceId;
}

/**
 * Returns isolated localStorage key for a specific card ID
 */
export function getStorageKey(cardId: string): string {
  return `wedding-ecard-settings-${cardId}`;
}

/**
 * Saves settings to localStorage with card isolation
 */
export function saveToLocalStorage(cardId: string, settings: any): void {
  try {
    localStorage.setItem(getStorageKey(cardId), JSON.stringify(settings));
  } catch (e) {
    console.warn(`Local storage quota exceeded or blocked for ${cardId}:`, e);
  }
}

/**
 * Gets settings from localStorage with fallback to global key
 */
export function getFromLocalStorage(cardId: string): any | null {
  try {
    const scoped = localStorage.getItem(getStorageKey(cardId));
    if (scoped) return JSON.parse(scoped);

    // Fallback if it's the master card or migrated from old version
    const fallback = localStorage.getItem('wedding-ecard-settings');
    if (fallback) return JSON.parse(fallback);
  } catch (e) {
    console.warn(`Error reading localStorage for ${cardId}:`, e);
  }
  return null;
}

/**
 * Generates the full shareable URL with the card ID query param
 */
export function getShareableUrl(cardId: string): string {
  if (typeof window === 'undefined' || !window.location) return `?id=${cardId}`;
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('id', cardId);
    return url.toString();
  } catch (e) {
    return `${window.location.origin}${window.location.pathname}?id=${cardId}`;
  }
}

/**
 * Returns true if this card is the original master template
 */
export function isMasterTemplate(cardId: string): boolean {
  return cardId === MASTER_CARD_ID;
}
