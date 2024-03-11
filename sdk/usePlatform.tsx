import { IS_BROWSER } from "$fresh/runtime.ts";
import { _platform } from "../apps/site.ts";

if (IS_BROWSER) {
  throw new Error(
    "This function can not be used inside islands. Move this to the outter component",
  );
}

export const usePlatform = () => _platform;
