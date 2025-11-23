/**
 * Base URL helper - returns configurable API base URL
 */
export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
}
