import { cookies } from "next/headers"
import { NextResponse } from "next/navigation"

export async function GET() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get("session")?.value

  // If no session token exists, return null user
  if (!sessionToken) {
    return NextResponse.json({ user: null })
  }

  // In a real app, this would verify the session token with your auth provider
  // For demonstration, we'll return a mock user if the session token exists
  const user = {
    id: "user_1",
    name: "John Doe",
    email: "john.doe@example.com",
  }

  return NextResponse.json({ user })
}

