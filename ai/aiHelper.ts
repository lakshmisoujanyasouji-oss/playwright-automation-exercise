import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Initialize Claude client
const client = new Anthropic({
    apiKey: process.env.CLAUDE_API_KEY,
});

// Core function to call Claude API
export async function askClaude(prompt: string): Promise<string> {
    const message = await client.messages.create({
        model: 'claude-opus-4-5',
        max_tokens: 1024,
        messages: [
            {
                role: 'user',
                content: prompt
            }
        ]
    });

    // Safe check — ensure content exists
    if (!message.content || message.content.length === 0) {
        throw new Error('No response from Claude API');
    }

    // Extract text from response
    const content = message.content?.[0];
    if (!content) {
        throw new Error('Empty content from Claude API');
    }
    if (content.type === 'text') {
        return content.text;
    }

    throw new Error('Unexpected response type from Claude API');
}
