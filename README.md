# RAG-NodeJS: Retrieval-Augmented Generation with Node.js

A Node.js and TypeScript implementation of Retrieval-Augmented Generation (RAG) systems with support for multiple AI providers.

## Overview

This project provides a flexible framework for building RAG applications using Node.js and TypeScript. It supports multiple vector databases and AI providers, allowing you to choose the best combination for your specific use case.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in a `.env` file:

## Project Structure

- `src/` - Source files
- `dist/` - Compiled JavaScript files
- `package.json` - Project configuration and dependencies
- `tsconfig.json` - TypeScript configuration

## Features

- TypeScript support
- Express server
- Development and production configurations
- Watch mode for development 

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
  - `basicV1/` - Basic RAG implementation (Version 1)
  - `basicV2/` - Enhanced RAG implementation (Version 2)
  - `differentAi/` - Integrations with various AI models
  - `vectorStores/` - Vector database implementations
- `dist/` - Compiled JavaScript files
- `package.json` - Project configuration and dependencies
- `tsconfig.json` - TypeScript configuration

## Features

- **Multiple AI Providers**: Seamlessly switch between different LLM providers
- **Vector Database Support**: Integrate with Pinecone, ChromaDB, and more
- **TypeScript Support**: Type-safe code with TypeScript
- **Express Server**: Ready-to-use API endpoints
- **Development Tools**: Watch mode for development

## Available Scripts

```bash
# Main application
npm start                 # Run the main application
npm run dev               # Run development mode

# Basic RAG implementations
npm run start:basic       # Run basic V1 implementation
npm run start:basicV2     # Run basic V2 implementation

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

### RAG Implementations

The project includes multiple RAG implementations:
- **Basic V1**: Simple RAG implementation - [Documentation](./src/basicV1/Readme.md)
- **Basic V2**: Enhanced RAG with improved retrieval - [Documentation](./src/basicV2/Readme.md)

### Vector Stores

Support for multiple vector databases:
- **ChromaDB**: Local vector database
- **Pinecone**: Cloud-based vector database

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 