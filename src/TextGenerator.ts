import { pipeline, env } from '@xenova/transformers';

// Suppress all ONNX warnings
process.env.ONNXRUNTIME_LOG_LEVEL = '4';  // Changed to 4 for maximum suppression

// Suppress transformer.js warnings and progress bars
env.localModelPath = './models';
env.allowRemoteModels = true;
env.backends.onnx.wasm.numThreads = 1;


class TextGenerator {
    private static generator: any = null;
    
    static async getInstance() {
        if (this.generator === null) {
            // Using a model that's compatible with @xenova/transformers
            this.generator = await pipeline(
                'text-generation', 
                'Xenova/gpt2'  // Changed to a compatible model
            );
        }
        return this.generator;
    }
}

export const generate = async (prompt?: string, maxLength: number = 100) => {
    try {
        if (!prompt) {
            throw new Error('Prompt is required');
        }

        const generator = await TextGenerator.getInstance();
        const result = await generator(prompt, {
            max_new_tokens: maxLength,
            temperature: 0.7,
            num_return_sequences: 1
        });

        return result[0].generated_text;
    } catch (error) {
        console.error('Generation error:', error);
        throw new Error('Text generation failed');
    }
}

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// Test with Hungarian text
const result = await generate('Travel itinerary for 3 days in Goa');
console.log(result);