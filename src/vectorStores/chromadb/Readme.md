# Different vectortore and the Usage

## ChromaDB

Run Chroma in a Docker Container#
You can run a Chroma server in a Docker container, and access it using the HttpClient. We provide images on both docker.com and ghcr.io.

To start the server, run:

```cmd
docker run -v ./chroma-data:/data -p 8000:8000 chromadb/chroma
```
This starts the server with the default configuration and stores data in ./chroma-data (in your current working directory).