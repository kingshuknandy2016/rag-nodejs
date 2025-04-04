import express from 'express';
import { pipeline } from '@xenova/transformers';

const app = express();
app.use(express.json());

class TextGenerator {
    private static generator: any = null;
    
    static async getInstance() {
        if (this.generator === null) {
            // Initialize the model (this will download it on first run)
            this.generator = await pipeline('text-generation', 'Xenova/gpt2');
        }
        return this.generator;
    }
}

app.post('/generate', async (req, res) => {
    try {
        const { prompt, maxLength = 100 } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const generator = await TextGenerator.getInstance();
        const result = await generator(prompt, {
            max_new_tokens: maxLength,
            temperature: 0.7,
            num_return_sequences: 1
        });

        res.json({ 
            generated_text: result[0].generated_text 
        });
    } catch (error) {
        console.error('Generation error:', error);
        res.status(500).json({ error: 'Text generation failed' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 