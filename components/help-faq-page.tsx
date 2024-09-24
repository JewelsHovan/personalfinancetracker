"use client"

import { useState } from "react"
import { Search, ChevronDown, MessageSquare, Mail } from "lucide-react"

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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const faqs = [
  {
    question: "How do I add a new transaction?",
    answer: "To add a new transaction, go to the 'Transactions' page and click on the 'Add Transaction' button. Fill in the required details such as amount, date, category, and description, then click 'Save'.",
  },
  {
    question: "How can I set up a budget?",
    answer: "To set up a budget, navigate to the 'Budgets' page and click 'Create New Budget'. Choose a category, set your budget amount, and specify the time period (e.g., monthly, weekly). Click 'Save' to create your budget.",
  },
  {
    question: "How do I connect my bank account?",
    answer: "To connect your bank account, go to the 'Accounts' page and click 'Add Account'. Select your bank from the list or search for it. You'll be prompted to log in to your online banking. Follow the security steps to securely link your account.",
  },
  {
    question: "Can I export my financial data?",
    answer: "Yes, you can export your financial data. Go to the 'Settings' page and look for the 'Export Data' option. You can choose to export your data in CSV or PDF format.",
  },
  {
    question: "How do I set up notifications?",
    answer: "To set up notifications, go to the 'Settings' page and select the 'Notifications' tab. Here you can choose which types of notifications you want to receive, such as low balance alerts or bill reminders.",
  },
]

const troubleshootingGuides = [
  {
    title: "Syncing Issues",
    content: "If you're experiencing syncing issues, try these steps: 1) Check your internet connection. 2) Log out and log back in. 3) Clear your browser cache. If the problem persists, please contact our support team.",
  },
  {
    title: "Password Reset",
    content: "To reset your password, click on the 'Forgot Password' link on the login page. Enter your email address and follow the instructions sent to your inbox. If you don't receive the email, check your spam folder.",
  },
  {
    title: "Account Linking Failures",
    content: "If you're having trouble linking your bank account, ensure you're using the correct login credentials. Some banks may require additional verification. If issues persist, try unlinking and relinking the account.",
  },
]

const appGuides = [
  {
    title: "Getting Started",
    content: "Welcome to our personal finance tracker! Start by setting up your profile and linking your accounts. Then, add your income sources and regular expenses. Set up budgets for different categories to start tracking your spending.",
  },
  {
    title: "Creating and Managing Budgets",
    content: "To create a budget, go to the 'Budgets' page. Click 'New Budget', select a category, enter the amount, and choose the time period. You can edit or delete budgets anytime. Use the progress bars to track your spending against your budgets.",
  },
  {
    title: "Generating Reports",
    content: "To generate financial reports, visit the 'Reports' page. You can create custom reports by selecting date ranges, accounts, and categories. Use these reports to gain insights into your spending habits and financial health.",
  },
]

export function HelpFaqPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredFAQs, setFilteredFAQs] = useState(faqs)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(term.toLowerCase()) ||
        faq.answer.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredFAQs(filtered)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Help & FAQ</h1>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search FAQs"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          <TabsTrigger value="guides">App Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to common questions about using our personal finance tracker.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="troubleshooting">
          <Card>
            <CardHeader>
              <CardTitle>Troubleshooting Guides</CardTitle>
              <CardDescription>
                Step-by-step solutions for common issues.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {troubleshootingGuides.map((guide, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{guide.title}</AccordionTrigger>
                    <AccordionContent>{guide.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides">
          <Card>
            <CardHeader>
              <CardTitle>App Guides</CardTitle>
              <CardDescription>
                Learn how to use key features of our personal finance tracker.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {appGuides.map((guide, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{guide.title}</AccordionTrigger>
                    <AccordionContent>{guide.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
          <CardDescription>
            Contact our support team for personalized assistance.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Chat
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Chat with Support</DialogTitle>
                <DialogDescription>
                  Our support team is here to help. Please describe your issue.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Textarea
                  placeholder="Type your message here."
                  className="min-h-[100px]"
                />
              </div>
              <DialogFooter>
                <Button type="submit">Send Message</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Email Support
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}