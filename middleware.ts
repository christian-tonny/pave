import { clerkMiddleware } from '@clerk/nextjs/server';

/**
 * Clerk's middleware is required by @clerk/nextjs v6 for the App Router. It is
 * deliberately permissive here: nothing is protected at the edge, because the
 * landing page and the interview are meant to be readable before you sign up.
 * Pages that need a signed-in user gate themselves.
 */
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next internals and static files unless they show up in search params.
    '/((?!_next|.*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes.
    '/(api|trpc)(.*)',
  ],
};
