readme:
  title: "📰 Smart News Portal – React + TypeScript + Tailwind"
  live_demo: "https://tourmaline-cranachan-eb2f78.netlify.app"
  description: >
    A sleek, responsive web app designed to manage and display dynamic news, event announcements, and articles for an institution or organization.
    Built with React, TypeScript, Vite, and Tailwind CSS.

  features:
    - "⚡ Fast & modern setup with Vite"
    - "💅 Responsive UI using Tailwind CSS"
    - "💼 Admin Dashboard with content forms"
    - "📰 Dynamic display of news and articles"
    - "📄 Export data to Excel"
    - "🔐 Context-based state management"
    - "🧠 Clean folder structure and TypeScript support"

  tech_stack:
    React: "UI Framework"
    TypeScript: "Static typing"
    Tailwind CSS: "Styling"
    Vite: "Build tool / dev server"
    Context API: "State Management"
    ExcelJS/XLSX: "Data export utilities"

  folder_structure: |
    src/
    ├── components/         # Reusable UI components
    │   └── forms/          # Admin input forms
    ├── context/            # App-wide state
    ├── data/               # Mock news/events/articles
    ├── pages/              # Page-level components
    ├── utils/              # Excel export and helpers
    ├── App.tsx             # App entry
    ├── main.tsx            # Root render

  pages:
    - "/ → Home Page"
    - "/about → About Page"
    - "/contact → Contact Page"
    - "/login → Admin Login"
    - "/dashboard → Admin Dashboard"
    - "/news → News listing"
    - "/article/:id → Article details"

  installation:
    - "git clone https://github.com/your-username/your-repo.git"
    - "cd your-repo"
    - "npm install"
    - "npm run dev"

  export_excel:
    - "src/utils/excelExport.ts"

  screenshots: "_Add interface screenshots here_"

  license: "MIT License"

  contributing: >
    PRs are welcome! Open issues or feature requests for collaboration.

  deployment:
    platform: "Netlify"
    url: "https://tourmaline-cranachan-eb2f78.netlify.app"

  author:
    name: "Prafulla Purohit"
    github: "https://github.com/prafulla2121"
