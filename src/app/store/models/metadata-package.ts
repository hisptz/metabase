import {PackageLicense} from "./package-license";
import {PackageVersion} from "./package-version";
export interface MetadataPackage {
  id:  string;
  name: string;
  organization: string;
  description: string;
  url: string;
  icons: any[];
  license: PackageLicense;
  tags: any[];
  versions: PackageVersion[];
}
