/**
 * Global API configuration for Jewellery Garden
 * Connects to NestJS Backend on Render or Localhost
 */

export const getApiUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && envUrl.trim()) {
    return envUrl.trim().replace(/\/+$/, "");
  }
  return "http://127.0.0.1:4000";
};

export const API_BASE = getApiUrl();
