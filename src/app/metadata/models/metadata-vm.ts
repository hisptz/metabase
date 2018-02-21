export interface MetadataVm {
  id: string;
  url: string;
  loading: boolean;
  loaded: boolean;
  imported: boolean;
  importing: boolean;
  showImportSummary: boolean;
  importSummary: boolean;
  metadataItems: Array<{
    id: string;
    name: string;
    items: Array<string>;
  }>;
}
