import express, { Request, Response, NextFunction } from 'express';
import pinecone from '../dbconfig/pineconeDB';

const API_KEY = process.env.PINECONE_API_KEY;
const ENVIRONMENT = "us-east-1-aws";

class PineconeController {
  public async get(req: Request, res: Response, next: NextFunction) {
    if (typeof API_KEY !== 'undefined') {
     await pinecone.init({
       environment: ENVIRONMENT,
       apiKey: API_KEY
     });
    } else {
      res.send("Missing API KEY");
    }

    const indexName = "first-index";
    const indexes = await pinecone.listIndexes();
    if (indexes.includes(indexName)) {
      await pinecone.deleteIndex({ indexName: indexName });
    }

    await pinecone.createIndex({
      createRequest: {
        name: indexName,
        dimension: 3,
        metric: "cosine"
      }
    });

    const Index = pinecone.Index("first-index");

    const upsertRequest: any = {
      vectors: [
        {
          id: "vec1",
          vector: [0.1, 0.2, 0.3],
          metadata: {
            genre: "drama",
          },
        }
      ],
      namespace: "example-namespace"
    }

    const upsertResponse = await Index.upsert({ upsertRequest });
    res.send(upsertResponse);
  }
}

export default PineconeController;