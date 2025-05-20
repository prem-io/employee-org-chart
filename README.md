# HappyFox | Employee Org Chart

A responsive, drag-and-drop organizational chart built with **React**, **TypeScript**, and **Vite**. This project was developed as part of the frontend assignment for HappyFox.

---

## 🚀 Features

* 🔍 **Employee Search** — Quickly filter employees by name, designation, or team.
* 🢑 **Team Filtering** — View the full org chart or filter by specific teams.
* 🧲 **Drag and Drop Reparenting** — Easily update reporting structure with intuitive drag-and-drop.
* 🎛 **Zoom & Pan** — Smooth zoom and pan for large org charts.
* 📱 **Responsive Design** — Mobile-first, works across all screen sizes.
* 🧠 **Optimized Performance** — Virtualized rendering and efficient DOM updates.
* ✨ **Skeleton Loaders** — Graceful UX while data loads.

---

## 🛠️ Tech Stack

* ⛳️ React 18 with TypeScript
* ⚡ Vite for blazing-fast dev server
* 🎨 CSS Modules & Utility-first layout
* 🧱 React DnD for drag-and-drop
* 🧪 Modular and reusable components

---

## 📂 Folder Structure

```
src/
│
├── components/       # All UI components (EmployeeCard, OrgChart, etc.)
├── api/              # API abstraction for employee data
├── hooks/            # Custom React hooks (if needed)
├── types/            # TypeScript interfaces & types
├── utils/            # Utility functions (e.g. cx classnames helper)
├── App.tsx           # Root component
├── main.tsx          # ReactDOM renderer
└── index.css         # Global styles
```

---

## 🖥️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/employee-org-chart.git
cd employee-org-chart
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Start the dev server

```bash
npm run dev
# or
yarn dev
```

Project will be available at: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Testing Drag & Drop

To test the reparenting functionality:

* Drag one employee card and drop it onto another to set the new manager.
* Dragging is **disabled** when filtered by team (to prevent invalid updates).

---

## 📸 Screenshots

### 🧩 Full Org Chart View
![Full Org Chart](/assets/full-org-chart.png)

---

## ✅ Assignment Notes

* All code is modular and adheres to best practices in component composition and state management.
* Special care taken to avoid circular reporting (i.e., no employee can become their own manager or ancestor).
* No external CSS libraries used; layout and styles are handcrafted for full control.

---

## 📄 License

This project is built as part of a **HappyFox frontend assignment** and is not intended for production use.
