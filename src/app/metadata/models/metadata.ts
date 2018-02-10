export interface Metadata {
  id: string;
  url: string;
  loading: boolean;
  loaded: boolean;
  imported: boolean;
  metadataItems: { [name: string]: Array<string> };
}
