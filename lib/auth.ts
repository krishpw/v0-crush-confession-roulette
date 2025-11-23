import { onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth"
import { getFirebaseAuth, getGoogleProvider } from "./firebase-client"

export interface AuthState {
  user: User
  token: string
}

export function subscribeToAuth(callback: (authState: AuthState | null) => void): () => void {
  const auth = getFirebaseAuth()

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const token = await user.getIdToken()
        localStorage.setItem("token", token)
        callback({ user, token })
      } catch (error) {
        console.error("[v0] Error getting ID token:", error)
        callback(null)
      }
    } else {
      localStorage.removeItem("token")
      callback(null)
    }
  })

  return unsubscribe
}

export async function loginWithGoogle(): Promise<AuthState> {
  const auth = getFirebaseAuth()
  const provider = getGoogleProvider()

  const result = await signInWithPopup(auth, provider)
  const token = await result.user.getIdToken()
  localStorage.setItem("token", token)

  return { user: result.user, token }
}

export async function logout(): Promise<void> {
  const auth = getFirebaseAuth()
  await signOut(auth)
  localStorage.removeItem("token")
}
