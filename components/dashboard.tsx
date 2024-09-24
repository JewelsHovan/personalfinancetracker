"use client"

import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { CalendarIcon, CreditCard, DollarSign, PiggyBank, Plus } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const data = [
  {
    name: "Jan",
    income: 2400,
    expenses: 1398,
  },
  {
    name: "Feb",
    income: 1398,
    expenses: 2800,
  },
  {
    name: "Mar",
    income: 9800,
    expenses: 2908,
  },
  {
    name: "Apr",
    income: 3908,
    expenses: 2800,
  },
  {
    name: "May",
    income: 4800,
    expenses: 2600,
  },
  {
    name: "Jun",
    income: 3800,
    expenses: 2900,
  },
]

export function Dashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState("")

  const openDialog = (type: string) => {
    setDialogType(type)
    setIsDialogOpen(true)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => openDialog("expense")}>Add Expense</Button>
          <Button onClick={() => openDialog("income")}>Add Income</Button>
          <Button onClick={() => openDialog("transfer")}>Add Transfer</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Balance
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Credit Card Balance
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$5,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings</CardTitle>
                <PiggyBank className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,234.00</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Subscriptions
                </CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={data}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Bar dataKey="income" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" fill="#ff0000" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Bills</CardTitle>
                <CardDescription>
                  You have 3 bills due in the next 7 days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Netflix Subscription
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Due in 2 days
                      </p>
                    </div>
                    <div className="ml-auto font-medium">$12.99</div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Gym Membership
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Due in 5 days
                      </p>
                    </div>
                    <div className="ml-auto font-medium">$50.00</div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Electricity Bill
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Due in 7 days
                      </p>
                    </div>
                    <div className="ml-auto font-medium">$75.50</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Savings Goals</CardTitle>
                <CardDescription>
                  Your progress towards your financial goals.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <div className="flex items-center justify-between space-x-4">
                    <Label htmlFor="vacation">Vacation Fund</Label>
                    <span className="text-sm text-muted-foreground">
                      $2,000 / $5,000
                    </span>
                  </div>
                  <Progress value={40} className="mt-2" id="vacation" />
                </div>
                <div>
                  <div className="flex items-center justify-between space-x-4">
                    <Label htmlFor="emergency">Emergency Fund</Label>
                    <span className="text-sm text-muted-foreground">
                      $5,000 / $10,000
                    </span>
                  </div>
                  <Progress value={50} className="mt-2" id="emergency" />
                </div>
                <div>
                  <div className="flex items-center justify-between space-x-4">
                    <Label htmlFor="newcar">New Car</Label>
                    <span className="text-sm text-muted-foreground">
                      $15,000 / $30,000
                    </span>
                  </div>
                  <Progress value={50} className="mt-2" id="newcar" />
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Perform common actions quickly.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button
                  onClick={() => openDialog("expense")}
                  className="w-full"
                  variant="outline"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Expense
                </Button>
                <Button
                  onClick={() => openDialog("income")}
                  className="w-full"
                  variant="outline"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Income
                </Button>
                <Button
                  onClick={() => openDialog("transfer")}
                  className="w-full"
                  variant="outline"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Transfer
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Add {dialogType.charAt(0).toUpperCase() + dialogType.slice(1)}
            </DialogTitle>
            <DialogDescription>
              Enter the details for your new {dialogType}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                className="col-span-3"
                placeholder="Enter amount"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                className="col-span-3"
                placeholder="Enter description"
              />
            </div>
            {dialogType === "transfer" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="from" className="text-right">
                    From
                  </Label>
                  <Input
                    id="from"
                    className="col-span-3"
                    placeholder="From account"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="to" className="text-right">
                    To
                  </Label>
                  <Input
                    id="to"
                    className="col-span-3"
                    placeholder="To account"
                  />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Dashboard;