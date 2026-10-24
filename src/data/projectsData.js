export const projectsData = [
  {
    id: 1,
    title: "MyCodeNotes",
    description:
      "A full-stack learning platform with LeetCode solutions, DSA concepts and practice problems, plus NextraAI, a RAG-powered AI assistant, progress tracking and timed mock tests.",
    image: "/assets/projects/mycodenotes.png",
    techStack: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Tailwind",
      "Groq",
      "Gemini",
    ],
    githubUrl: "https://github.com/nihal705/MyCodeNotes",
    detailsUrl: "https://github.com/nihal705/MyCodeNotes/blob/main/README.md",
    liveUrl: "https://mycodenotes.dev",
    icon: "",
    featured: true,
    longDescription:
      "MyCodeNotes is a full-stack learning platform for tracking your LeetCode journey and practicing DSA. It features NextraAI, a RAG-powered assistant with streaming responses, source citations and Groq → Gemini fallback, plus email OTP login, progress tracking with streaks, AI study plans, timed mock tests, and an admin dashboard.",
  },
  {
    id: 2,
    title: "SabAI Pay",
    description:
      "AI-powered UPI payments assistant with Agent Pay and Reserve Pay - intelligent payment assistant for UPI payments, bill payments, and managing Reserve Pay limits.",
    image: "/assets/projects/sabai-pay.png",
    techStack: ["React", "Node.js", "MySQL", "Redis", "Python", "Gemini API"],
    githubUrl: "https://github.com/nihal705/SabAi-Pay",
    detailsUrl: "https://github.com/nihal705/SabAi-Pay/blob/main/README.md",
    liveUrl: null,
    icon: "",
    featured: true,
    longDescription:
      "SabAI Pay is an intelligent AI-powered payment assistant that helps users with UPI payments, bill payments, mobile recharges, food ordering, shopping, and managing Reserve Pay limits. Features AI chatbot, multiple payment methods, real-time order tracking, and scheduled payments with auto-pay.",
  },
  {
    id: 3,
    title: "KwikCric",
    description:
      "A comprehensive cricket platform combining extensive cricket statistics, interactive games, tournament history, and player rankings.",
    image: "/assets/projects/kwikcric.png",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind"],
    githubUrl: "https://github.com/nihal705/kwikcric",
    liveUrl: "https://kwikcric.vercel.app",
    icon: "",
    featured: true,
    detailsUrl: "https://github.com/nihal705/kwikcric/blob/main/README.md",
    longDescription:
      "KwikCric is a comprehensive cricket platform that combines extensive cricket statistics, interactive games (Kwik Cricket, Cricket Mastermind, Imposter, Cricket Cards), tournament history (World Cup, T20 World Cup, Champions Trophy, WTC, IPL), and player rankings in one unified web application.",
  },
  {
    id: 4,
    title: "WanderVibe",
    description:
      "A beautiful, interactive travel discovery platform with 50+ destinations, save favorites, mark visited places, and dark/light mode.",
    image: "/assets/projects/wandervibe.png",
    techStack: ["HTML", "CSS", "JavaScript", "Vercel"],
    githubUrl: "https://github.com/nihal705/wanderVibe",
    detailsUrl: "https://github.com/nihal705/wanderVibe/blob/main/README.md",
    liveUrl: "https://wandervibe.vercel.app",
    icon: "",
    featured: false,
    longDescription:
      "WanderVibe is a beautiful, interactive travel discovery platform built with pure HTML, CSS, and JavaScript. Features 50+ destinations worldwide, save favorites with localStorage, mark visited places, search destinations by name/country/category, filter by category, dark/light mode toggle, and Google Maps integration.",
  },
  {
    id: 5,
    title: "InkWell — Article Publishing Platform",
    description:
      "A full-stack article publishing platform where anyone can register, write, and submit articles, with an admin review workflow gating every post before it goes live.",
    image: "/assets/projects/inkwell.png",
    techStack: [
      ".NET 10",
      "C#",
      "EF Core",
      "Neon PostgreSQL",
      "JWT",
      "Cloudinary",
      "Vanilla JavaScript",
      "Docker",
    ],
    githubUrl: "https://github.com/nihal705/inkwell",
    detailsUrl: "https://github.com/nihal705/inkwell/blob/main/README.md",
    liveUrl: "https://inkwell-magazine.vercel.app/",
    icon: "",
    featured: false,
    longDescription:
      "InkWell is a multi-author article publishing platform built with .NET 10 Web API, EF Core, and Neon PostgreSQL. It features JWT authentication with BCrypt hashing, role-based access control (Reader/Editor/Admin), an editorial approval workflow where writer submissions go through admin review before publishing, and rejection feedback loops that let writers revise and resubmit. Cover images and profile pictures are uploaded to Cloudinary, and the frontend is a responsive vanilla JavaScript SPA with client-side routing, dark/light theme, and a share bar — deployed on Render via Dockerfile.",
  },
  {
    id: 6,
    title: "Weather App",
    description:
      "A responsive weather application built with React that allows users to search for a city and view its current weather conditions along with a 5-day forecast.",
    image: "/assets/projects/weather-app.png",
    techStack: ["React", "JavaScript", "CSS", "Vite", "OpenWeather API"],
    githubUrl: "https://github.com/nihal705/weather-app",
    detailsUrl: "https://github.com/nihal705/weather-app#readme",
    liveUrl: "https://weather-app-nxhl.vercel.app",
    icon: "",
    featured: false,
    longDescription:
      'A modern, responsive weather application built with React that allows users to search for a city and view real-time weather data. Features include current temperature, humidity, "feels like" temperature, wind speed, and atmospheric pressure. Includes a 5-day forecast, responsive design for desktop/tablet/mobile, loading and error states, and a sleek glassmorphism UI. Built using React, Vite, and the OpenWeather API.',
  },
];
