import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionHistory } from "@/components/transaction-history"
import { TransactionFilters } from "@/components/transaction-filters"

export default function TransactionsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Transaction History</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>View and filter your transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionFilters />
          <div className="mt-6">
            <TransactionHistory />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

