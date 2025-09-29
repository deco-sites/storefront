import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import manifest from "./manifest.gen.ts";
import { mcpServer } from "@deco/mcp";
import { plugins } from "deco/plugins/deco.ts";

// Server-only dependencies that should never be bundled for the client
const serverOnlyDeps = [
	"@deco/durable", 
	"jsr:@deco/durable",
	// ALL OpenTelemetry packages (comprehensive list)
	"@opentelemetry/api",
	"@opentelemetry/core", 
	"@opentelemetry/instrumentation",
	"@opentelemetry/instrumentation-fetch",
	"@opentelemetry/resources",
	"@opentelemetry/sdk-trace-base",
	"@opentelemetry/sdk-trace-web",
	"@opentelemetry/otlp-transformer",
	"@opentelemetry/exporter-trace-otlp-proto",
	"@opentelemetry/exporter-trace-otlp-http",
	"@opentelemetry/exporter-zipkin",
	"@opentelemetry/propagator-b3",
	"@opentelemetry/propagator-jaeger",
	"@opentelemetry/propagator-aws-xray",
	"@opentelemetry/semantic-conventions",
	"@opentelemetry/auto-instrumentations-node",
	"@opentelemetry/instrumentation-http",
	"@opentelemetry/instrumentation-express",  
	"@opentelemetry/instrumentation-fs",
	"@opentelemetry/instrumentation-net",
	"@opentelemetry/instrumentation-dns",
	"require-in-the-middle",
	// ALL Protobuf packages
	"protobufjs",
	"@protobufjs/utf8",
	"@protobufjs/pool",
	"@protobufjs/float", 
	"@protobufjs/inquire",
	"@protobufjs/aspromise",
	"@protobufjs/base64",
	"@protobufjs/eventemitter",
	"@protobufjs/fetch",
	"@protobufjs/path",
	"@protobufjs/codegen",
	// Node.js specific packages
	"simple-git",
	"node:fs",
	"node:path",
	"node:os",
	"node:util",
	"node:crypto",
	// Deno-specific packages that might cause issues in SSR
	"deno/",
	"../live/",
	"../apps/",
	// Generic pattern matching for potential problematic packages
	"shimmer",
	"import-in-the-middle", 
	"emitter-listener",
	"diagnostic-channel",
	// Additional CommonJS packages that cause ESM interop issues
	"module-details-from-path",
	"hook-std",
	"stack-chain",
];

export default defineConfig({
	plugins: [
		fresh(),
		...plugins({
			manifest,
			htmx: true,
			useServer: (deco, hono) => {
				hono.use("/*", mcpServer(deco));
			},
		}),
	],

	// Add Node.js and CommonJS polyfills for problematic packages
	define: {
		global: "globalThis",
		"process.env.NODE_ENV": '"development"',
	},
	
	// SSR Configuration for server/client separation
	ssr: {
		external: serverOnlyDeps,
		noExternal: ["preact", "preact/hooks"],
	},

	// Optimize dependencies to avoid SSR issues
	optimizeDeps: {
		exclude: serverOnlyDeps,
		include: ["preact", "preact/hooks"],
	},

	// SSR configuration moved above to fix CommonJS issues

	// Resolve configuration to help with module resolution
	resolve: {
		conditions: ["deno", "worker", "development"],
	},

	// ESBuild configuration for better CommonJS handling
	esbuild: {
		// Preserve names for better debugging
		keepNames: true,
		// Handle CommonJS interop
		format: "esm",
	},
});
