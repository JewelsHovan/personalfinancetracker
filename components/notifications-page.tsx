"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Bell, CheckCircle, Trash2, AlertTriangle, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

type Notification = {
  id: string
  type: "reminder" | "warning" | "info"
  title: string
  message: string
  date: Date
  read: boolean
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "reminder",
    title: "Electricity Bill Due",
    message: "Your electricity bill of $75.50 is due in 3 days.",
    date: new Date(2023, 5, 15),
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Over Budget: Dining Out",
    message: "You've exceeded your monthly budget for dining out by $50.",
    date: new Date(2023, 5, 14),
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "New Feature: Budget Insights",
    message: "Check out our new budget insights feature to get more control over your spending!",
    date: new Date(2023, 5, 13),
    read: true,
  },
  {
    id: "4",
    type: "reminder",
    title: "Credit Card Payment",
    message: "Your credit card payment of $500 is due next week.",
    date: new Date(2023, 5, 12),
    read: false,
  },
  {
    id: "5",
    type: "warning",
    title: "Low Balance Alert",
    message: "Your checking account balance is below $100. Consider transferring funds.",
    date: new Date(2023, 5, 11),
    read: false,
  },
]

export function NotificationsPageComponent() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "reminder":
        return <Bell className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "info":
        return <DollarSign className="h-4 w-4 text-green-500" />
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Notification Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={markAllAsRead}>
              <CheckCircle className="mr-2 h-4 w-4" />
              <span>Mark all as read</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={clearAllNotifications}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Clear all notifications</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>
            Stay updated with your latest financial activities and reminders.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            {notifications.length === 0 ? (
              <p className="text-center text-muted-foreground">No notifications to display.</p>
            ) : (
              notifications.map((notification, index) => (
                <div key={notification.id}>
                  {index > 0 && <Separator className="my-2" />}
                  <div className="flex items-start space-x-4 py-2">
                    <Checkbox
                      checked={notification.read}
                      onCheckedChange={() => markAsRead(notification.id)}
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center">
                        {getIcon(notification.type)}
                        <p className="ml-2 text-sm font-medium leading-none">
                          {notification.title}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(notification.date, "PPP")}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            You have {notifications.filter(n => !n.read).length} unread notifications.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}