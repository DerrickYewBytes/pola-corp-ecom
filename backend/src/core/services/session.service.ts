import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SessionService {
  private readonly SESSION_COOKIE_NAME = 'pola_session_id';
  private readonly SESSION_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: '/',
  };

  generateSessionId(): string {
    return uuidv4();
  }

  getSessionId(req: Request): string {
    // First try to get from cookie
    const cookieSessionId = req.cookies[this.SESSION_COOKIE_NAME];
    if (cookieSessionId) {
      return cookieSessionId;
    }

    // Fallback to header (for backward compatibility)
    const headerSessionId = req.headers['x-session-id'] as string;
    if (headerSessionId) {
      return headerSessionId;
    }

    // Generate new session ID if none exists
    return this.generateSessionId();
  }

  setSessionCookie(res: Response, sessionId: string): void {
    res.cookie(this.SESSION_COOKIE_NAME, sessionId, this.SESSION_COOKIE_OPTIONS);
  }

  clearSessionCookie(res: Response): void {
    res.clearCookie(this.SESSION_COOKIE_NAME, {
      path: '/',
    });
  }

  isSessionValid(sessionId: string): boolean {
    // Basic validation - ensure it's a valid UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(sessionId);
  }
}
