import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Dynamic product details → skip prerender
  { path: 'p-details/:p_id', renderMode: RenderMode.Server }, // or RenderMode.Client
  { path: 'checkout/:c_id', renderMode: RenderMode.Server }, // or RenderMode.Client

  // Fallback → prerender everything else
  { path: '**', renderMode: RenderMode.Prerender },
];
