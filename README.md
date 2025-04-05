# RAG-NodeJS: Retrieval-Augmented Generation with Node.js

A Node.js and TypeScript implementation of Retrieval-Augmented Generation (RAG) systems with support for multiple AI providers.

## Overview

This project provides a flexible framework for building RAG applications using Node.js and TypeScript. It supports multiple vector databases and AI providers, allowing you to choose the best combination for your specific use case.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in a `.env` file (see [Environment Configuration](#environment-configuration) section below)

3. Development:
```bash
npm run dev
```

4. Build:
```bash
npm run build
```

5. Start production server:
```bash
npm start
```

## Project Structure

- `src/` - Source files
  - `basicV1/` - Basic RAG implementation (Version 1) - [Documentation](./src/basicV1/Readme.md)
  - `basicV2/` - Enhanced RAG implementation (Version 2) - [Documentation](./src/basicV2/Readme.md)
  - `advanced1/` - Advanced RAG implementation with modular components - [Documentation](./src/advanced1/Readme.md)
  - `differentAi/` - Integrations with various AI models - [Documentation](./src/differentAi/Readme.md)
  - `vectorStores/` - Vector database implementations - [Documentation](./src/vectorStores/Readme.md)
- `dist/` - Compiled JavaScript files
- `package.json` - Project configuration and dependencies
- `tsconfig.json` - TypeScript configuration

## Features

- **Multiple AI Providers**: Seamlessly switch between different LLM providers
- **Vector Database Support**: Integrate with Pinecone, ChromaDB, and more
- **TypeScript Support**: Type-safe code with TypeScript
- **Express Server**: Ready-to-use API endpoints
- **Development Tools**: Watch mode for development
- **Advanced Implementations**: Modular and extensible RAG architecture

## Available Scripts

```bash
# Main application
npm start                 # Run the main application
npm run dev               # Run development mode

# RAG implementations
npm run start:basic       # Run basic V1 implementation
npm run start:basicV2     # Run basic V2 implementation
npm run start:advanced1   # Run advanced implementation

# Vector database examples
npm run start:chroma      # Run ChromaDB example
npm run start:pinecone    # Run Pinecone example

# AI model integrations
npm run start:deepSeekR1_Zero  # Run DeepSeek R1 Zero example
npm run start:gemini           # Run Gemini generator
npm run start:geminiOpenAPI    # Run Gemini with OpenAI-compatible API
```

## Component Documentation

### AI Providers

This project supports multiple AI providers through a standardized interface. For detailed information about available AI integrations, refer to the [Different AI Integration README](./src/differentAi/Readme.md).

Currently supported AI models include:
- **Gemini**: Google's Gemini models
- **DeepSeek R1 Zero**: via OpenRouter API

For implementation details and how to extend with additional models, see the [AI Providers Documentation](./src/differentAi/Readme.md).

### RAG Implementations

The project includes multiple RAG implementations:
- **Basic V1**: Simple RAG implementation - [Documentation](./src/basicV1/Readme.md)
- **Basic V2**: Enhanced RAG with improved retrieval - [Documentation](./src/basicV2/Readme.md)
- **Advanced1**: Modular implementation with advanced features - [Documentation](./src/advanced1/Readme.md)

Each implementation demonstrates different techniques and optimizations. Refer to their respective README files for architecture details and usage examples.

### Advanced Implementation

The `advanced1` implementation provides a modular architecture with:
- Document loading from PDF and other file formats
- Customizable embedding strategies
- Flexible vector store integration
- Enhanced generation with additional context control

For more details, see the [Advanced1 Documentation](./src/advanced1/Readme.md).

### Vector Stores

Support for multiple vector databases:
- **ChromaDB**: Local vector database
- **Pinecone**: Cloud-based vector database

For configuration guides and implementation details, see the [Vector Stores Documentation](./src/vectorStores/Readme.md).

## Environment Configuration

Create a `.env` file in the project root with the following variables:

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Advanced Usage

For advanced usage scenarios, custom configurations, and integration examples, refer to the specific component documentation:

- [Basic V1 RAG Implementation](./src/basicV1/Readme.md)
- [Enhanced V2 RAG Implementation](./src/basicV2/Readme.md)
- [Advanced1 RAG Implementation](./src/advanced1/Readme.md)
- [AI Provider Integrations](./src/differentAi/Readme.md)
- [Vector Store Implementations](./src/vectorStores/Readme.md)

## Process Flows

Below are detailed process flows for the different RAG implementations in this project:

### Basic RAG (V1) Flow

1. **Document Ingestion**: Load and parse documents from various sources
2. **Embedding Generation**: Convert text chunks into vector embeddings
3. **Vector Store Indexing**: Store embeddings in a vector database
4. **Query Processing**: Process user queries and convert to embeddings
5. **Retrieval**: Find semantically similar content from the vector store
6. **LLM Processing**: Send retrieved context and query to the LLM
7. **Answer Generation**: Generate answers based on context and query
8. **Final Response**: Format and return the generated response

### Advanced RAG (V2 & Advanced1) Flow

```
┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
│  Document  │    │            │    │            │    │   Query    │
│  Loading & │───▶│ Chunking & │───▶│ Embeddings │    │ Processing │
│  Parsing   │    │Processing  │    │ Generation │    │            │
└────────────┘    └────────────┘    └───────┬────┘    └─────┬──────┘
                                            │               │
                                            ▼               ▼
                                     ┌────────────┐   ┌────────────┐
                                     │            │   │  Query     │
                                     │  Vector    │◀──┤  Embedding │
                                     │   Store    │   │ Generation │
                                     │            │   │            │
                                     └────────┬───┘   └────────────┘
                                              │
                  ┌────────────┐   ┌─────────▼────┐   ┌────────────┐
                  │   Post-    │   │  Semantic    │   │ Relevance  │
                  │ Processing │◀──┤  Search &    │◀──┤   Scoring  │
                  │  & Ranking │   │  Retrieval   │   │            │
                  └─────┬──────┘   └──────────────┘   └────────────┘
                        │
┌────────────┐   ┌─────▼──────┐   ┌────────────┐   ┌────────────┐
│   Final    │   │    LLM     │   │  Prompt    │   │  Context   │
│  Response  │◀──┤  Response  │◀──┤ Engineering│◀──┤ Integration│
│            │   │ Generation │   │            │   │            │
└────────────┘   └────────────┘   └────────────┘   └────────────┘
```

1. **Document Loading & Parsing**: Load documents from different formats (PDF, text, etc.)
2. **Chunking & Processing**: Split documents into optimal chunks with metadata
3. **Embeddings Generation**: Convert chunks to vector embeddings
4. **Vector Store**: Index and store embeddings with metadata
5. **Query Processing**: Process and analyze user queries
6. **Query Embedding Generation**: Convert queries to vector embeddings
7. **Semantic Search & Retrieval**: Find most relevant chunks
8. **Relevance Scoring**: Score retrieved chunks for relevance
9. **Post-Processing & Ranking**: Re-rank and filter results
10. **Context Integration**: Format retrieved content for the LLM
11. **Prompt Engineering**: Create effective prompts with context and query
12. **LLM Response Generation**: Generate answers using an AI provider
13. **Final Response**: Format and return the generated response

### Multi-AI Provider Workflow

```
┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐
│  Provider  │   │ Provider   │   │ Provider   │   │  Provider  │
│  Selection │───┤ Interface  │───┤ API call   │───┤ Response   │
│   Logic    │   │ Adapter    │   │ Execution  │   │ Processing │
└────────────┘   └────────────┘   └────────────┘   └────────────┘
      │                                                   │
      │                                                   ▼
      │                                            ┌────────────┐
      │                                            │ Response   │
      │                                            │ Formatting │
      │                                            └──────┬─────┘
      │                                                   │
      ▼                                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Unified Response Handler                     │
└─────────────────────────────────────────────────────────────────┘
```

1. **Provider Selection Logic**: Choose the appropriate AI provider based on requirements
2. **Provider Interface Adapter**: Translate requests to provider-specific format
3. **API Call Execution**: Make API calls to the selected provider
4. **Provider Response Processing**: Handle provider-specific responses
5. **Response Formatting**: Format the response in a standardized way
6. **Unified Response Handler**: Return consistent responses regardless of provider

### Vector Store Integration Flow

```
┌────────────┐   ┌────────────┐   ┌────────────┐
│ Vector DB  │   │  Vector    │   │  Database  │
│ Selection  │───┤  Store     │───┤  Client    │
│            │   │  Adapter   │   │ Connection │
└────────────┘   └────────────┘   └──────┬─────┘
                                         │
                                         ▼
┌────────────┐   ┌────────────┐   ┌────────────┐
│   Query    │   │  Vector    │   │  Search    │
│ Processing │◀──┤   Store    │◀──┤ Operation  │
│            │   │ Operations │   │ Execution  │
└────────────┘   └────────────┘   └────────────┘
```

1. **Vector DB Selection**: Choose appropriate vector database (Pinecone, ChromaDB, etc.)
2. **Vector Store Adapter**: Use adapter pattern for consistent interface
3. **Database Client Connection**: Connect to the selected vector database
4. **Search Operation Execution**: Execute queries against the vector database
5. **Vector Store Operations**: Perform various operations (similarity search, etc.)
6. **Query Processing**: Process and return search results

## Environment Configuration

Create a `.env` file in the project root with the following variables:

```
# AI Provider API Keys
OPENAI_API_KEY=your_openai_key_here
GOOGLE_API_KEY=your_google_api_key_here
OPENROUTER_API_KEY=your_openrouter_key_here

# Vector Database Configuration
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX=your_pinecone_index_name

# Application Settings
PORT=3000
NODE_ENV=development
```

Refer to the specific component READMEs for detailed configuration requirements for each service.