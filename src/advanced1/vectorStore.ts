import { Pinecone } from "@pinecone-database/pinecone";

import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { getEmbeddings } from "./embeddings";
import dotenv from "dotenv";
import { Document } from "@langchain/core/documents";

dotenv.config();


export class PineconeVectorStore {
  private pineconeClient: Pinecone;

  constructor() {
    this.pineconeClient = new PineconeClient({
      apiKey: process.env.PINECONE_API_KEY || '',
    });

  }

  private getPineConeIndex(pineconeIndexName: string) {
    const pineconeIndex = this.pineconeClient.Index(pineconeIndexName);
    return pineconeIndex;
  }

  public async createIndexIfNotExists(indexName: string, dimension: number = 768) {
    // Check if index exists
    const indexesList = await this.pineconeClient.listIndexes();
    const indexExists = indexesList.indexes && indexesList.indexes.some(idx => idx.name === indexName);
    
    if (!indexExists) {
      console.log(`Vector Store: Creating index ${indexName}`);
      // Note: Google's embedding-001 model has 768 dimensions
      await this.pineconeClient.createIndex({
        name: indexName,
        dimension: dimension,
        metric: 'cosine',
        spec: {
          serverless: {
            cloud: 'aws',
            region: 'us-east-1'
          }
        }
      });
      
      // Wait for index to be ready
      let isReady = false;
      while (!isReady) {
        try {
          const index = this.getPineConeIndex(indexName);
          await index.describeIndexStats();
          isReady = true;
          console.log(`Vector Store: Index ${indexName} is ready`);
        } catch (error) {
          console.log(`Vector Store: Waiting for index ${indexName} to be ready...`);
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      }
    } else {
      console.log(`Vector Store: Index ${indexName} already exists`);
    }
  }

  public async storeDocumentsInPinecone(documents: Document[], pineconeIndexName: string) {
    console.log('Vector Store: storeDocumentsInPinecone() - storing documents in pinecone');
    
    // Ensure index exists
    await this.createIndexIfNotExists(pineconeIndexName, 768);
    
    const pineconeIndexToUse = this.getPineConeIndex(pineconeIndexName);
    
    try {
      const indexDescription = await pineconeIndexToUse.describeIndexStats();
      console.log('Vector Store: storeDocumentsInPinecone() - pinecone index description: ', indexDescription);
    } catch (error) {
      console.error('Error getting index stats:', error);
      throw new Error(`Failed to access Pinecone index ${pineconeIndexName}`);
    }
    
    const pineconeStore = await PineconeStore.fromDocuments(
      documents,
      getEmbeddings(),
      { pineconeIndex: pineconeIndexToUse }
    );
    console.log('Vector Store: storeDocumentsInPinecone() - documents stored in pinecone successfully');
    return pineconeStore;
  }

  public async queryPinecone(query: string, pineconeIndexName: string, k: number = 4) {
    console.log('Vector Store: queryPinecone() - querying pinecone');
    
    // Ensure index exists before querying
    await this.createIndexIfNotExists(pineconeIndexName, 768);
    
    const pineconeIndexToUse = this.getPineConeIndex(pineconeIndexName);
    const vectorStore = await PineconeStore.fromExistingIndex(getEmbeddings(), {
      pineconeIndex: pineconeIndexToUse,
    });
    const results = await vectorStore.similaritySearch(query, k);

    if (results && results.length > 0) {
      console.log(`PineconeVectorStore: queryPinecone() - Found ${results.length} relevant results.`);
      return results;
    }
    return [];
  }
}
