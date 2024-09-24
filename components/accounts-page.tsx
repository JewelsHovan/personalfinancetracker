"use client"

import { useState } from "react"
import { Plus, CreditCard, Wallet, Briefcase, ChevronDown, Search } from "lucide-react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Placeholder data
const accounts = [
  { id: 1, name: "Main Checking", type: "bank", balance: 5000, institution: "Bank of America" },
  { id: 2, name: "Savings", type: "bank", balance: 10000, institution: "Wells Fargo" },
  { id: 3, name: "Credit Card", type: "credit", balance: -1500, institution: "Chase" },
  { id: 4, name: "Investment", type: "investment", balance: 25000, institution: "Vanguard" },
]

const transactions = [
  { id: 1, date: "2023-06-01", description: "Grocery Store", amount: -75.50 },
  { id: 2, date: "2023-06-02", description: "Salary Deposit", amount: 3000 },
  { id: 3, date: "2023-06-03", description: "Electric Bill", amount: -120 },
  { id: 4, date: "2023-06-04", description: "Online Purchase", amount: -49.99 },
  { id: 5, date: "2023-06-05", description: "Restaurant", amount: -85 },
]

interface Account {
  id: number;
  name: string;
  institution: string;
  type: string;
  balance: number;
}

export default function AccountsPageComponent() {
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const filteredAccounts = accounts.filter((account) => {
    if (filter !== "all" && account.type !== filter) return false;
    if (
      searchTerm &&
      !account.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "bank":
        return <Wallet className="h-4 w-4" />;
      case "credit":
        return <CreditCard className="h-4 w-4" />;
      case "investment":
        return <Briefcase className="h-4 w-4" />;
      default:
        return <Wallet className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Accounts</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Account</DialogTitle>
              <DialogDescription>
                Enter the details of your new account here.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission
              }}
              className="grid gap-4 py-4"
            >
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Account Name
                </Label>
                <Input id="name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Account Type
                </Label>
                <Select required>
                  <SelectTrigger id="type" className="col-span-3">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank</SelectItem>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="institution" className="text-right">
                  Institution
                </Label>
                <Input id="institution" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="balance" className="text-right">
                  Initial Balance
                </Label>
                <Input
                  id="balance"
                  type="number"
                  className="col-span-3"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit">Add Account</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Select
            value={filter}
            onValueChange={(value) => setFilter(value)}
            aria-label="Filter accounts"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter accounts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Accounts</SelectItem>
              <SelectItem value="bank">Bank Accounts</SelectItem>
              <SelectItem value="credit">Credit Cards</SelectItem>
              <SelectItem value="investment">Investments</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search accounts"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search accounts"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAccounts.map((account) => (
          <Card
            key={account.id}
            className="cursor-pointer"
            onClick={() => setSelectedAccount(account)}
            aria-label={`View details for ${account.name}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {account.name}
              </CardTitle>
              {getAccountIcon(account.type)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${account.balance.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {account.institution}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedAccount && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{selectedAccount.name} Details</CardTitle>
            <CardDescription>{selectedAccount.institution}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Account Information</h3>
                <p>Type: {selectedAccount.type}</p>
                <p>Balance: ${selectedAccount.balance.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Recent Transactions</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell className="text-right">
                          ${transaction.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedAccount(null)}
            >
              Close Details
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}