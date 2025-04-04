# Basic RAG Implementation (Version 1)

This directory contains a basic implementation of a Retrieval-Augmented Generation (RAG) system in Node.js. The implementation follows a modular architecture to facilitate understanding and extensibility.

## Overview

Retrieval-Augmented Generation (RAG) enhances AI language models by integrating them with an external knowledge retrieval system. This approach improves accuracy, reduces misinformation, and allows access to up-to-date information without requiring frequent model retraining.

### The Problem

Traditional language models have inherent limitations:

- **Static Knowledge**: They rely on pre-trained data, which can become outdated.
- **Hallucinations**: They sometimes generate incorrect or misleading information.
- **Limited Context**: They struggle with domain-specific knowledge and long-form reasoning.

### The Solution: RAG

RAG solves these issues by combining a retrieval system with a language model:

- Retrieves relevant information from an external knowledge source.
- Feeds the retrieved information to a language model to generate accurate responses.

## Key Components

- **Knowledge Base**: A collection of external information (e.g., documents, FAQs, research papers, or APIs).
- **Embeddings**: Numerical representations of text that help compare semantic similarity.
- **Vector Database**: A specialized storage system optimized for efficient similarity searches (e.g., Pinecone, Weaviate, or FAISS).
- **Retrieval System**: A mechanism to find the most relevant documents from the vector database.
- **Language Model**: A generative AI model (e.g., OpenAI's GPT) that synthesizes responses using retrieved information.

## How RAG Works

### 1. Indexing Phase (Data Preparation)

- Split documents into smaller chunks.
- Convert each chunk into vector embeddings using an embedding model.
- Store these vectors in a vector database.

### 2. Retrieval & Generation Phase (Query Processing)

- Convert a user's question into a vector embedding.
- Retrieve the most similar document chunks from the vector database.
- Combine retrieved context with the original query.
- Pass this augmented input to a language model to generate a response.

## Benefits of RAG

- ✅ **More Accurate & Relevant Responses** – Provides real-time information beyond the model's training data.
- ✅ **Reduces Hallucinations** – Uses factual references to minimize incorrect outputs.
- ✅ **Easy Knowledge Updates** – Allows updating information without retraining the model.
- ✅ **Supports Source Citation** – Enables traceability of generated responses.
- ✅ **Improves Domain-Specific Knowledge** – Adapts easily to specialized fields like healthcare, finance, or law.

## Example Workflow

User Query: "What is TypeScript?"
   ⬇
Convert query into an embedding
   ⬇
Retrieve related documents from vector database
   ⬇
Combine retrieved content with query
   ⬇
Pass to language model for response generation
   ⬇
Response: "TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript."

Conclusion

RAG enhances AI models by grounding their responses in retrieved knowledge, making them more reliable, accurate, and adaptable to dynamic information needs.

## Directory Structure

- `entrypoint.ts`: Main entry point for the RAG system
- `rag.service.ts`: Core service that orchestrates the RAG workflow
- `embeddings/`: Embedding models and utilities
- `vectorstore/`: Vector database implementations
- `retrieval/`: Document retrieval components
- `generation/`: Text generation components using LLMs

## Process Flow

The RAG system operates through the following process flow:

1. **Document Ingestion** (Preprocessing)
   - Documents are split into smaller chunks for better retrieval
   - Each chunk is processed through the embedding model
   - The resulting vector embeddings are stored in the vector database

2. **Query Processing**
   - When a user submits a query, it flows through the system as follows:
   
   ```
   User Query
       │
       ▼
   Embedding Generation
       │ (Convert query to vector representation)
       ▼
   Vector Similarity Search
       │ (Find relevant document chunks)
       ▼
   Context Assembly
       │ (Compile retrieved documents)
       ▼
   Prompt Construction
       │ (Format query + context for LLM)
       ▼
   Language Model Generation
       │ (Generate response using LLM)
       ▼
   Final Response
   ```

3. **Component Interaction Details**
   - **Embedding Service**: Transforms text into numerical vectors that capture semantic meaning
   - **Vector Store**: Indexes document embeddings and provides efficient similarity search
   - **Retriever**: Handles the retrieval logic, including:
     - Query preprocessing
     - Determining the number of documents to retrieve
     - Filtering and ranking mechanisms
   - **Generator**: Works with the language model to:
     - Format prompts with retrieved context
     - Execute generation with appropriate parameters
     - Post-process responses if needed

4. **Data Flow Diagram**
   ```
   ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
   │            │    │            │    │            │    │            │
   │ Embeddings │───▶│VectorStore │───▶│ Retrieval  │───▶│ Generation │
   │  Service   │    │  Service   │    │  Service   │    │  Service   │
   │            │    │            │    │            │    │            │
   └────────────┘    └────────────┘    └────────────┘    └────────────┘
          ▲                                                    │
          │                                                    │
          └────────────────────────────────────────────────────┘
                                RagService
                                    ▲
                                    │
                                User Query
   ```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up Chroma using Docker as described in the Chroma section.

3. Configure the system according to your needs by modifying the appropriate components.

4. Run the system:
   ```bash
   npm run start:basic
   ```

## Usage

```typescript
import { RagService } from './rag.service';

// Initialize the RAG service
const ragService = new RagService();

// Process a query
const response = await ragService.processQuery("Your question here");
console.log(response);
```

## Extending the System

Each component is designed to be modular and replaceable. To extend or customize:

1. Create a new implementation that conforms to the respective interface
2. Update the configuration to use your custom implementation

## License

[Your License Here]

## Vector Database: Chroma

This implementation uses Chroma as the vector database for storing and retrieving document embeddings.

### About Chroma

Chroma is an open-source embedding database designed specifically for AI applications with the following features:

- **Efficient similarity search**: Optimized for fast semantic similarity retrieval
- **Persistent storage**: Maintains your vector data between sessions
- **Metadata filtering**: Allows filtering search results based on document metadata
- **Multiple embedding models**: Compatible with various embedding models
- **Simple API**: Easy to integrate with Node.js applications

### Setting Up Chroma Locally with Docker

To run Chroma locally using Docker:

1. Make sure you have Docker installed on your system.

2. Create a `docker-compose.yml` file with the following configuration:
   ```yaml
   version: '3.9'
   
   services:
     chroma:
       image: chromadb/chroma:latest
       volumes:
         - chroma-data:/chroma/chroma
       ports:
         - "8000:8000"
       environment:
         - ALLOW_RESET=true
         - CHROMA_SERVER_AUTH_CREDENTIALS_ENABLE=false
         - CHROMA_SERVER_AUTH_PROVIDER=token
     
     # Chroma UI service
     chroma-ui:
       image: ghcr.io/chroma-core/chroma-ui:latest
       ports:
         - "3000:3000"
       environment:
         - CHROMA_SERVER_HOST=chroma
         - CHROMA_SERVER_HTTP_PORT=8000
       depends_on:
         - chroma
   
   volumes:
     chroma-data:
       driver: local
   ```

3. Start the Chroma server and UI:
   ```bash
   docker-compose up -d
   ```

4. Access Chroma services:
   - Chroma API server: `http://localhost:8000`
   - Chroma GUI: `http://localhost:3000`

### Using the Chroma GUI

The Chroma GUI provides a visual interface to:

1. **Explore Collections**: View all your document collections
2. **Examine Embeddings**: Visualize embeddings with dimension reduction
3. **Test Queries**: Perform test searches against your collections
4. **Manage Data**: View, filter, and delete documents and collections
5. **Monitor Usage**: Track API calls and system performance

The GUI makes it easier to debug retrieval issues, understand your data distribution, and fine-tune your RAG implementation without writing code.

### Configuring the RAG System to Use Chroma

Set the following environment variables to connect to your Chroma instance:

```
CHROMA_URL=http://localhost:8000  # Default local Chroma server URL
```

Or update the configuration in your code:

```typescript
const chromaConfig = {
  url: process.env.CHROMA_URL || 'http://localhost:8000',
  collectionName: 'your_collection_name'
};
```

This update adds comprehensive information about Chroma, including:
- The Docker setup instructions
- Information about the Chroma GUI and how to access it
- What features the GUI provides
- How to configure your RAG system to connect to Chroma

Let me know if you'd like any adjustments or additional details!
