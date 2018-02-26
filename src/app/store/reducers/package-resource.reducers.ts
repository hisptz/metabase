import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { PackageResourceAction, PackageResourceActionTypes } from '../actions/package-resource.actions';
import { PackageResource } from '../../core/models/package-resource';

export interface State extends EntityState<PackageResource> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<PackageResource> = createEntityAdapter<PackageResource>();

const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: true
});

export function reducer(state: State = initialState, action: PackageResourceAction): State {
  switch (action.type) {
    case PackageResourceActionTypes.ADD_PACKAGE_RESOURCES:
      return adapter.addAll(action.packageResources, state);
  }
  return state;
}
