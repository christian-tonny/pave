import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

/**
 * Landing, interview, and public career pages stay readable before sign-up.
 * Signed-in areas (dashboards, admin, onboarding, mentor apply, assessment
 * results) are protected at the edge.
 */
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/admin(.*)',
  '/onboarding(.*)',
  '/mentors/apply(.*)',
  '/assessment/results(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect({
      unauthenticatedUrl: new URL('/sign-in', req.url).toString(),
    });
  }
});

export const config = {
  matcher: [
    // Skip Next internals and static files unless they show up in search params.
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes.
    '/(api|trpc)(.*)',
  ],
};
