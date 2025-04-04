import { RAGService } from "./rag.service";

// Example documents (in a real app, these would come from a database or files)
const documents = [
  "The capital of France is Paris.",
  "The Eiffel Tower is located in Paris.",
  "France is known for its wine and cheese.",
  "The official language of France is French.",
  "France is a member of the European Union.",
];

async function main() {
  const rag = new RAGService();
  
  // Initialize with documents
  await rag.initialize(documents);
  
  // Example query
  const response = await rag.query("Wine and cheese?");
  console.log("Response:", response);
}

main().catch(console.error);