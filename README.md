# Construction Field Management App

A responsive React.js web application implementing core screens for a Construction Field Management system: **Login**, **Project List**, and **Daily Progress Report (DPR) Form**.

## Tech Stack

- **Framework:** React 18.3 with Vite 6
- **Styling:** Tailwind CSS 3.4
- **Routing:** React Router v6
- **State Management:** React Context API (`useContext` + `useState`)
- **Build Tool:** Vite
- **Language:** JavaScript (JSX)

## Features Implemented

### Login Screen
- Email and password fields with validation
- Mock authentication (`test@test.com` / `123456`)
- Descriptive error messages for invalid input and failed login
- Loading spinner during authentication
- Redirects to Project List on successful login

### Project List Screen
- Card-based UI displaying 5 construction projects
- Status badges with color indicators (In Progress, Completed, On Hold, Planning)
- Project name, location, and start date displayed
- **Bonus:** Search bar to filter projects by name
- **Bonus:** Status filter buttons to filter by project status
- Click any project card to open its DPR form

### DPR Form Screen
- Project dropdown selector (pre-selected when navigating from a project card)
- Date picker (defaults to today)
- Weather dropdown (Sunny / Cloudy / Rainy) with emoji icons
- Multiline textarea for work description
- Number input for worker count
- Photo upload: select 1–3 images with thumbnail previews and remove option
- Full form validation with user-friendly error messages
- Success toast notification on submission
- Form resets after successful submission
- Cancel / Back navigation to Project List

### Bonus Features
- **Dark Mode Toggle** — persistent across pages, saved to localStorage
- **Status Filter** — filter projects by status on the Project List page
- **Search** — search projects by name
- **Animated Transitions** — hover effects, loading spinners, toast animations

### Responsive Design
- Mobile-first layout (375px base width)
- Adapts to tablet (768px) and desktop (1280px+)
- No horizontal scroll on any screen size
- Responsive grid layout for project cards (1 / 2 / 3 columns)

## How to Run Locally

### Prerequisites
- Node.js v18+ and npm v9+

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd construction-field-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
construction-field-app/
├── public/
├── src/
│   ├── components/
│   │   ├── DarkModeToggle.jsx   # Dark/light mode toggle button
│   │   ├── ProtectedRoute.jsx   # Auth guard for routes
│   │   └── Toast.jsx            # Toast notification component
│   ├── context/
│   │   └── AuthContext.jsx      # Authentication context & provider
│   ├── data/
│   │   └── projects.js         # Static project data
│   ├── pages/
│   │   ├── Login.jsx           # Login screen
│   │   ├── ProjectList.jsx     # Project list screen
│   │   └── DPRForm.jsx         # Daily Progress Report form
│   ├── App.jsx                 # Root component with routing
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind CSS imports
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Known Issues / Limitations

- Authentication is mocked (no real backend); session is lost on page refresh
- Photo uploads are stored in browser memory only (not persisted)
- DPR form submissions are simulated (no API integration)
- No unit or integration tests included

## Demo Credentials

| Field    | Value           |
|----------|-----------------|
| Email    | test@test.com   |
| Password | 123456          |
