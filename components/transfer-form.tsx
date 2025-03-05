"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { createTransfer } from "@/lib/transfer-actions"
import { formatCurrency } from "@/lib/utils"

const formSchema = z.object({
  recipientEmail: z.string().email({ message: "Please enter a valid email address" }),
  amount: z.coerce
    .number()
    .positive({ message: "Amount must be greater than 0" })
    .refine((val) => val <= 10000, { message: "Maximum transfer amount is $10,000" }),
  note: z.string().max(100, { message: "Note must be less than 100 characters" }).optional(),
})

interface TransferFormProps {
  balance: number
}

export function TransferForm({ balance }: TransferFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientEmail: "",
      amount: undefined,
      note: "",
    },
  })

  const watchAmount = form.watch("amount")
  const isInsufficientFunds = watchAmount > balance

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isInsufficientFunds) {
      toast({
        variant: "destructive",
        title: "Insufficient funds",
        description: `Your balance of ${formatCurrency(balance)} is less than the transfer amount.`,
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await createTransfer({
        recipientEmail: values.recipientEmail,
        amount: values.amount,
        note: values.note || "",
      })

      if (result.success) {
        toast({
          title: "Transfer successful",
          description: `You have successfully sent ${formatCurrency(values.amount)} to ${values.recipientEmail}.`,
        })
        form.reset()
        router.refresh()
      } else {
        toast({
          variant: "destructive",
          title: "Transfer failed",
          description: result.error || "Failed to complete transfer",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Transfer failed",
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="recipientEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient Email</FormLabel>
              <FormControl>
                <Input placeholder="recipient@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <Input type="number" placeholder="0.00" className="pl-7" {...field} />
                </div>
              </FormControl>
              {isInsufficientFunds && (
                <p className="text-sm font-medium text-destructive">
                  Insufficient funds. Your balance: {formatCurrency(balance)}
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Add a note for the recipient" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Add a message to the recipient (max 100 characters)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading || isInsufficientFunds}>
          {isLoading ? "Processing..." : "Send Money"}
        </Button>
      </form>
    </Form>
  )
}

