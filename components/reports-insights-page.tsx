"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const monthlyData = [
  { name: "Jan", income: 4000, expenses: 3000 },
  { name: "Feb", income: 4500, expenses: 3200 },
  { name: "Mar", income: 4200, expenses: 3500 },
  { name: "Apr", income: 4800, expenses: 3100 },
  { name: "May", income: 5000, expenses: 3800 },
  { name: "Jun", income: 4700, expenses: 3300 },
  { name: "Jul", income: 5200, expenses: 3900 },
  { name: "Aug", income: 5500, expenses: 4000 },
  { name: "Sep", income: 5100, expenses: 3700 },
  { name: "Oct", income: 5300, expenses: 3600 },
  { name: "Nov", income: 5400, expenses: 3800 },
  { name: "Dec", income: 6000, expenses: 4200 },
]

const yearlyData = [
  { name: "2019", income: 48000, expenses: 40000 },
  { name: "2020", income: 52000, expenses: 43000 },
  { name: "2021", income: 58000, expenses: 47000 },
  { name: "2022", income: 64000, expenses: 51000 },
  { name: "2023", income: 70000, expenses: 55000 },
]

const spendingCategories = [
  { name: "Food", value: 1500 },
  { name: "Transportation", value: 800 },
  { name: "Utilities", value: 600 },
  { name: "Entertainment", value: 400 },
  { name: "Shopping", value: 700 },
  { name: "Healthcare", value: 300 },
  { name: "Travel", value: 1000 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFA07A']

export function ReportsInsightsPageComponent() {
  const [timeframe, setTimeframe] = useState("monthly")

  const data = timeframe === "monthly" ? monthlyData : yearlyData

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Reports & Insights</h1>

      <div className="mb-6">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Income vs. Expenses Trends</CardTitle>
            <CardDescription>
              {timeframe === "monthly" ? "Monthly" : "Yearly"} overview of your income and expenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending Categories Breakdown</CardTitle>
            <CardDescription>Distribution of your expenses across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {spendingCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Highest Expense Categories</CardTitle>
            <CardDescription>Top spending categories by amount</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendingCategories.sort((a, b) => b.value - a.value).slice(0, 5)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Income</CardTitle>
            <CardDescription>{timeframe === "monthly" ? "This year" : "Last 5 years"}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              ${data.reduce((sum, item) => sum + item.income, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
            <CardDescription>{timeframe === "monthly" ? "This year" : "Last 5 years"}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              ${data.reduce((sum, item) => sum + item.expenses, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Net Savings</CardTitle>
            <CardDescription>{timeframe === "monthly" ? "This year" : "Last 5 years"}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              ${(data.reduce((sum, item) => sum + item.income, 0) - data.reduce((sum, item) => sum + item.expenses, 0)).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}