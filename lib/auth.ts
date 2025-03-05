import { cookies } from "next/headers"
import type { User } from "./types"

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get("session")?.value

  if (!sessionToken) {
    return null
  }

  try {
    // Decode the base64 session token
    const decodedSession = Buffer.from(sessionToken, "base64").toString()
    const userData = JSON.parse(decodedSession)

    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
    }
  } catch (error) {
    console.error("Error decoding session:", error)
    return null
  }
}

