# ⌨ Vym

> A fast, clean, interactive Vim dictionary and practice gym. Look up commands across 12 categories, filter instantly, or click any category or command to practice directly in the interactive slide-in gym.

Inspired by [vim.rtorr.com](https://vim.rtorr.com/) and [VimHero](https://www.vim-hero.com/).

---

## 🌟 Features

- **Interactive Dictionary**: 100+ Vim commands organized across 12 essential categories (Cursor Movement, Editing & Operators, Text Objects, Registers, Macros, Windows, and more).
- **Pure Click-to-Practice**: Zero redundant buttons. Click any category title or individual command row to slide open the interactive practice gym.
- **Command Spotlight**: Selected commands are spotlighted with keys, descriptions, notes, and previous/next navigation within the category.
- **Instant Search**: Filter commands in real time by key combinations (e.g. `ciw`, `ddp`, `:%s`) or descriptions (`replace`, `indent`, `macro`). Press `/` anywhere to focus search.
- **Real Vim Engine**: Powered by CodeMirror 6 and `@replit/codemirror-vim` with One Dark theme, native status bar (`-- NORMAL --`, `-- INSERT --`, `-- VISUAL --`, command line `:`), and a live keystroke tracker.
- **Mobile-Friendly & Responsive**: Viewport-constrained flexbox layout with internally scrollable cards, touch-friendly tap targets, and proportional typography across phones, tablets, and desktops.

---

## 📁 Project Structure

```
vym/
├── src/
│   ├── components/
│   │   ├── CheatsheetView.tsx         # Responsive dictionary view with search & filters
│   │   ├── CategoryCard.tsx           # Category card with internal command scrolling
│   │   ├── CategoryPracticeDrawer.tsx # Slide-in practice gym with command spotlight
│   │   ├── CodeMirrorVimEditor.tsx    # CodeMirror 6 + Vim mode editor
│   │   └── KeystrokeDisplay.tsx       # Live visual keystroke indicator
│   ├── data/
│   │   └── cheatsheet.ts              # 12 categories, 100+ commands & practice snippets
│   ├── App.tsx                        # Main application shell
│   └── main.tsx                       # React entrypoint
├── tests/
│   └── cheatsheet.test.ts             # Data integrity & practice snippet tests
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `>= 24.0.0`
- **pnpm**: `>= 11.0.0`

### Quick Start

```bash
# Switch to Node 24
nvm use 24

# Install dependencies
pnpm install

# Start local dev server
pnpm dev
```

### Verification & Scripts

```bash
pnpm test       # Run unit tests (node:test via tsx)
pnpm run lint   # Fast linting via oxlint
pnpm run build  # Type-check and production build
```

---

## 📄 License

MIT
