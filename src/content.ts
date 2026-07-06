export const LINKS = {
  email: 'nd24csb0b87@student.nitw.ac.in',
  mailto: "mailto:nd24csb0b87@student.nitw.ac.in?subject=Let%27s%20build%20something",
  github: 'https://github.com/elightknight23',
  linkedin: 'https://www.linkedin.com/in/nithik-deva-864976354/',
  resume: '/Nithik_Deva_Resume.pdf',
}

export const HERO = {
  intro: 'Hello, I’m',
  name: 'NITHIK DEVA',
  blurb:
    'I got into AI the way most people do — using it as a tool — until curiosity pulled me under the hood and never let go. Now I build agentic systems and the engineering beneath them, deliberately exploring as many fields as I can before choosing where to go deep.',
  location: 'BASED IN HYDERABAD',
}

export const OFF_CLOCK = {
  blurb:
    'The curiosity doesn’t clock out. Away from the terminal I’m training, swimming or travelling — building the kind of discipline I hope inspires others to start — with films, music and graphic design filling the spaces between.',
  tags: ['TRAVEL', 'LIFTING', 'SWIMMING', 'MUSIC', 'FILM', 'GRAPHIC DESIGN'],
}

export type Role = {
  title: string
  company: string
  period: string
  bullets: string[]
}

export const ROLES: Role[] = [
  {
    title: 'AI.Accelerate Fellow',
    company: 'ServiceNow',
    period: 'JUN 2026 — AUG 2026 · ONGOING',
    bullets: [
      'One of 20 engineers selected from thousands of applicants across India for an intensive Agentic AI cohort — transformer internals, attention, embeddings, LangChain & LangGraph orchestration, ReAct and chain-of-thought patterns.',
      'Architecting an end-to-end capstone agent with MCP-based tool use, multi-agent orchestration and fine-tuning — evaluated through LLM-as-Judge rubrics and red-teaming, defended before a panel of ServiceNow engineers.',
      'Hardening enterprise agentic pipelines with AI-safety guardrails against hallucination, prompt injection and behavioral drift.',
    ],
  },
  {
    title: 'Software Engineering Intern',
    company: 'Eizen.ai',
    period: 'NOV 2025 — DEC 2025',
    bullets: [
      'Benchmarked 10+ TTS/STT models and LLMs to define the core stack of an AI therapist platform, pairing Deepgram with optimized audio buffering to cut speech latency.',
      'Shipped an audio-diarization pipeline across 500+ hours of recordings with Librosa and PyDub, surfacing speech patterns through dashboards that steered model training.',
      'Fused YOLO pose detection with LSTM encoders for unsupervised crowd-anomaly detection — 92% accuracy on a custom-built dataset.',
    ],
  },
  {
    title: 'Digital Marketing Strategy Analyst',
    company: 'Innobev Solutions',
    period: 'SEP 2025 — DEC 2025',
    bullets: [
      'Turned stakeholder interviews and market, regulatory and procurement research into data-driven B2B messaging for the beverage-formulation sector.',
      'Owned the social pipeline end-to-end, building a content framework aligned to industry events and aimed at technical buyers.',
      'Grew organic search visibility with a targeted SEO strategy informed by keyword-gap analysis of 15+ competitors.',
    ],
  },
]

export type Project = {
  index: string
  domain: string
  title: string
  description: string
  tags: string[]
  live: string
  source: string
}

export const PROJECTS: Project[] = [
  {
    index: '01',
    domain: 'AGENTIC AI',
    title: 'FOLIO',
    description:
      'An AI study workspace that reads alongside you — a hand-built hybrid RAG pipeline streams grounded, page-aware answers straight from your PDFs, with highlight-to-ask built in.',
    tags: ['REACT', 'FASTAPI', 'GEMINI API'],
    live: 'https://folio-pearl-eight.vercel.app',
    source: 'https://github.com/elightknight23/folio',
  },
  {
    index: '02',
    domain: 'FINTECH',
    title: 'SPLITLEDGER',
    description:
      'A group-expense platform where every balance is derived live from a relational ledger — settlements resolve in at most n−1 payments and the money math never leaves integer cents.',
    tags: ['TYPESCRIPT', 'POSTGRESQL', 'DOCKER'],
    live: 'https://splitledger-three.vercel.app/',
    source: 'https://github.com/elightknight23/splitledger',
  },
]

export const EXPERTISE = {
  blurb: 'A multidimensional skill set bridging the gap between heavy-duty engineering and agentic intelligence.',
  columns: [
    {
      heading: 'LANGUAGES',
      items: ['PYTHON', 'TYPESCRIPT', 'JAVA', 'C++', 'SQL'],
    },
    {
      heading: 'CORE STACK',
      items: ['REACT / NATIVE', 'FASTAPI', 'NODE / EXPRESS', 'POSTGRESQL', 'SUPABASE'],
    },
    {
      heading: 'DOMAINS',
      items: ['AGENTIC AI', 'RAG PIPELINES', 'LLM ORCHESTRATION', 'COMPUTER VISION', 'PROMPT ENG'],
    },
  ],
}

export const EDUCATION = {
  school: 'NIT Warangal',
  degree: 'B.Tech in Computer Science & Engineering — 8.54 CGPA',
  meta: 'CLASS OF 2028',
}

export type Honor = { title: string; detail: string }

export const HONORS: Honor[] = [
  {
    title: 'Inter-NIT Aquatics Medalist',
    detail: 'Led NITW’s swim team to Silver & Bronze at the 2025 All India Championship.',
  },
  {
    title: 'ServiceNow AI.Accelerate — 1 of 20',
    detail: 'Selected from thousands of applicants nationwide for the Agentic AI fellowship.',
  },
  {
    title: 'Certified WhiteHat Jr Trainee',
    detail: 'Early certification in programming fundamentals.',
  },
]

export const CONTACT = {
  marquee: 'ENGINEERING THE INTELLIGENT WEB',
  heading: ['LET’S BUILD', 'THE FUTURE.'],
}

export const FOOTER = {
  note: '© 2026 NITHIK DEVA — ENGINEERED IN HYDERABAD',
}
