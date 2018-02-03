import { createSelector } from '@ngrx/store';
import { selectPackageGroupState } from '../reducers';
import * as fromPackageGroup from '../reducers/package-group.reducer';

export const getPackageGroupEntities = createSelector(
  selectPackageGroupState,
  fromPackageGroup.selectPackageGroupEntities
);

export const getAllPackageGroups = createSelector(
  selectPackageGroupState,
  fromPackageGroup.selectAllPackageGroups
);
