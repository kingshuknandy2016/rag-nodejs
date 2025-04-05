//import { OllamaEmbeddings } from 'langchain/embeddings/ollama';

import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

/**
 * Get embeddings for a given model
 * @returns An instance of GoogleGenerativeAIEmbeddings
 */
export function getEmbeddings() {
  return new GoogleGenerativeAIEmbeddings({
    modelName: "embedding-001",
    apiKey: process.env.GOOGLE_API_KEY,
  });
}