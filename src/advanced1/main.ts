import { loadAndSplitPDF } from './documentLoader';
import { Generator } from './generator';
import { PineconeVectorStore } from './vectorStore';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  try {
    //Step 1: Load and split PDF
    const pdfDocuments = await loadAndSplitPDF('src/advanced1/Pune-Darshan-PDF.pdf');
    
    //Step 2 Store in Pinecone
    console.log('Storing documents in Pinecone...');
    const pineconeVectorStore = new PineconeVectorStore();
    await pineconeVectorStore.storeDocumentsInPinecone(pdfDocuments, 'pune-darshan-index');
    
    // Wait a bit for Pinecone to process all vectors
    console.log('Waiting for Pinecone to process the vectors...');
    await wait(5000);
    
    //Step 3: Query Vector Store(Pinecone) for the raw context
    console.log('Querying Pinecone...');
    const query = 'What is the differnt battle related places in pune';
    const pineconeResults = await pineconeVectorStore.queryPinecone(query, 'pune-darshan-index');

    if(pineconeResults.length > 0){
      const generator = new Generator();

      //Step 4: Pass the raw context to the LLM for the final answer
      const response = await generator.generate(query, pineconeResults.map(result => result.pageContent));
      console.log(response);
    }else{
      console.log('No results found from the vector store');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main();