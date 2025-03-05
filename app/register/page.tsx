import Link from "next/link"
import { Shield } from "lucide-react"
import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Shield className="h-6 w-6 text-primary" />
              <span>MoneyTransfer</span>
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Enter your information to create an account</p>
          </div>
          <div className="mt-6">
            <RegisterForm />
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Already have an account?</span>{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

