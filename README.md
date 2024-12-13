# Awesome Pump - Pump.fun Ecosystem Explorer

This project is a React-based web application that showcases projects and tools within the Pump.fun ecosystem. It features a searchable and filterable grid of projects, AI-powered search capabilities, and detailed information about each project.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

To get the project running locally, follow these steps:

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/awesome-pump.git
   cd awesome-pump
   \`\`\`

2. Install the dependencies:
   \`\`\`bash
   npm install
   \`\`\`

## Running the Project Locally

To run the project in development mode:

\`\`\`bash
npm run dev
\`\`\`

This will start the development server. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Available Scripts

In the project directory, you can run:

- \`npm run dev\`: Runs the app in development mode.
- \`npm run build\`: Builds the app for production.
- \`npm start\`: Runs the built app in production mode.
- \`npm run lint\`: Runs the linter to check for code style issues.

## Environment Variables

This project uses environment variables for configuration. Create a \`.env.local\` file in the root directory and add the following variables:

\`\`\`
# AI Provider (openai or anthropic)
AI_PROVIDER=openai

# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Anthropic API Key
ANTHROPIC_API_KEY=your_anthropic_api_key_here
\`\`\`

Replace \`your_openai_api_key_here\` and \`your_anthropic_api_key_here\` with your actual API keys.

## Additional Information

- This project uses Next.js with the App Router.
- Styling is done using Tailwind CSS.
- The AI search feature can use either OpenAI or Anthropic, depending on the configuration.
- Project and tool data is stored in JSON files in the \`app/data\` directory.

For more information about the project structure or to contribute, please refer to the project's GitHub repository.

