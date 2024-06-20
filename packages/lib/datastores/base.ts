import {
  AppDocument,
  ChunkMetadata,
  ChunkMetadataRetrieved,
} from '@chatvolt/lib/types/document';
import { SearchRequestSchema } from '@chatvolt/lib/types/dtos';
import type { Datastore } from '@chatvolt/prisma';

export const INDEX_NAME = 'chatvolt';

export abstract class ClientManager<T extends Datastore> {
  datastore: T;

  constructor(datastore: T) {
    this.datastore = datastore;
  }

  abstract uploadDatasourceDocs(
    datasourceId: string,
    documents: AppDocument<ChunkMetadata>[]
  ): Promise<AppDocument<ChunkMetadata>[]>;
  abstract remove(datasourceId: string): Promise<any>;
  abstract removeBulk(datasourceIds: string[]): Promise<any>;
  abstract delete(): Promise<any>;
  abstract search(
    props: SearchRequestSchema
  ): Promise<AppDocument<ChunkMetadataRetrieved>[]>;
  abstract getChunk(
    chunkId: string
  ): Promise<AppDocument<ChunkMetadataRetrieved>>;
  abstract updateDatasourceMetadata(props: {
    datasourceId: string;
    metadata: Partial<ChunkMetadata>;
  }): Promise<any>;
}
