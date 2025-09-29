// Example: Dynamic import patterns for code splitting
// This file demonstrates how to use dynamic imports to split code

/**
 * Lazy load heavy client-side libraries
 */
export async function loadChartLibrary() {
  if (typeof window === 'undefined') {
    throw new Error('Chart library can only be loaded on the client');
  }

  // Dynamic import - this will create a separate chunk
  const { Chart } = await import('chart.js/auto');
  return Chart;
}

/**
 * Conditionally load client-only modules
 */
export async function loadClientModule<T>(
  moduleFactory: () => Promise<{ default: T }>
): Promise<T | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const module = await moduleFactory();
    return module.default;
  } catch (error) {
    console.error('Failed to load client module:', error);
    return null;
  }
}

/**
 * Route-based code splitting
 */
export const routeModules = {
  admin: () => import('../routes/admin/_layout.tsx'),
  shop: () => import('../routes/shop/_layout.tsx'),
  blog: () => import('../routes/blog/_layout.tsx'),
};

/**
 * Feature-based code splitting
 */
export const featureModules = {
  analytics: () => import('../features/analytics/index.ts'),
  payments: () => import('../features/payments/index.ts'),
  search: () => import('../features/search/index.ts'),
};

/**
 * Component lazy loading with error boundary
 */
export function createLazyComponent<T>(
  importFn: () => Promise<{ default: T }>,
  fallback: any = null
) {
  return lazy(async () => {
    try {
      return await importFn();
    } catch (error) {
      console.error('Failed to load component:', error);
      return { default: () => fallback };
    }
  });
}

// Usage examples:

// 1. Lazy load a heavy component
const HeavyChart = createLazyComponent(
  () => import('../components/HeavyChart.tsx'),
  <div>Chart failed to load</div>
);

// 2. Conditionally load based on user permissions
export async function loadAdminModule(userRole: string) {
  if (userRole !== 'admin') return null;

  return await loadClientModule(() => import('../admin/AdminPanel.tsx'));
}

// 3. Load modules based on feature flags
export async function loadFeature(featureName: string, enabled: boolean) {
  if (!enabled) return null;

  const moduleLoader = featureModules[featureName as keyof typeof featureModules];
  if (!moduleLoader) return null;

  return await loadClientModule(moduleLoader);
}

