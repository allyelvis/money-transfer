"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import type { DateRange } from "react-day-picker"

export function TransactionFilters() {
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>()

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="search">Search</Label>
          <Input id="search" type="text" placeholder="Search by email, note..." />
        </div>
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {isOpen && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="grid gap-1.5">
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="incoming">Incoming</SelectItem>
                    <SelectItem value="outgoing">Outgoing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-1.5 sm:col-span-2">
                <Label>Date Range</Label>
                <DatePickerWithRange date={date} setDate={setDate} />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline">Reset</Button>
              <Button>Apply Filters</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

