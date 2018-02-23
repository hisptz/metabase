export interface Metadata {
  id: string;
  url: string;
  loading: boolean;
  loaded: boolean;
  importing: boolean;
  previewing?: boolean;
  imported: boolean;
  previewed?: boolean;
  importSummary: any;
  showImportSummary: boolean;
  metadataItems: { [name: string]: Array<string> };
}
