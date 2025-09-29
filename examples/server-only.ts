// Example: Server-only utility
// This file demonstrates server-only code that should never be bundled for the client

if (typeof window !== 'undefined') {
  throw new Error('This module should only be imported on the server');
}

import { AppContext } from '../apps/site.ts';

/**
 * Server-only database operations
 * These functions use Node.js APIs and should never reach the client
 */
export async function connectToDatabase() {
  // Example database connection logic
  // This would typically use Node.js APIs like 'fs', 'crypto', etc.
  console.log('Connecting to database...');
  return {
    query: async (sql: string) => {
      console.log(`Executing query: ${sql}`);
      return [];
    }
  };
}

/**
 * Server-only API calls that require secrets
 */
export async function makeSecureApiCall(endpoint: string) {
  const apiKey = Deno.env.get('SECRET_API_KEY');
  if (!apiKey) {
    throw new Error('API key not configured');
  }

  const response = await fetch(endpoint, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  });

  return response.json();
}

/**
 * Server-only file system operations
 */
export async function readServerConfig() {
  try {
    const config = await Deno.readTextFile('./config/server.json');
    return JSON.parse(config);
  } catch {
    return { fallback: true };
  }
}

