# Personal Finance Tracker

A comprehensive personal finance management application built with Next.js, React, and TypeScript. This app helps users track their expenses, manage budgets, and gain insights into their financial health.

## Features

- Dashboard with financial overview
- Account management
- Transaction tracking
- Budgeting tools
- Expense categorization
- Financial reports and analytics
- Customizable settings
- Notifications for bills and budget alerts
- Help and FAQ section

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS
- [Recharts](https://recharts.org/) - Composable charting library for React
- [React Hook Form](https://react-hook-form.com/) - Performant, flexible and extensible forms
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation
- [Clerk](https://clerk.dev/) - Authentication and user management (planned)

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/JewelsHovan/personal-finance-tracker.git
   cd personal-finance-tracker
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
personalfinancetracker/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── dashboard.tsx
│   ├── accounts-page.tsx
│   ├── add-transaction-page.tsx
│   ├── budgeting-page.tsx
│   ├── help-faq-page.tsx
│   ├── navbar.tsx
│   ├── notifications-page.tsx
│   └── settings-page.tsx
├── lib/
│   └── utils.ts
├── public/
├── styles/
│   └── globals.css
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## Planned Features

- User authentication and authorization using Clerk
- Data persistence with a backend database
- Mobile responsiveness improvements
- Dark mode toggle
- Export financial data to CSV or PDF
- Integration with bank APIs for automatic transaction imports

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com/)
