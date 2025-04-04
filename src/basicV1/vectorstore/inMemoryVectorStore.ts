export class InMemoryVectorStore {
    private vectors: { text: string; embedding: number[] }[] = [];
  
    async addDocuments(texts: string[], embeddings: number[][]) {
      for (let i = 0; i < texts.length; i++) {
        this.vectors.push({
          text: texts[i],
          embedding: embeddings[i],
        });
      }
    }
  
    async similaritySearch(queryEmbedding: number[], k: number = 3) {
      // Calculate cosine similarity between query and all vectors
      const results = this.vectors.map((vector) => {
        const similarity = this.cosineSimilarity(queryEmbedding, vector.embedding);
        return { text: vector.text, similarity };
      });
  
      // Sort by similarity and return top k
      return results
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, k)
        .map((item) => item.text);
    }
  
    private cosineSimilarity(a: number[], b: number[]): number {
      const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
      const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
      const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
      return dotProduct / (magnitudeA * magnitudeB);
    }
  }