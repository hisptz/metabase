import { MetadataPackageVersion } from '@app/core';
import * as _ from 'lodash';

export function getVersionUrlFromVersionArray(versionArray: MetadataPackageVersion[], currentVersion: number) {
  const currentVersionObject: MetadataPackageVersion = _.find(
    versionArray,
    ['version', currentVersion.toString()]
  );

  return currentVersionObject ? currentVersionObject.href : '';
}
