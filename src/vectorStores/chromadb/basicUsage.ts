import { ChromaClient, Collection, IncludeEnum } from "chromadb";
import { DefaultEmbeddingFunction } from "chromadb";


const client = new ChromaClient({path: process.env.CHROMA_DB_URL});
const defaultEF = new DefaultEmbeddingFunction();

interface DocumentMetadata {
    source: string;
    category: string;
}

async function createCollection(collectionName: string): Promise<Collection> {
    return await client.createCollection({
        name: collectionName,
        embeddingFunction: defaultEF,
        metadata: {
            model: "all-MiniLM-L6-v2",
            size: 384,
        },
    });
}

async function addDocuments(collection: Collection): Promise<boolean> {
    await collection.add({
        documents: [
            "The capital of France is Paris.",
            "The Eiffel Tower is located in Paris.",
            "France is known for its wine and cheese.",
            "The official language of France is French.",
            "France is a member of the European Union.",
        ],
        ids: ["id-1", "id-2", "id-3", "id-4", "id-5"],
        metadatas: [
            { source: "Wikipedia", category: "Geography" },
            { source: "Travel Guide", category: "Landmarks" },
            { source: "Cultural Guide", category: "Cuisine" },
            { source: "Encyclopedia", category: "Language" },
            { source: "Political Reference", category: "International Relations" },
        ],
    }); 
    return true;
}


async function checkVectorSize(collectionName: string) {
    const collection = await client.getCollection({
        name: collectionName,
        embeddingFunction: defaultEF, // same as used in `createCollection`
    });

    // Get the first record's embedding
    const result = await collection.get({ 
        ids: ["id-1"],
        include: [IncludeEnum.Embeddings]  // Explicitly request embeddings
    });
    
    const embeddings = result.embeddings;

    if (embeddings && embeddings.length > 0) {
        const vectorSize = embeddings[0].length;
        console.log(`Vector size: ${vectorSize}`);
    } else {
        console.log("No embeddings found.");
    }
}

async function main() {
    try {
        const collectionName = "my_collection";

        const heartbeat = await client.heartbeat();
        console.log("Heartbeat:", heartbeat);
        // Step 0: Try to delete the collection if it exists
        try {
            await client.deleteCollection({ name: collectionName });
            console.log("Successfully deleted collection (if it existed)");
        } catch (error: any) {
            console.log("Collection did not exist or could not be deleted:", error.message);
        }

        // Step 1: Create a collection
        const collection = await createCollection(collectionName);
        console.log("Successfully created collection");

        // Step 2: Add documents to the collection
        await addDocuments(collection);
        console.log("Successfully added documents to the collection");

        // Step 3: Query the collection
        const results = await collection.query({
            queryTexts: ["What is France known for?"],
            nResults: 2,
            where: {
                category: "Cuisine",
            },
        });
        
        console.log("Query results:", results);

        // Step 4: Check vector size
        await checkVectorSize(collectionName);
        
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();