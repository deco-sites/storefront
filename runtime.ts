import { proxy } from "deco/clients/withManifest.ts";
import type { Manifest } from "./manifest.gen.ts";
import type { Manifest as ManifestVNDA } from "apps/vnda/manifest.gen.ts";
import type { Manifest as ManifestVTEX } from "apps/vtex/manifest.gen.ts";
import type { Manifest as ManifestShopify } from "apps/shopify/manifest.gen.ts";
import type { Manifest as ManifestWake } from "apps/wake/manifest.gen.ts";
import type { Manifest as ManifestLinx } from "apps/linx/manifest.gen.ts";
import type { Manifest as ManifestNuvemshop } from "apps/nuvemshop/manifest.gen.ts";

export const invoke = proxy<
  & Manifest
  & ManifestVNDA
  & ManifestVTEX
  & ManifestShopify
  & ManifestWake
  & ManifestLinx
  & ManifestNuvemshop
>();
