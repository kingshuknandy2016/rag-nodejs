import OpenAI from "openai";
import dotenv from 'dotenv';        
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

async function main() {
    const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: "Explain to me how AI works",
            },
        ],
    });

    console.log(response.choices[0].message);
}

main();