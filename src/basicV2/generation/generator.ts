import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

export class Generator {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  }

  async generate(prompt: string, context: string[]): Promise<string> {
    const contextStr = context.join("\n\n");
    const fullPrompt = `
      Context:
      ${contextStr}

      Task:
      ${prompt}

      Answer the question using the provided context. If the context doesn't contain the answer, say "I don't have enough information to answer that."
    `;

    const result = await this.model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  }
}