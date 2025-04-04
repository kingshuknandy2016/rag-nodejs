import { ChromaVectorStore } from "../vectorstore/chromaVectorStore";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";

export class Retriever {
  private vectorStore: ChromaVectorStore;
  private textSplitter: RecursiveCharacterTextSplitter;

  constructor() {
    this.vectorStore = new ChromaVectorStore();
    this.textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
  }

  async indexDocuments(documents: string[], metadatas?: Record<string, any>[]) {
    await this.vectorStore.initialize();
    
    // Create Document objects first
    const docs = documents.map((text, i) => 
      new Document({
        pageContent: text,
        metadata: metadatas?.[i] || {},
      })
    );

    // Then split them
    const splitDocs = await this.textSplitter.splitDocuments(docs);
    
    await this.vectorStore.addDocuments(
      splitDocs.map(d => d.pageContent),
      splitDocs.map(d => d.metadata)
    );
  }

  async retrieveRelevantDocuments(query: string, k: number = 3) {
    return this.vectorStore.similaritySearch(query, k);
  }
}