# FinWise - Personal Finance Web Application

## Overview

FinWise is a comprehensive personal finance web application designed to help users manage their finances effectively. The app provides features for tracking income and expenses, budgeting, and financial goal setting.

![FinWise Logo](https://via.placeholder.com/150?text=FinWise)

## Target Users

- **Young Adults**: Individuals aged 20-35 who want to manage their finances and achieve financial stability
- **Professionals**: Working professionals who need to track their expenses and stay on top of their finances

## Features

- **User Registration & Authentication**: Secure account creation and login
- **Transaction Tracking**: Add, edit, and delete income and expense transactions
- **Budgeting**: Set and manage category-based budgets
- **Financial Goal Setting**: Create and track financial goals
- **Notifications & Reminders**: Receive alerts for upcoming bills and financial deadlines
- **Dashboard**: Visualize financial data through charts and summaries

## Tech Stack

### Frontend

- **Core**: React with TypeScript
- **Routing**: React Router DOM
- **State Management**: Redux Toolkit
- **API Communication**: Axios
- **Styling**: TailwindCSS
- **Form Handling**: React Hook Form
- **Data Visualization**: Recharts
- **Date Handling**: date-fns

### Development Tools

- **Build Tool**: Vite
- **Linting**: ESLint with React plugins
- **Formatting**: Prettier
- **Testing**: Vitest, React Testing Library
- **Git Hooks**: Husky, lint-staged

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- npm (v7.x or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Odumz/finwise-frontend.git
   cd finwise-frontend


   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

## Project Structure

```
finwise-frontend/
├── public/
├── src/
│   ├── assets/        # Static assets (images, icons)
│   ├── components/    # Reusable UI components
│   ├── features/      # Feature-based modules
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Application pages
│   ├── services/      # API services
│   ├── store/         # Redux store configuration
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main App component
│   ├── main.tsx       # Application entry point
│   └── index.css      # Global styles
├── .eslintrc.js       # ESLint configuration
├── .prettierrc        # Prettier configuration
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
└── package.json       # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## Backend Integration

The frontend connects to the FinWise backend API:

- Backend Repository: [https://github.com/Odumz/finwise-backend.git](https://github.com/Odumz/finwise-backend.git)

## Design

Figma Design: [https://www.figma.com/design/b1jW8TmqtQs05SvtqxMfvj/Project-1?node-id=1292-30&t=X4VBA0uWjwKYkNV2-1](https://www.figma.com/design/b1jW8TmqtQs05SvtqxMfvj/Project-1?node-id=1292-30&t=X4VBA0uWjwKYkNV2-1)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Developers

- **Backend Developer**: [Odumz](https://github.com/Odumz)
- **Frontend Developer**: [Ayoola Enitan Prevail](https://github.com/fantastizeey1)

## Contact

- Project Link: [https://github.com/Odumz/finwise-frontend](https://github.com/Odumz/finwise-frontend)
