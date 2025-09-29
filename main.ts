/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />

import { App, staticFiles } from "fresh";

export const app = new App()
  // Add static file serving middleware
  .use(staticFiles())
  // Enable file-system based routing
  .fsRoutes();
