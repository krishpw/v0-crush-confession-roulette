/**
 * Token helper - reads auth token from localStorage
 */
export function getToken(): string | null {
  if (typeof window === "undefined") {
    return null
  }
  return localStorage.getItem("token")
}
