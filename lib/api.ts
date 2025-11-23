import { getToken } from "./token"
import { getBaseUrl } from "./base-url"

interface ApiOptions {
  method?: string
  body?: unknown
}

async function request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const token = getToken()
  const baseUrl = getBaseUrl()

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  return response.json()
}

export const api = {
  signup: (data: { email: string; password: string; displayName: string }) =>
    request<{ token: string }>("/api/auth/signup", { method: "POST", body: data }),

  login: (data: { email: string; password: string }) =>
    request<{ token: string }>("/api/auth/login", { method: "POST", body: data }),

  getMe: () => request<{ id: string; email: string; displayName: string }>("/api/user/me"),

  sendRandomConfession: (text: string) =>
    request<{ success: boolean }>("/api/confess/random", { method: "POST", body: { text } }),

  sendTargetedConfession: (text: string, targetEmail: string) =>
    request<{ success: boolean }>("/api/confess/targeted", { method: "POST", body: { text, targetEmail } }),

  getInbox: () =>
    request<Array<{ id: string; text: string; isTargeted: boolean; createdAt: string }>>("/api/confess/inbox"),
}
