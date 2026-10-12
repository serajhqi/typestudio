# 🖋️ TypeStudio

> A modern, sleek local typography previewer and font playground built with React, TypeScript, and Vite.

TypeStudio lets you preview, test, and compare your local font collections side-by-side in real time by simply dropping font files into a folder.

---

## ✨ Features

- **📂 Drop-in Font Loading**: Simply put `.ttf`, `.otf`, `.woff`, or `.woff2` files into `src/fonts/` — they are auto-detected via Vite's dynamic glob import.
- **✨ Full-Width Row Previews**: Compare every font side-by-side in stacked, full-width cards.
- **⚡ Live Interactive Studio Bar**: Sticky control panel with real-time text input, quick clear, and sample presets (English pangrams, Persian/Arabic text, etc.).
- **🎚️ Live Size Slider**: Adjust preview font sizes from 16px to 72px instantaneously.
- **📋 One-Click Copy**: Easily copy font names to clipboard for use in your CSS or design tools.
- **🔒 Privacy & Git Friendly**: The `src/fonts/` folder is tracked via `.gitkeep`, while actual proprietary or private font files are automatically ignored in `.gitignore`.
- **🌙 Glassmorphic Dark UI**: Ambient glow and modern dark studio design.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
# or npm install / yarn
```

### 2. Add Your Fonts

Place any font files you want to preview into the `src/fonts/` directory:

```text
src/
└── fonts/
    ├── .gitkeep
    ├── MyCustomFont.ttf
    ├── AnotherFont.otf
    └── WebFont.woff2
```

### 3. Start the Dev Server

```bash
pnpm dev
# or npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler**: [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 📄 License

MIT

