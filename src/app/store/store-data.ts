export interface StoreData {
  repositories: any[];
  metadataPackages: any[],
  importedMetadataPackages: any
}

export const INITIAL_STORE_DATA: StoreData = {
  repositories: [],
  metadataPackages: [],
  importedMetadataPackages: {}
};
