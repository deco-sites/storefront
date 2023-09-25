import { proxy } from "deco/clients/withManifest.ts";
import type { Manifest } from "./manifest.gen.ts";
import type { Manifest as ManifestVNDA } from "apps/vnda/manifest.gen.ts";
import type { Manifest as ManifestVTEX } from "apps/vtex/manifest.gen.ts";

export const invoke = proxy<Manifest & ManifestVNDA & ManifestVTEX>();
