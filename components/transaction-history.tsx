"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"

type Transaction = {
  id: string
  date: Date
  type: "incoming" | "outgoing"
  amount: number
  recipient: string
  status: "completed" | "pending" | "failed"
  note?: string
}

// Mock data - in a real app, this would come from an API
const mockTransactions: Transaction[] = [
  {
    id: "tx_1",
    date: new Date(2023, 4, 15),
    type: "outgoing",
    amount: 250,
    recipient: "jane.doe@example.com",
    status: "completed",
    note: "Dinner payment",
  },
  {
    id: "tx_2",
    date: new Date(2023, 4, 12),
    type: "incoming",
    amount: 1000,
    recipient: "john.smith@example.com",
    status: "completed",
    note: "Freelance work",
  },
  {
    id: "tx_3",
    date: new Date(2023, 4, 10),
    type: "outgoing",
    amount: 75.5,
    recipient: "store@example.com",
    status: "completed",
  },
  {
    id: "tx_4",
    date: new Date(2023, 4, 5),
    type: "incoming",
    amount: 500,
    recipient: "client@example.com",
    status: "completed",
    note: "Project payment",
  },
  {
    id: "tx_5",
    date: new Date(2023, 4, 1),
    type: "outgoing",
    amount: 120,
    recipient: "utilities@example.com",
    status: "completed",
    note: "Utility bill",
  },
]

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(transactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransactions = transactions.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{format(transaction.date, "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {transaction.type === "incoming" ? (
                        <ArrowDownIcon className="mr-2 h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowUpIcon className="mr-2 h-4 w-4 text-red-500" />
                      )}
                      {transaction.type === "incoming" ? "Received" : "Sent"}
                    </div>
                  </TableCell>
                  <TableCell className={transaction.type === "incoming" ? "text-green-600" : "text-red-600"}>
                    {transaction.type === "incoming" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  <TableCell>{transaction.recipient}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{transaction.note || "-"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

