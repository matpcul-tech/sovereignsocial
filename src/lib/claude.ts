import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export interface GeneratedPosts {
  brandName: string
  instagram: { content: string; hashtags: string }
  linkedin: { content: string }
  twitter: { content: string }
  facebook: { content: string }
  tiktok: { content: string; hashtags: string }
  pinterest: { content: string; hashtags: string }
}

export async function generatePosts(
  siteContent: string,
  sourceUrl: string
): Promise<GeneratedPosts> {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: `You are a social media content expert. Analyze the following website content and generate platform-specific social media posts that match the brand's voice and messaging.

Website URL: ${sourceUrl}

Website Content:
${siteContent.slice(0, 4000)}

Generate posts for each platform. Return ONLY a valid JSON object with this exact structure:
{
  "brandName": "extracted brand/business name",
  "instagram": {
    "content": "engaging post (max 2200 chars, conversational, story-driven)",
    "hashtags": "#relevant #hashtags #separated #by #spaces"
  },
  "linkedin": {
    "content": "professional post (max 700 chars, thought-leadership tone)"
  },
  "twitter": {
    "content": "punchy tweet (max 280 chars, direct and memorable)"
  },
  "facebook": {
    "content": "community-focused post (max 500 chars, friendly tone)"
  },
  "tiktok": {
    "content": "hook-driven script (max 300 chars, starts with a strong hook)",
    "hashtags": "#trending #hashtags"
  },
  "pinterest": {
    "content": "inspirational caption (max 500 chars, aspirational tone)",
    "hashtags": "#pin #hashtags"
  }
}

Extract the brand name from the site. Write content that reflects the actual business. Return only the JSON, no other text.`,
      },
    ],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Failed to parse Claude response')
  return JSON.parse(jsonMatch[0]) as GeneratedPosts
}
