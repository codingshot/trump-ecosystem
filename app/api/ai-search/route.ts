import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import Anthropic from '@anthropic-ai/sdk'
import projectsData from '../../data/projects.json'
import toolsData from '../../data/tools.json'

const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(openaiConfig)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const lastMessage = messages[messages.length - 1].content

  const prompt = `
    You are an AI assistant for the Pump.fun ecosystem. Your task is to help users find projects and tools based on their queries.
    Here's the data for all projects and tools:
    ${JSON.stringify([...projectsData, ...toolsData])}

    User query: ${lastMessage}

    Please analyze the query and provide a helpful response based on the available project and tool data.
    If the query matches specific projects or tools, mention them by name and provide relevant details.
    If there's no exact match, suggest the most relevant projects or tools and explain why they might be of interest.
    Keep your response concise and informative.

    Format your response as follows:
    Brief description of the result
    |
    Name of the most relevant project or tool
  `

  const provider = process.env.AI_PROVIDER || 'openai'

  if (provider === 'openai') {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [{ role: 'user', content: prompt }],
    })

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } else if (provider === 'anthropic') {
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    })

    return new Response(response.content[0].text)
  } else {
    return new Response('Invalid AI provider specified', { status: 400 })
  }
}

