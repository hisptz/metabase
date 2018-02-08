import { MetadataPackage } from '@app/core';
export interface PackageVm {
  id: string;
  name: string;
  description: string;
  icons: { [size: number]: string };
  tags: Array<string>;
  metadataPackages?: MetadataPackage[];
  apps?: Array<string>;
  resources?: Array<string>;
}
