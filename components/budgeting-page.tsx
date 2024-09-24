"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { AlertTriangle, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFA07A']

const initialBudgets = [
  { category: "Food", budget: 500, spent: 350 },
  { category: "Entertainment", budget: 200, spent: 180 },
  { category: "Utilities", budget: 300, spent: 280 },
  { category: "Transportation", budget: 150, spent: 100 },
  { category: "Shopping", budget: 250, spent: 200 },
  { category: "Health", budget: 100, spent: 50 },
  { category: "Other", budget: 200, spent: 150 },
]

export function BudgetingPageComponent() {
  const [budgets, setBudgets] = useState(initialBudgets)
  const [newCategory, setNewCategory] = useState("")
  const [newBudget, setNewBudget] = useState("")

  const addNewBudget = () => {
    if (newCategory && newBudget) {
      setBudgets([...budgets, { category: newCategory, budget: parseFloat(newBudget), spent: 0 }])
      setNewCategory("")
      setNewBudget("")
    }
  }

  const totalBudget = budgets.reduce((sum, item) => sum + item.budget, 0)
  const totalSpent = budgets.reduce((sum, item) => sum + item.spent, 0)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Budgeting</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Budget Overview</CardTitle>
            <CardDescription>Your budget usage across all categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Budget:</span>
                <span className="font-bold">${totalBudget.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Spent:</span>
                <span className="font-bold">${totalSpent.toFixed(2)}</span>
              </div>
              <Progress value={(totalSpent / totalBudget) * 100} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Distribution</CardTitle>
            <CardDescription>Visual breakdown of your budget allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgets}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="budget"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {budgets.map((entry, index) => (
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

      <h2 className="text-2xl font-bold mt-8 mb-4">Category Budgets</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item.category}</CardTitle>
              <CardDescription>
                Budget: ${item.budget.toFixed(2)} | Spent: ${item.spent.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={(item.spent / item.budget) * 100} />
            </CardContent>
            <CardFooter>
              {item.spent / item.budget > 0.9 && (
                <div className="flex items-center text-yellow-500">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span>Nearing budget limit</span>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}

        <Dialog>
          <DialogTrigger asChild>
            <Card className="flex items-center justify-center cursor-pointer hover:bg-muted/50">
              <CardContent>
                <Plus className="h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Add New Budget</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Budget</DialogTitle>
              <DialogDescription>
                Set a new budget for a category. You can add custom categories or choose from existing ones.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="budget" className="text-right">
                  Budget Amount
                </Label>
                <Input
                  id="budget"
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addNewBudget}>Add Budget</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}