# PromptSmith

An IDE for testing, saving, and exporting AI prompts. Built for developers using GitHub Copilot.

## Features

- 📝 **Test Prompts**: Write and test prompts against Claude AI
- 💾 **Save & Load**: Store your best prompts locally (browser storage)
- 🗑️ **Manage**: Delete prompts you no longer need
- 🎨 **Clean UI**: Simple, responsive interface built with Tailwind CSS

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build**: Vite
- **API**: Groq API
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 16+ installed
- Claude API key (free tier available at https://console.anthropic.com)

### Installation

1. Clone the repo:
```bash
   git clone https://github.com/YOUR_USERNAME/promptsmith.git
   cd promptsmith
```

2. Install dependencies:
```bash
   npm install
```

3. Create `.env` file in the root:
```bash
   cp .env.example .env
```

4. Add your Claude API key to `.env`:

5. Run the dev server:
```bash
   npm run dev
```

   Open http://localhost:5173 in your browser.

### Build for production:
```bash
npm run build
npm run preview
```

## How to Use

1. **Write a prompt** in the left panel
2. **Click "Test Prompt"** to see the AI response
3. **Click "Save"** to add it to your saved prompts list
4. **View saved prompts** in the right sidebar
5. **Click any saved prompt** to reload it
6. **Delete** prompts you no longer need

## Known Limitations

- Prompts are stored locally in browser storage (max ~5MB)
- No cloud sync (yet)
- No team sharing (yet)

## Roadmap

- ☐ Export saved prompts as JSON/Markdown
- ☐ Dark mode
- ☐ Copy to clipboard
- ☐ Search/filter saved prompts

## License

MIT

## Author

Tanishka Bhardwaj

## Built for
Microsoft AI Skills Fest hackathon (June 2026)
