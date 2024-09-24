"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from "@/components/ThemeProvider"
import { Home, CreditCard, DollarSign, PieChart, FileText, Settings, HelpCircle, Bell, Sun, Moon } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Accounts', path: '/accounts', icon: CreditCard },
  { name: 'Transactions', path: '/transactions', icon: DollarSign },
  { name: 'Budgeting', path: '/budgeting', icon: PieChart },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Settings', path: '/settings', icon: Settings },
  { name: 'Help & FAQ', path: '/help', icon: HelpCircle },
  { name: 'Notifications', path: '/notifications', icon: Bell },
]

export function Navbar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="bg-card text-card-foreground shadow-md">
      <div className="container mx-auto px-4">
        <ul className="flex justify-center items-center space-x-1 py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                    pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  <span className="hidden md:inline">{item.name}</span>
                </Link>
              </li>
            )
          })}
          <li>
            <button
              onClick={toggleTheme}
              className="flex items-center px-3 py-2 rounded-md transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}