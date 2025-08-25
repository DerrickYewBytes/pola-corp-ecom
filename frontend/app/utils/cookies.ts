// Cookie utility functions for session management

export interface CookieOptions {
  expires?: Date;
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
}

export class CookieManager {
  private static readonly SESSION_COOKIE_NAME = 'pola_session_id';

  /**
   * Set a cookie
   */
  static setCookie(
    name: string,
    value: string,
    options: CookieOptions = {}
  ): void {
    if (typeof document === 'undefined') return; // SSR check

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.expires) {
      cookieString += `; expires=${options.expires.toUTCString()}`;
    }

    if (options.maxAge) {
      cookieString += `; max-age=${options.maxAge}`;
    }

    if (options.path) {
      cookieString += `; path=${options.path}`;
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    if (options.secure) {
      cookieString += '; secure';
    }

    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`;
    }

    document.cookie = cookieString;
  }

  /**
   * Get a cookie value
   */
  static getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null; // SSR check

    const nameEQ = `${encodeURIComponent(name)}=`;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      if (!cookie) continue;
      
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
      }
    }
    return null;
  }

  /**
   * Delete a cookie
   */
  static deleteCookie(name: string, path = '/'): void {
    if (typeof document === 'undefined') return; // SSR check

    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
  }

  /**
   * Get or create session ID
   */
  static getSessionId(): string {
    let sessionId = this.getCookie(this.SESSION_COOKIE_NAME);
    
    if (!sessionId) {
      // Generate a new session ID
      sessionId = this.generateSessionId();
      this.setSessionCookie(sessionId);
    }
    
    return sessionId;
  }

  /**
   * Set session cookie
   */
  static setSessionCookie(sessionId: string): void {
    this.setCookie(this.SESSION_COOKIE_NAME, sessionId, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  /**
   * Clear session cookie
   */
  static clearSessionCookie(): void {
    this.deleteCookie(this.SESSION_COOKIE_NAME, '/');
  }

  /**
   * Generate a random session ID
   */
  private static generateSessionId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Check if session ID is valid
   */
  static isSessionValid(sessionId: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(sessionId);
  }
}
