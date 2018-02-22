import * as _ from 'lodash';
import {
  MetadataAction,
  MetadataActionTypes
} from './../actions/metadata.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Metadata } from '../../models/metadata';

export interface State extends EntityState<Metadata> {
  currentMetadata: string;
  currentMetadataItem: string;
}

export const adapter: EntityAdapter<Metadata> = createEntityAdapter<Metadata>();

export const initialState: State = adapter.getInitialState({
  currentMetadata: '',
  currentMetadataItem: ''
});

export function reducer(state: State = initialState,
  action: MetadataAction): State {
  switch (action.type) {
    case MetadataActionTypes.LOAD_METADATA:
      return adapter.addOne(action.payload, state);
    case MetadataActionTypes.LOAD_METADATA_SUCCESS:
    case MetadataActionTypes.IMPORT_METADATA_SUCCESS:
    case MetadataActionTypes.TOGGLE_METADATA_IMPORT_SUMMARY:
      return adapter.updateOne(
        {
          id: action.payload.id,
          changes: action.payload.changes
        },
        state
      );
    case MetadataActionTypes.SET_CURRENT_METADATA:
      return {...state, currentMetadata: action.payload};

    case MetadataActionTypes.SET_CURRENT_METADATA_ITEM:
      return {...state, currentMetadataItem: action.payload};
    case MetadataActionTypes.CLEAR_CURRENT_METADATA_ITEM:
      return {...state, currentMetadataItem: ''};
    case MetadataActionTypes.IMPORT_METADATA:
      const currentMetadata: Metadata = state.entities[action.payload.id];
      return currentMetadata ? adapter.updateOne(
        {
          id: action.payload.id,
          changes: {
            importing: !action.payload.dryRun,
            previewing: action.payload.dryRun
          }
        },
        state
      ) : state;
  }

  return state;
}

export const getCurrentMetadataState = (state: State) => state.currentMetadata;
export const getCurrentMetadataItemState = (state: State) => state.currentMetadataItem;
