import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

// Initialize the API with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

interface InputPrompt {
    prompt: string;
    lines?: number;
    context?: string;
    role?: string;
}

class GeminiGenerator {
    private static model: any = null;
    
    static async getInstance() {
        if (this.model === null) {
            this.model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        }
        return this.model;
    }
}

export const generate = async (input: InputPrompt) => {
    try {
        if (!input.prompt) {
            throw new Error('Prompt is required');
        }

        // Construct enhanced prompt using all provided parameters
        const enhancedPrompt = [
            input.role ? `You are a ${input.role}.` : '',
            input.context ? `Context: ${input.context}` : '',
            `Respond to the following in ${input.lines || 10} lines or less:`,
            input.prompt,
            'Please be concise and stick to the requested line count.'
        ].filter(Boolean).join('\n');

        console.log("enhancedPrompt: ", enhancedPrompt);

        const model = await GeminiGenerator.getInstance();
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: enhancedPrompt }] }],
            generationConfig: {
                temperature: 0.7,
                topP: 0.95,
                topK: 40
            }
        });

        const response = await result.response;
        const text = response.text();

        // Get token usage details
        const usageMetadata = response.usageMetadata;
        const tokenUsage = {
            promptTokenCount: usageMetadata?.promptTokenCount,
            candidatesTokenCount: usageMetadata?.candidatesTokenCount,
            totalTokenCount: usageMetadata?.totalTokenCount
        };

        return {
            text: text,
            tokenUsage: tokenUsage
        };
    } catch (error) {
        console.error('Generation error:', error);
        throw new Error('Text generation failed');
    }
}

async function main() {
    // Example usage
    const result = await generate({
        prompt: 'Write a travel itinerary for 3 days in Goa',
    lines: 10,
    context: 'Travel itinerary',
    role: 'Travel agent'
});

    console.log('Generated Text:');
    console.log(result.text);
    console.log('\nToken Usage:');
    console.log(result.tokenUsage);
}

main();