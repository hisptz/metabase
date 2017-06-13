export interface UiState {
  errorMessage: string;
  currentMetadataPackage: {
    id: string;
    version: number;
  }
  loadedMetadata: any[];
}

export const INITIAL_UI_STATE = {
  errorMessage: '',
  currentMetadataPackage: {
    id: undefined,
    version: 0
  },
  loadedMetadata: []
};
