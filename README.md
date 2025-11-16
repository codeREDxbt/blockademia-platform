
# 🎓 Blockademia

> **Learn Web Development & Blockchain Technology**

A comprehensive educational platform offering free courses in web development, blockchain technology, and programming. Start your tech journey with hands-on projects and industry-recognized certificates.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-www.blockademia.live-blue?style=for-the-badge)](https://www.blockademia.live)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/codeREDxbt/blockademia-platform)

## ✨ Features

- 🎯 **Interactive Courses** - Web Development, React, Node.js, Python, AI, Blockchain
- 🏆 **Certificates** - Industry-recognized completion certificates
- 🔐 **Authentication** - Secure login with email/password and social OAuth
- 💳 **Premium Content** - Advanced courses and exclusive materials
- 🌐 **Web3 Integration** - MetaMask wallet connection and blockchain interactions
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - Beautiful interface with dark theme and animations

## 🚀 Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, Framer Motion
- **Authentication:** Supabase Auth
- **Database:** Supabase PostgreSQL
- **Deployment:** Vercel
- **Web3:** Ethereum, Solana integration
- **UI Components:** Custom component library

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/codeREDxbt/blockademia-platform.git
   cd blockademia-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📚 Available Courses

- **Web Development:** HTML, CSS, JavaScript fundamentals
- **React:** Modern React with hooks and context
- **Node.js:** Backend development and APIs
- **Python:** Programming basics to advanced concepts
- **AI & Machine Learning:** Introduction to AI development
- **Blockchain:** Ethereum, Solana, smart contracts
- **Web3:** DeFi, NFTs, and decentralized applications

## 🔧 Development

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🤖 Chatbot (AI assistant)

This project includes a minimal, friendly chatbot that can be powered by different AI backends (Grok, OpenAI, Claude). By default the chat UI falls back to a mock response — to connect a real AI power, add the provider and API key to your `.env`.

1. Add AI environment variables in `src/env.example` and your `.env` (choose one):

```
VITE_AI_PROVIDER=grok
VITE_AI_API_KEY=YOUR_API_KEY
VITE_AI_MODEL=grok-1
```

2. Alternatively, use a server-side proxy to keep the API key secret. We include a sample supabase function `src/supabase/functions/server/index.tsx` with an `/ai/chat` endpoint. Configure in your server env:

```
AI_PROVIDER=grok
AI_API_KEY=YOUR_API_KEY
AI_MODEL=grok-1
```

Then set `VITE_AI_PROXY` in `.env` to the proxy URL (e.g., `https://example.supabase.co/functions/v1/ai/chat`).

The chat button is bottom-right and will animate into view. You can adjust its spacing (so it doesn't collide with other floating UI like a scroll-to-top button) by setting the `--chatbot-bottom` CSS variable in `src/index.css`.

Notes:
- Press `Ctrl/Cmd+K` or `/` to open the chat and focus the input quickly.
- You can choose a persona in the chat header: `Friendly`, `Witty`, or `Grok`. The selection persists across sessions.

### Project Structure

```
blockademia-platform/
├── src/
│   ├── components/     # React components
│   ├── contexts/       # React contexts (Auth, Web3, etc.)
│   ├── data/          # Course data and content
│   ├── styles/        # Global styles
│   ├── utils/         # Utility functions
│   └── App.tsx        # Main application component
├── public/            # Static assets
└── ...config files
```

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy automatically on every push to `master`

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🔐 Authentication Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Set up authentication providers (Email, Google, GitHub)
3. Configure redirect URLs for your domain
4. Create the profiles table for user data

See `PRODUCTION_FIX_GUIDE.md` for detailed setup instructions.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern educational platforms
- Supabase for authentication and database
- Vercel for seamless deployment
- The open-source community for amazing tools and libraries

## 📞 Support

- 🌐 **Website:** [www.blockademia.live](https://www.blockademia.live)
- 📧 **Email:** support@blockademia.live
- 💬 **Discord:** [Join our community](https://discord.gg/blockademia)
- 🐛 **Issues:** [GitHub Issues](https://github.com/codeREDxbt/blockademia-platform/issues)

---

<div align="center">
  <p>Made with ❤️ by the Blockademia Team</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>