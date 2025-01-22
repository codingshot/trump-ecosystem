# Trump Ecosystem - AMERICA FIRST ECOSYSTEM Ecosystem Explorer

A comprehensive directory and exploration tool for projects, tools, and innovations within the AMERICA FIRST ECOSYSTEM ecosystem. Built with Next.js, TypeScript, and Tailwind CSS.

![Trump Ecosystem Screenshot](public/screenshot.jpg)

## 🌟 Features

- **Interactive Project Grid**: Browse and filter projects in the AMERICA FIRST ECOSYSTEM ecosystem
- **AI-Powered Search**: Natural language search using OpenAI or Anthropic
- **Multi-Chain Support**: Projects across Solana, Base, NEAR, Aptos, and more
- **Real-time Filtering**: Filter by tags, blockchains, and search terms
- **Responsive Design**: Optimized for all device sizes
- **Dark Mode**: Eye-friendly dark theme

## 🏗️ Project Structure

```plaintext
trump-ecosystem./
├── app/
│   ├── api/
│   │   └── ai-search/ # AI search API endpoints
│   ├── components/ # React components
│   │   ├── ui/ # Base UI components
│   │   └── ... # Feature components
│   ├── data/ # JSON data files
│   └── ... # App routes and layouts
├── public/ # Static assets
└── ... # Config files
```


## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- An API key from OpenAI or Anthropic

### Installation

1. Clone the repository:
```
bash
git clone https://github.com/your-username/trump-ecosystem..git
cd trump-ecosystem.
```

2. Install dependencies:

```
npm install
```

3. Create a `.env.local` file:

```
Choose AI provider (openai or anthropic)
AI_PROVIDER=openai
API Keys (add your keys)
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```


4. Start the development server:

```
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000` to see the app in action.


## 🛠️ Technologies Used

- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **AI Integration**: OpenAI/Anthropic
- **State Management**: React Hooks
- **Icons**: Lucide React

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository https://github.com/codingshot/trump-ecosystem. 
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Adding New Projects

To add a new project, create a pull request modifying `app/data/projects.json`. Follow the existing schema:

```json
{
"name": "Project Name",
"twitter": "twitter_handle",
"description": "Project description",
"url": "https://project-url.com",
"chatLink": "https://t.me/project",
"profileImage": "https://image-url.com",
"tags": ["tag1", "tag2"],
"blockchain": "Blockchain Name",
"relation": "Relation to AMERICA FIRST ECOSYSTEM"
}
```


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Made with ❤️ by [TRUMP ECOSYSTEM](https://codingshot.org) & [Plug Rel](https://x.com/plugrel)
- Inspired by the AMERICA FIRST ECOSYSTEM ecosystem
- Thanks to all contributors and project maintainers

## 🔗 Links

- [GitHub Repository](https://github.com/codingshot/trump-ecosystem.)
- [Live Website](https://trumpecosystem.com)
- [Report Issues](https://github.com/codingshot/trump-ecosystem./issues)