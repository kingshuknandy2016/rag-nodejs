import { Chroma } from "@langchain/community/vectorstores/chroma";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Document } from "@langchain/core/documents";

export class ChromaVectorStore {
  private vectorStore: Chroma | undefined;
  private embeddings: GoogleGenerativeAIEmbeddings;

  constructor() {
    this.embeddings = new GoogleGenerativeAIEmbeddings({
      model: "models/embedding-001",
    });
  }

  async initialize(collectionName: string = "rag-collection") {
    this.vectorStore = await Chroma.fromExistingCollection(
      this.embeddings,
      {
        url: process.env.CHROMA_DB_URL || "http://localhost:8000",
        collectionName,
      }
    );
  }

  async addDocuments(documents: string[], metadatas?: Record<string, any>[]) {
    const docs = documents.map(
      (text, i) =>
        new Document({
          pageContent: text,
          metadata: metadatas?.[i] || {},
        })
    );

    this.vectorStore = await Chroma.fromDocuments(
      docs,
      this.embeddings,
      {
        url: process.env.CHROMA_DB_URL || "http://localhost:8000",
        collectionName: "rag-collection",
      }
    );
  }
  async similaritySearch(query: string, k: number = 3) {
    if (!this.vectorStore) {
      throw new Error("Vector store is not initialized.");
    }
    const results = await this.vectorStore.similaritySearch(query, k);
    return results.map((doc) => doc.pageContent);
  }
}
