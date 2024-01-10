import { Route } from "apps/website/flags/audience.ts";
import { AppContext } from "$store/apps/site.ts";

const PATHS_TO_PROXY = [
  "/checkouts/*",
  "/cart/*",
  "/account",
  "/account/*",
  "/password",
  "/password/*",
  "/challenge",
  "/challenge/*",
];
const decoSiteMapUrl = "/sitemap/deco.xml";

const PATHS_WITH_DIGEST = new Set([
  "/account",
  "/account/*",
  "/password",
  "/password/*",
  "/challenge",
  "/challenge/*",
]);

export const withDigestCookie = (digestCookie: string | undefined) => digestCookie
? [{
  key: "cookie",
  value: `storefront_digest=${digestCookie}`,
}]
: undefined;


const buildProxyRoutes = (
  {
    ctx,
    extraPaths,
    includeSiteMap,
    generateDecoSiteMap,
  }: {
    extraPaths: string[];
    includeSiteMap?: string[];
    generateDecoSiteMap?: boolean;
    ctx: AppContext;
  },
) => {
  const storeName = ctx.shopify_custom?.storeName;
  const digestCookie = ctx.shopify_custom?.storefrontDigestCookie;
  const publicUrl = new URL(`https://${storeName}.myshopify.com`);

  try {
    const hostname = publicUrl.hostname;

    // Rejects TLD mystore.com, keep this if Shopify doesn't support
    if (!hostname || hostname.split(".").length <= 2) {
      throw new Error(`Invalid hostname from '${publicUrl}'`);
    }

    // TODO @lucis: Fix the proxy, MITM

    const urlToProxy = `https://${hostname}`;
    const hostToUse = hostname;

    const routeFromPath = (pathTemplate: string): Route => ({
      pathTemplate,
      handler: {
        value: {
          __resolveType: "website/handlers/proxy.ts",
          url: urlToProxy,
          host: hostToUse,
          customHeaders: PATHS_WITH_DIGEST.has(pathTemplate)
            ? withDigestCookie(digestCookie)
            : [],
        },
      },
    });
    const routesFromPaths = [...PATHS_TO_PROXY, ...extraPaths].map(
      routeFromPath,
    );

    const [include, routes] = generateDecoSiteMap
      ? [[...(includeSiteMap ?? []), decoSiteMapUrl], [{
        pathTemplate: decoSiteMapUrl,
        handler: {
          value: {
            __resolveType: "deco-sites/storefront/handlers/sitemap.ts",
          },
        },
      }]]
      : [includeSiteMap, []];

    return [
      ...routes,
      {
        pathTemplate: "/sitemap.xml",
        handler: {
          value: {
            include,
            __resolveType: "deco-sites/storefront/handlers/sitemap.ts",
          },
        },
      },
      {
        pathTemplate: "/sitemap*",
        handler: {
          value: {
            __resolveType: "deco-sites/storefront/handlers/sitemap.ts",
          },
        },
      },
      ...routesFromPaths,
    ];
  } catch (e) {
    console.log("Error parsing publicUrl from Shopify");
    console.error(e);
    return [];
  }
};

export interface Props {
  extraPathsToProxy?: string[];
  /**
   * @title Other site maps to include
   */
  includeSiteMap?: string[];
  /**
   * @title If deco site map should be exposed at /deco-sitemap.xml
   */
  generateDecoSiteMap?: boolean;
}

/**
 * @title Shopify Proxy Custom
 */
function loader(
  { extraPathsToProxy = [], includeSiteMap = [], generateDecoSiteMap = true }:
    Props,
  _req: Request,
  ctx: AppContext,
): Route[] {
  return buildProxyRoutes({
    generateDecoSiteMap,
    includeSiteMap,
    extraPaths: extraPathsToProxy,
    ctx,
  });
}

export default loader;
