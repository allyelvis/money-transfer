import type React from "react"
import { redirect } from "next/navigation"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { Shield } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6 text-primary" />
            <span>MoneyTransfer</span>
          </div>
          <UserNav user={user} />
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex-1 overflow-auto py-2">
              <DashboardNav user={user} />
            </div>
          </div>
        </aside>
        <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}

