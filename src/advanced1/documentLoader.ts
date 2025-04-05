import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from 'langchain/document';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

/**
 * Load and split a PDF file into chunks
 * @param filePath - The path to the PDF file
 * @returns An array of Document objects
 */
export async function loadAndSplitPDF(filePath: string): Promise<Document[]> {
  const loader = new PDFLoader(filePath);
  const docs = await loader.load();
  console.log('Document Loader: loadAndSplitPDF() - docs: successfully loaded the pdf file');
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splitDocs = await textSplitter.splitDocuments(docs);
  console.log('Document Loader: loadAndSplitPDF() - splitDocs: successfully split the pdf file');
  return splitDocs;
}