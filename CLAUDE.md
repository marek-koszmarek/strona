# Luźno Agency — CLAUDE.md

## Projekt
Strona agencji marketingowej/technologicznej "Luźno Agency". SPA zbudowane w AI Studio, rozwijane przez Claude Code.

## Tech Stack
- **React 19** + TypeScript 5.8
- **Vite 6** z pluginem `@tailwindcss/vite` (Tailwind v4 — brak tailwind.config.js!)
- **Framer Motion 12** importowany jako `motion/react` (nie `framer-motion`)
- **React Router DOM v7**
- **Lenis 1.3** — smooth scroll, dostępny globalnie jako `window.lenis`
- **Lucide React** — ikony
- `react-helmet-async` — SEO

## Struktura
```
src/
  App.tsx              # Root: Lenis setup, lazy routes, AnimatePresence
  pages/
    Home.tsx           # Hero + snap scroll + SmokeBackground
    CaseStudies.tsx    # Galeria projektów (import.meta.glob)
    Competencies.tsx
    Vision.tsx
    AISupport.tsx      # Strona tekstowa (brak integracji AI!)
    Contact.tsx
  components/
    Navigation.tsx     # Fixed nav + fullscreen overlay menu + LightningText
    SmokeBackground.tsx
    CustomCursor.tsx   # Wyłączony na urządzeniach touch
    Preloader.tsx
    SEO.tsx
  context/
    LanguageContext.tsx # t(pl, en) — dwujęzyczność PL/EN
```

## Zasady których MUSISZ przestrzegać

### i18n — OBOWIĄZKOWO
Każdy nowy tekst musi mieć wersję PL i EN przez `t()`:
```tsx
const { t } = useLanguage();
<h1>{t('Tekst po polsku', 'English text')}</h1>
```

### Tailwind v4
- Zero `tailwind.config.js` — konfiguracja przez CSS lub plugin w `vite.config.ts`
- Używaj standardowych klas Tailwind + wartości arbitralne `text-[clamp(3.5rem,14vw,9rem)]`

### Framer Motion
- Import: `from 'motion/react'` (nie `framer-motion`)
- Animacje wejścia: zawsze `viewport={{ once: true }}`
- Page transitions przez `AnimatePresence` w `App.tsx`

### Mobile First
- Niestandardowy kursor wyłączony na touch (`pointer: coarse`)
- Ciężkie animacje (SmokeBackground) uproszczone na mobile
- Touch targets min. 44×44px

### Smooth scroll
Używaj `window.lenis.scrollTo()` zamiast `window.scrollTo()`.

### Czego NIE robić
- Żadnego CSS-in-JS poza Tailwind
- Żadnych zewnętrznych arkuszy stylów poza `index.css`
- Nie używaj `framer-motion` — tylko `motion/react`
- Nie używaj `React.FC` — zwykłe funkcje z typami propsów

## Deploy
- **Vercel** — auto-deploy przy każdym push na `main`
- `vercel.json` w root — obsługa SPA routingu
- Brak wymaganych zmiennych środowiskowych (GEMINI_API_KEY to relikt z AI Studio, nieużywany)

## Workflow
```bash
# Lokalny dev
npm run dev

# Przed commitem sprawdź TypeScript
npm run lint

# Git
git add . && git commit -m "opis" && git push
# → Vercel auto-deployuje
```
