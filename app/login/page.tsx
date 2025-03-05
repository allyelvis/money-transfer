import Link from "next/link"
import { Shield } from "lucide-react"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Shield className="h-6 w-6 text-primary" />
              <span>MoneyTransfer</span>
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Enter your credentials to sign in to your account</p>
          </div>
          <div className="mt-6">
            <LoginForm />
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Don&apos;t have an account?</span>{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

