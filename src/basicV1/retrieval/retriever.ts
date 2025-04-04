// import { Embedder } from "../embeddings/embedder";
// import { InMemoryVectorStore } from "../vectorstore/inMemoryVectorStore";

import { Embedder } from "../embeddings/embedder";
import { InMemoryVectorStore } from "../vectorstore/inMemoryVectorStore";

export class Retriever {
  private embedder: Embedder;
  private vectorStore: InMemoryVectorStore;

  constructor() {
    this.embedder = new Embedder();
    this.vectorStore = new InMemoryVectorStore();
  }

  async indexDocuments(documents: string[]) {
    const embeddings = await this.embedder.embedDocuments(documents);
    await this.vectorStore.addDocuments(documents, embeddings);
  }

  async retrieveRelevantDocuments(query: string, k: number = 3): Promise<string[]> {
    const queryEmbedding = await this.embedder.embedText(query);
    return this.vectorStore.similaritySearch(queryEmbedding, k);
  }
}