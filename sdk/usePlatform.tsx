import { IS_BROWSER } from "$fresh/runtime.ts";

if (IS_BROWSER) {
  throw new Error("Cannot use this on the browser");
}

export const usePlatform = () => "vtex";
