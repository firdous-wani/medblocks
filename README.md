# MedBlocks Patient Registration App

A frontend-only patient registration application built with Next.js 14 that uses PGlite for local data storage. This application allows healthcare providers to register new patients, view patient records, and run custom SQL queries against the patient database.
<img width="1609" alt="Screenshot 2025-05-02 at 11 47 22 PM" src="https://github.com/user-attachments/assets/5896f1cb-6ee5-4073-ab53-0b49ff78ca55" />
<img width="1653" alt="Screenshot 2025-05-02 at 11 46 46 PM" src="https://github.com/user-attachments/assets/f7a7b0ad-842e-4cfc-8869-d6ff4d794959" />
<img width="1596" alt="Screenshot 2025-05-02 at 11 47 42 PM" src="https://github.com/user-attachments/assets/8e42f3cb-de4c-4c73-9be2-0b7d3e54cee0" />

## Features

- **Patient Registration Form** : Add new patients with comprehensive information validation using Zod and react-hook-form
- **Patient List** : View and manage all registered patients in a clean, sortable interface
- **SQL Query Tool** : Run custom SQL queries against the patient database to retrieve specific records
- **Data Persistence** : Patient data persists across page refreshes using PGlite's local database capabilities
- **Multi-tab Support** : Synchronize data across multiple browser tabs for collaborative workflows

## Tech Stack

- **Frontend Framework** : Next.js 14
- **Language** : TypeScript
- **Database** : PGlite (client-side SQL database)
- **Form Management** : react-hook-form with Zod validation
- **UI Components** : shadcn/ui component library
- **Styling** : TailwindCSS

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/firdous-wani/medblocksPublic.git
   cd medblocksPublic
   ```
2. Install dependencies:

   ```bash
   npm install

   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000/) with your browser to see the application.

## Usage Guide

### Patient Registration

1. Navigate to the "Home ("/") " page
2. Fill in the required patient information
3. Submit the form to add the patient to the database

### Viewing Patient Records

1. On the Home Page, Click on Patient List Tab to see a list of all registered patients
2. Use the filtering and sorting options to find specific patients

### Running SQL Queries

1. On the Home Page, Click on Query Tool Tab to open the Query Tab. 
2. Write your SQL query in the provided editor
3. Click "Execute" to run the query and view results
4. Example queries:
   ```sql
   -- Get all patients
   SELECT * FROM patients;
   -- Count patients by gender
   SELECT gender, COUNT(*) as count FROM patients GROUP BY gender
   ```

## Project Structure

```
|── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── src
│   ├── app
│   │   ├── favicon.ico
│   │   ├── fonts
│   │   │   ├── GeistMonoVF.woff
│   │   │   └── GeistVF.woff
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── patient-form
│   │   │   └── PatientForm.tsx
│   │   ├── patient-list
│   │   │   └── PatientList.tsx
│   │   ├── query-tool
│   │   │   └── QueryTool.tsx
│   │   └── ui
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       └── toaster.tsx
│   ├── hooks
│   │   └── use-toast.ts
│   ├── lib
│   │   ├── db.ts
│   │   └── utils.ts
│   └── types
│       └── index.ts
├── tailwind.config.ts
└── tsconfig.json

```

## Acknowledgements

- [Next.js](https://nextjs.org/) - The React Framework
- [PGlite](https://github.com/electric-sql/pglite) - SQLite compiled to WebAssembly with PostgreSQL compatibility
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework
