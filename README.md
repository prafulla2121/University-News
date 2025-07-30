# 📰 Smart News Portal – React + TypeScript + Tailwind

🔗 **Live Demo:** [https://tourmaline-cranachan-eb2f78.netlify.app](https://tourmaline-cranachan-eb2f78.netlify.app)

A modern, responsive news web app built using **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It supports dynamic content like articles, events, and announcements, ideal for institutional or organizational use.

---

## 🚀 Features

- ⚡ Superfast performance with **Vite**
- 📱 Fully responsive and mobile-friendly UI
- 🎨 Beautifully styled using **Tailwind CSS**
- 🧩 Modular React components with **TypeScript**
- 🧠 Context API-based global state management
- 🗂️ Pages: Home, About, News, Contact, Login, Admin Dashboard
- ✍️ Admin forms for adding articles, events, exam schedules
- 📤 Excel export functionality
- 🛠️ Organized codebase with reusable utilities

---

## 📂 Project Structure
src/
- ├── components/ # Reusable UI components
- │ └── forms/ # Admin input forms
- ├── context/ # Global state
- ├── data/ # Static mock data
- ├── pages/ # All page views
- ├── types/ # Custom TypeScript types
- ├── utils/ # Helper functions (e.g., Excel export)
- ├── App.tsx # App root component
- ├── main.tsx # App entry poin



---

## 📦 Tech Stack

| Technology     | Purpose                    |
|----------------|----------------------------|
| React          | UI development             |
| TypeScript     | Type safety                |
| Tailwind CSS   | Utility-first styling      |
| Vite           | Fast dev & build tool      |
| Context API    | State management           |
| ExcelJS/XLSX   | Exporting data to Excel    |

---

## 🖥️ Pages Overview

- `/` – Home Page
- `/about` – About Us
- `/contact` – Contact Page
- `/login` – Admin Login
- `/dashboard` – Admin Dashboard
- `/news` – News Listing
- `/article/:id` – Article Details Page

---

## 🔧 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/your-repo.git

# Move into the project directory
cd your-repo

# Install dependencies
npm install

# Run the development server
npm run dev
