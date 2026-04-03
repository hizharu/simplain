# Simplain

 Because the world is full of complex things — and someone has to explain them simply.

Simplain is an AI-powered learning platform built around one idea: knowledge shouldn't be gatekept by complexity. Whether it's quantum physics or how inflation works, Simplain breaks it down like you're 12 — without dumbing it down.

---

## What's inside

Three things, done well:

**ExplainMe** — Ask anything. The AI explains it with simple language, real analogies, and no jargon. Save answers you like to your favorites. Your history stays in the session.

**Fundamental** — Structured reading across three branches of science: Formal, Natural, and Social. A foundation before the quiz.

**Quiz** — Pick a difficulty (Easy / Medium / Hard), pick a subject, answer 15 questions. Your XP, streak, and knowledge level update automatically.

---

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth + DB | Supabase (Auth, PostgreSQL, Storage) |
| AI | Groq API — `llama-3.3-70b-versatile` |
| Deployment | Vercel |

---

## Getting started

**Prerequisites:** Node.js 18+, a Supabase project, a Groq API key.

```bash
git clone https://github.com/hizharu/simplain.git
cd simplain
npm install
```

Create `.env.local` at the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Database setup

Run this in your Supabase SQL editor:

```sql
-- User profiles
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text,
  avatar_url text,
  total_xp integer default 0,
  formal_xp integer default 0,
  natural_xp integer default 0,
  social_xp integer default 0,
  streak_days integer default 0,
  last_quiz_date date,
  total_achievements integer default 0,
  knowledge_level text default 'Beginner'
);

-- Quiz history
create table quiz_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  level text,
  subject text,
  total_xp integer,
  completed_at timestamptz default now()
);

-- Saved explanations
create table explain_favorites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  question text,
  answer text,
  saved_at timestamptz default now()
);

-- RLS
alter table profiles enable row level security;
alter table quiz_attempts enable row level security;
alter table explain_favorites enable row level security;

create policy "Users manage own profile" on profiles for all using (auth.uid() = id);
create policy "Users manage own attempts" on quiz_attempts for all using (auth.uid() = user_id);
create policy "Users manage own favorites" on explain_favorites for all using (auth.uid() = user_id);
```

Also create a **public storage bucket** named `avatars` for profile pictures.

---

## Project structure

```
simplain/
├── app/
│   ├── api/
│   │   ├── explain/          # Groq streaming endpoint
│   │   ├── generate-quiz/    # Quiz question generation
│   │   └── save-quiz-score/  # XP + streak update
│   ├── quiz/
│   │   ├── levelstart/[level]/   # Subject picker
│   │   ├── [level]/[subject]/    # Quiz session
│   │   └── result/               # Result + review
│   ├── explain/              # ExplainMe chat
│   ├── fundamental/          # Science branches
│   └── account/              # Profile + stats
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── types/
│   └── quiz.ts
└── utils/
    └── supabase/
        ├── client.ts
        └── server.ts
```

Components follow **Atomic Design** — atoms → molecules → organisms → templates → pages.

---

## Quiz flow

```
Landing page
    └── Select level (Easy / Medium / Hard)
            └── Select subject (Formal / Natural / Social Science)
                    └── 15 questions  ·  timed
                            └── Result + XP + review
```

XP rules:

| Level | Correct | Wrong |
|---|---|---|
| Easy | +1 XP | 0 |
| Medium | +2 XP | +1 XP |
| Hard | +4 XP | +1 XP |

Knowledge levels unlock at: 0 → 50 → 150 → 300 → 500 XP.

---

## Environment variables

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project settings |
| `GROQ_API_KEY` | [console.groq.com](https://console.groq.com) |

For Vercel deployment, add all three in **Project Settings → Environment Variables**.

---

## Deployment

Push to `main` — Vercel handles the rest.

```bash
git add .
git commit -m "your message"
git push origin main
```

Make sure your Supabase project has your Vercel domain added under **Authentication → URL Configuration → Redirect URLs**:

```
https://your-project.vercel.app/**
```

---

## Contributing

This project was built as an internship project. If you want to contribute or fork it, go ahead and just keep it simple.

---

## License

MIT