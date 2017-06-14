export interface StoreData {
  repositories: any[];
  originalMetadataPackages: any[];
  metadataPackages: any[];
  importedMetadataPackages: any;
}

export const INITIAL_STORE_DATA: StoreData = {
  repositories: [],
  originalMetadataPackages: [],
  metadataPackages: [],
  importedMetadataPackages: {}
};
