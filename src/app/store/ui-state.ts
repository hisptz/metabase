export interface UiState {
  errorMessage: string;
  importMessages: any[];
  progressMessages: any[];
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
  importMessages: [],
  loadedMetadata: [],
  progressMessages: []
};
