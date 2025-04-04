import { Retriever } from "./retrieval/retriever";
import { Generator } from "./generation/generator";

export class RAGService {
  private retriever: Retriever;
  private generator: Generator;

  constructor() {
    this.retriever = new Retriever();
    this.generator = new Generator();
  }

  async initialize(documents: string[]) {
    await this.retriever.indexDocuments(documents);
  }

  async query(prompt: string): Promise<string> {
    // Retrieve relevant documents
    const relevantDocs = await this.retriever.retrieveRelevantDocuments(prompt);
    
    // Generate response using retrieved context
    return this.generator.generate(prompt, relevantDocs);
  }
}