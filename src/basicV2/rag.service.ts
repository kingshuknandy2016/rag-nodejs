import { Retriever } from "./retrieval/retriever";
import { Generator } from "./generation/generator";

export class RAGService {
  private retriever: Retriever;
  private generator: Generator;

  constructor() {
    this.retriever = new Retriever();
    this.generator = new Generator();
  }

  // Update method signature to accept optional metadata
  async initialize(documents: string[], metadatas?: Record<string, any>[]) {
    await this.retriever.indexDocuments(documents, metadatas);
  }

  async query(prompt: string): Promise<string> {
    const relevantDocs = await this.retriever.retrieveRelevantDocuments(prompt);
    return this.generator.generate(prompt, relevantDocs);
  }
}