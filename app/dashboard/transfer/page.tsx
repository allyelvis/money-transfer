import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransferForm } from "@/components/transfer-form"
import { getCurrentUser } from "@/lib/auth"
import { getUserBalance } from "@/lib/user"
import { formatCurrency } from "@/lib/utils"

export default async function TransferPage() {
  const user = await getCurrentUser()
  const balance = await getUserBalance(user?.id)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Transfer Money</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Send Money</CardTitle>
            <CardDescription>Transfer money to another user</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Available Balance</p>
                <p className="text-xl font-bold">{formatCurrency(balance)}</p>
              </div>
            </div>
            <TransferForm balance={balance} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Transfer Information</CardTitle>
            <CardDescription>Important details about transfers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-3">
              <h3 className="font-medium">Transfer Limits</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Daily limit: {formatCurrency(5000)}
                <br />
                Weekly limit: {formatCurrency(20000)}
                <br />
                Monthly limit: {formatCurrency(50000)}
              </p>
            </div>
            <div className="rounded-lg border p-3">
              <h3 className="font-medium">Processing Time</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Transfers are typically processed instantly. In some cases, they may take up to 24 hours.
              </p>
            </div>
            <div className="rounded-lg border p-3">
              <h3 className="font-medium">Fees</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Standard transfers: Free
                <br />
                Instant transfers: 1% of the transfer amount
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

