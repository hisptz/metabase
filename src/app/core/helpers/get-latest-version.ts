import * as _ from 'lodash';
export function getLatestVersion(versions: any[]): any {
  const sortedVersions = _.map(
    versions || [],
    versionObject => versionObject.version
  ).sort((a, b) => b - a);
  return sortedVersions[0];
}
