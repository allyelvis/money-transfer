"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
}

export async function loginUser(data: LoginData) {
  // In a real app, this would validate credentials with your auth provider

  // Mock successful login for demonstration
  if (data.email && data.password) {
    // Create a mock session with encoded user data
    // In a real app, you would use a proper session token
    const mockUser = {
      id: "user_1",
      name: "John Doe",
      email: data.email,
    }

    const sessionData = JSON.stringify(mockUser)
    const encodedSession = Buffer.from(sessionData).toString("base64")

    // Set a mock session cookie
    cookies().set("session", encodedSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return { success: true }
  }

  return { success: false, error: "Invalid email or password" }
}

export async function registerUser(data: RegisterData) {
  // In a real app, this would create a new user in your database

  // Mock successful registration for demonstration
  if (data.name && data.email && data.password) {
    // Create a mock session with encoded user data
    const mockUser = {
      id: "user_" + Math.random().toString(36).substring(2, 10),
      name: data.name,
      email: data.email,
    }

    const sessionData = JSON.stringify(mockUser)
    const encodedSession = Buffer.from(sessionData).toString("base64")

    // Set a mock session cookie
    cookies().set("session", encodedSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return { success: true }
  }

  return { success: false, error: "Failed to create account" }
}

export async function logoutUser() {
  cookies().delete("session")
  redirect("/login")
}

