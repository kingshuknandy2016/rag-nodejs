import { RAGService } from "./rag.service";

// Example documents with metadata
const documents = [
  "The capital of France is Paris.",
  "The Eiffel Tower is located in Paris.",
  "France is known for its wine and cheese.",
  "The official language of France is French.",
  "France is a member of the European Union.",
];

const metadatas = [
  { source: "geography-facts", page: 1 },
  { source: "landmark-guide", page: 42 },
  { source: "culture-overview", page: 7 },
];

async function main() {
  const rag = new RAGService();
  
  // Initialize with documents and metadata
  await rag.initialize(documents, metadatas);
  
  // Example query with source citation
  const response = await rag.query("What is France known for?");
  console.log("Response:", response);
}

main().catch(console.error);