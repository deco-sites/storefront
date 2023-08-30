import { IS_BROWSER } from "$fresh/runtime.ts";
import { platform } from "$store/apps/site.ts";

if (IS_BROWSER) {
  throw new Error(
    "This function can not be used inside islands. Move this to the outter component",
  );
}

export const usePlatform = () => platform;
