import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import Anthropic from '@anthropic-ai/sdk'
import projectsData from '../../data/projects.json'
import toolsData from '../../data/tools.json'

const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(openaiConfig)
const anthropic = new (Anthropic as any)({apiKey: process.env.ANTHROPIC_API_KEY!})

export const runtime = 'edge'

function stringSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const costs = new Array();
  for (let i = 0; i <= longer.length; i++) {
    costs[i] = i;
  }

  for (let i = 1; i <= shorter.length; i++) {
    costs[i] = i;
    let nw = i - 1;
    for (let j = 1; j <= longer.length; j++) {
      const cj = Math.min(1 + Math.min(costs[j], costs[j - 1]),
        shorter[i - 1] === longer[j - 1] ? nw : nw + 1);
      nw = costs[j];
      costs[j] = cj;
    }
  }

  return (longer.length - costs[longer.length]) / longer.length;
}

export async function POST(req: Request) {
  const { messages } = await req.json()
  const lastMessage = messages[messages.length - 1].content

  const prompt = `
    You are an AI assistant for the AMERICA FIRST ECOSYSTEM ecosystem. Your task is to help users find projects and tools based on their queries.
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

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          if (chunk.type === 'content_block_delta') {
            controller.enqueue(new TextEncoder().encode(chunk.delta.text))
          }
        }
        controller.close()
      },
    })

    return new StreamingTextResponse(stream)
  } else {
    return new Response('Invalid AI provider specified', { status: 400 })
  }
}

