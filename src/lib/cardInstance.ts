/**
 * cardInstance.ts
 * Manages unique database identification, remix isolation, and URL synchronization.
 * Guarantees that remixed websites in AI Studio never overlap or overwrite data from other websites.
 */

/**
 * cardInstance.ts
 * Manages unique database identification, remix isolation, and hosting synchronization.
 * Guarantees that deployments (Vercel, custom domains, AI Studio) always load
 * the active, canonical wedding invitation.
 */

export const CANONICAL_CARD_ID = 'remix-n6o7jcyhxftehzum27yso7';
export const MASTER_CARD_ID = 'remix-n6o7jcyhxftehzum27yso7';
export const FALLBACK_CARD_ID = 'remix-v1';
export const CURRENT_APPLET_SUBDOMAIN = 'n6o7jcyhxftehzum27yso7';

/**
 * Detects the AI Studio applet subdomain from window.location.hostname
 * e.g. "ais-dev-n6o7jcyhxftehzum27yso7-18224007398.asia-east1.run.app" -> "n6o7jcyhxftehzum27yso7"
 */
export function detectAppletSubdomain(): string | null {
  if (typeof window === 'undefined' || !window.location) return null;
  const hostname = window.location.hostname || '';
  const match = hostname.match(/^ais-(?:dev|pre)-([a-zA-Z0-9]+)/i);
  return match ? match[1].toLowerCase() : null;
}

/**
 * Determines the appropriate card/database ID for the current instance.
 * Priority:
 * 1. URL search param ?id=... (or ?remix=... or ?card=...)
 * 2. Vite environment variable: VITE_CARD_ID (for Vercel or custom deployments)
 * 3. AI Studio preview subdomain:
 *    - If running on this applet's subdomain, use CANONICAL_CARD_ID
 *    - If running on another AI Studio remix, use `remix-${subdomain}`
 * 4. Production hosting (Vercel, Netlify, custom domain, localhost):
 *    - Always loads CANONICAL_CARD_ID so all visitors and guests see the configured invitation!
 */
export function determineInitialCardId(): string {
  if (typeof window === 'undefined') return CANONICAL_CARD_ID;

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

  // 2. Explicit environment variable (if configured in Vercel project settings)
  try {
    const envCardId = (import.meta as any).env?.VITE_CARD_ID;
    if (envCardId && typeof envCardId === 'string' && envCardId.trim() !== '') {
      return envCardId.trim();
    }
  } catch (e) {
    // Ignore env read error
  }

  // 3. AI Studio applet subdomain detection
  const subdomain = detectAppletSubdomain();
  if (subdomain) {
    return `remix-${subdomain}`;
  }

  // 4. Default for Vercel, Netlify, custom domains, or localhost
  // Return CANONICAL_CARD_ID so all wedding guests see the active wedding card!
  return CANONICAL_CARD_ID;
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
