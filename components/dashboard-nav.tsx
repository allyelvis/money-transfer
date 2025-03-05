"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CreditCard, LayoutDashboard, LogOut, Settings, User, History } from "lucide-react"
import type { User as UserType } from "@/lib/types"
import { logoutUser } from "@/lib/auth-actions"

interface DashboardNavProps {
  user: UserType | null
}

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Transfer Money",
      href: "/dashboard/transfer",
      icon: CreditCard,
    },
    {
      title: "Transactions",
      href: "/dashboard/transactions",
      icon: History,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className="grid items-start px-4 text-sm font-medium">
      <div className="grid gap-2 py-2">
        {navItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <span
              className={cn(
                "group flex items-center rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent" : "transparent",
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </span>
          </Link>
        ))}
        <form
          action={async () => {
            await logoutUser()
          }}
        >
          <Button variant="ghost" className="w-full justify-start px-3" type="submit">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Button>
        </form>
      </div>
    </nav>
  )
}

