import { MetadataPackageLicense } from './metadata-package-license';
import { MetadataPackageVersion } from './metadata-package-version';

export interface MetadataPackage {
  id: string;
  name: string;
  description: string;
  created: string;
  lastUpdated: string;
  license: MetadataPackageLicense;
  status?: string;
  owner?: string;
  tags: Array<string>;
  icons: Array<{ [size: number]: string }>;
  versions: MetadataPackageVersion[];
}
