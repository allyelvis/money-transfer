"use client"

import { format } from "date-fns"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Mock data - in a real app, this would come from an API
const transactions = [
  {
    id: "tx_1",
    date: new Date(2023, 4, 15),
    type: "outgoing",
    amount: 250,
    recipient: "jane.doe@example.com",
  },
  {
    id: "tx_2",
    date: new Date(2023, 4, 12),
    type: "incoming",
    amount: 1000,
    recipient: "john.smith@example.com",
  },
  {
    id: "tx_3",
    date: new Date(2023, 4, 10),
    type: "outgoing",
    amount: 75.5,
    recipient: "store@example.com",
  },
  {
    id: "tx_4",
    date: new Date(2023, 4, 5),
    type: "incoming",
    amount: 500,
    recipient: "client@example.com",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full ${
              transaction.type === "incoming" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {transaction.type === "incoming" ? (
              <ArrowDownIcon className="h-5 w-5 text-green-600" />
            ) : (
              <ArrowUpIcon className="h-5 w-5 text-red-600" />
            )}
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {transaction.type === "incoming" ? "Received from" : "Sent to"} {transaction.recipient}
            </p>
            <p className="text-sm text-muted-foreground">{format(transaction.date, "MMM d, yyyy")}</p>
          </div>
          <div className={`ml-auto font-medium ${transaction.type === "incoming" ? "text-green-600" : "text-red-600"}`}>
            {transaction.type === "incoming" ? "+" : "-"}
            {formatCurrency(transaction.amount)}
          </div>
        </div>
      ))}
    </div>
  )
}

