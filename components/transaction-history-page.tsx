"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Search, Plus } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Define your categories here or import them if they are defined elsewhere
const categories = [
  { label: "Food & Dining", value: "food", icon: "🍽️" },
  { label: "Transportation", value: "transportation", icon: "🚗" },
  { label: "Housing", value: "housing", icon: "🏠" },
  { label: "Utilities", value: "utilities", icon: "💡" },
  { label: "Entertainment", value: "entertainment", icon: "🎭" },
  { label: "Shopping", value: "shopping", icon: "🛍️" },
  { label: "Health", value: "health", icon: "🏥" },
  { label: "Travel", value: "travel", icon: "✈️" },
  { label: "Education", value: "education", icon: "📚" },
  { label: "Personal", value: "personal", icon: "👤" },
  { label: "Income", value: "income", icon: "💰" },
]

const transactions = [
  { id: 1, date: "2023-06-01", description: "Grocery Store", amount: -75.50, category: "food" },
  { id: 2, date: "2023-06-02", description: "Salary Deposit", amount: 3000, category: "income" },
  { id: 3, date: "2023-06-03", description: "Electric Bill", amount: -120, category: "utilities" },
  { id: 4, date: "2023-06-04", description: "Online Purchase", amount: -49.99, category: "shopping" },
  { id: 5, date: "2023-06-05", description: "Restaurant", amount: -85, category: "food" },
  { id: 6, date: "2023-06-06", description: "Gas Station", amount: -40, category: "transportation" },
  { id: 7, date: "2023-06-07", description: "Movie Tickets", amount: -30, category: "entertainment" },
  { id: 8, date: "2023-06-08", description: "Gym Membership", amount: -50, category: "health" },
  { id: 9, date: "2023-06-09", description: "Freelance Payment", amount: 500, category: "income" },
  { id: 10, date: "2023-06-10", description: "Phone Bill", amount: -80, category: "utilities" },
]

export function TransactionHistoryPageComponent() {
  const [date, setDate] = useState<Date | undefined>()
  const [category, setCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [minAmount, setMinAmount] = useState<string>("")
  const [maxAmount, setMaxAmount] = useState<string>("")

  const filteredTransactions = transactions.filter(transaction => {
    if (date && format(new Date(transaction.date), "yyyy-MM-dd") !== format(date, "yyyy-MM-dd")) return false
    if (category !== "all" && transaction.category !== category) return false
    if (searchTerm && !transaction.description.toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (minAmount && transaction.amount < parseFloat(minAmount)) return false
    if (maxAmount && transaction.amount > parseFloat(maxAmount)) return false
    return true
  })

  const categoryData = categories.map(cat => ({
    name: cat.label,
    value: filteredTransactions
      .filter(t => t.category === cat.value && t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  })).filter(cat => cat.value > 0)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Transaction History</h1>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.icon} {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Min Amount"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
          className="w-[120px]"
        />
        <Input
          type="number"
          placeholder="Max Amount"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
          className="w-[120px]"
        />

        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{format(new Date(transaction.date), "PPP")}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  {categories.find(cat => cat.value === transaction.category)?.icon}{" "}
                  {categories.find(cat => cat.value === transaction.category)?.label}
                </TableCell>
                <TableCell className={cn(
                  "text-right",
                  transaction.amount < 0 ? "text-red-500" : "text-green-500"
                )}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}