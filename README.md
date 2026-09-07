# Portfolio

My personal portfolio website — built to showcase my projects, skills, and background.

🔗 **Live:** [gnihal.vercel.app](https://gnihal.vercel.app)

## Features

- Responsive design across desktop, tablet, and mobile
- Smooth Lottie-based animations
- Dedicated sections for skills, projects, and background
- Working contact form with email delivery via EmailJS
- Fast builds and dev server powered by Vite

## Tech Stack

- **Frontend:** React
- **Styling:** Tailwind CSS
- **Animations:** Lottie
- **Build Tool:** Vite
- **Contact Form:** EmailJS
- **Deployment:** Vercel

## Sections

- **Hero** — intro landing section
- **About** — background and what I do
- **Skills** — tech stack overview
- **Projects** — featured work with links to live demos and source code
- **Contact** — working form to reach out directly

## Project Structure

```
src/
├── components/
│   ├── common/     # Navbar, Footer, shared UI
│   ├── sections/   # Hero, About, Skills, Projects, Contact
│   └── ui/         # Reusable UI elements
├── data/           # Profile, skills, and project data
├── pages/          # Page-level components
├── styles/         # Global styles
└── utils/          # Helper functions (e.g. email service)
```

## Getting Started

```bash
git clone https://github.com/nihal705/portfolio.git
cd portfolio
npm install
npm run dev
```

## Environment Variables

Create a `.env` file based on `.env.example` and fill in the required keys (used for the contact form's email service).

## Deployment

Deployed on [Vercel](https://vercel.com), with automatic deployments triggered on every push to `main`.