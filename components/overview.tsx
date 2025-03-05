"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Mock data - in a real app, this would come from an API
const data = [
  {
    name: "Jan",
    sent: 400,
    received: 240,
  },
  {
    name: "Feb",
    sent: 300,
    received: 139,
  },
  {
    name: "Mar",
    sent: 200,
    received: 980,
  },
  {
    name: "Apr",
    sent: 278,
    received: 390,
  },
  {
    name: "May",
    sent: 189,
    received: 480,
  },
  {
    name: "Jun",
    sent: 239,
    received: 380,
  },
  {
    name: "Jul",
    sent: 349,
    received: 430,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip formatter={(value) => [`$${value}`, undefined]} labelFormatter={(label) => `Month: ${label}`} />
        <Bar dataKey="sent" fill="#ef4444" radius={[4, 4, 0, 0]} />
        <Bar dataKey="received" fill="#22c55e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

