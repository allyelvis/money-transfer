export interface User {
  id: string
  name: string | null
  email: string
  image?: string | null
  phone?: string | null
  address?: string | null
}

export interface Transaction {
  id: string
  senderId: string
  recipientId: string
  amount: number
  status: "pending" | "completed" | "failed"
  createdAt: Date
  note?: string
}

