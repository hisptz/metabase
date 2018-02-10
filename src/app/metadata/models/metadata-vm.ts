export interface MetadataVm {
  id: string;
  url: string;
  loading: boolean;
  loaded: boolean;
  imported: boolean;
  metadataItems: Array<{
    id: string;
    name: string;
    items: Array<string>;
  }>;
}
