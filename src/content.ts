export const LINKS = {
  email: 'nd24csb0b87@student.nitw.ac.in',
  mailto: "mailto:nd24csb0b87@student.nitw.ac.in?subject=Let%27s%20build%20something",
  github: 'https://github.com/elightknight23',
  linkedin: 'https://www.linkedin.com/in/nithik-deva-864976354/',
  leetcode: 'https://leetcode.com/u/elightknight23/',
  resume: '/Nithik_Deva_Resume.pdf',
}

export const HERO = {
  intro: 'Hello, I’m',
  name: 'NITHIK DEVA',
  blurb:
    'CS undergrad at NIT Warangal, building agentic AI systems and the full-stack engineering underneath them. Currently one of 20 fellows in ServiceNow’s AI.Accelerate program.',
  location: 'BASED IN HYDERABAD',
}

export type HeroLink = { label: string; href: string; download?: boolean }
export type HeroStat = { value: string; label: string }

// Links + hard numbers shown in the hero's bottom-right corner.
export const HERO_META: { links: HeroLink[]; stats: HeroStat[] } = {
  links: [
    { label: 'GitHub', href: LINKS.github },
    { label: 'LinkedIn', href: LINKS.linkedin },
    { label: 'LeetCode', href: LINKS.leetcode },
    { label: 'Resume', href: LINKS.resume, download: true },
  ],
  stats: [
    { value: '8.54', label: 'CGPA — NIT Warangal' },
    { value: '1/20', label: 'ServiceNow AI Fellow' },
    { value: '02', label: 'Products Live' },
  ],
}

// Scroll-fill statement — the narrative the hero blurb doesn't have room for.
export const STATEMENT = {
  eyebrow: 'About',
  text: 'I like knowing how things work under the hood. Using AI wasn’t enough — so I started building it: retrieval pipelines from scratch, agents that plan and call tools, ledgers where every cent has to reconcile. I’m exploring widely on purpose, figuring out which problems are worth the next decade.',
}

export const OFF_CLOCK = {
  blurb:
    'Away from the keyboard I train, swim and travel — competitively enough at swimming to medal at Inter-NIT. The discipline is the point; if it nudges someone else to start, even better. Films, music and graphic design fill the gaps.',
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
      'Selected as one of 20 fellows from thousands of applicants across India for an intensive Agentic AI cohort — transformer internals, attention, embeddings, LangChain & LangGraph orchestration, ReAct and chain-of-thought patterns.',
      'Building an end-to-end capstone agent with MCP-based tool use, multi-agent orchestration and fine-tuning — evaluated through LLM-as-Judge rubrics and red-teaming, defended before a panel of ServiceNow engineers.',
      'Applying AI-safety guardrails — against hallucination, prompt injection and behavioral drift — to agentic pipelines on ServiceNow’s platform.',
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
      'An AI study workspace built around your PDFs — a hybrid RAG pipeline written from scratch, no LangChain, streams page-aware answers as you read, with highlight-to-ask on any passage you select.',
    tags: ['REACT', 'FASTAPI', 'GEMINI API'],
    live: 'https://folio-pearl-eight.vercel.app',
    source: 'https://github.com/elightknight23/folio',
  },
  {
    index: '02',
    domain: 'FINTECH',
    title: 'SPLITLEDGER',
    description:
      'A group-expense platform where balances are never stored — every figure derives live from a relational ledger, settlements resolve in at most n−1 payments, and the money math never leaves integer cents.',
    tags: ['TYPESCRIPT', 'POSTGRESQL', 'DOCKER'],
    live: 'https://splitledger-three.vercel.app/',
    source: 'https://github.com/elightknight23/splitledger',
  },
]

export const EXPERTISE = {
  blurb: 'The tools I work with every day, and the AI territory I’m deliberately going deeper into.',
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
    title: 'ServiceNow AI.Accelerate — 1 of 20',
    detail: 'Selected from thousands of applicants nationwide for the Agentic AI fellowship.',
  },
  {
    title: 'Inter-NIT Aquatics Medalist',
    detail: 'Led NITW’s swim team to Silver & Bronze at the 2025 All India Championship.',
  },
]

export const CONTACT = {
  marquee: 'GET IN TOUCH',
  eyebrow: 'OPEN TO INTERNSHIPS & COLLABORATIONS',
  heading: ['LET’S WORK', 'TOGETHER.'],
}

export const FOOTER = {
  note: '© 2026 NITHIK DEVA',
}
