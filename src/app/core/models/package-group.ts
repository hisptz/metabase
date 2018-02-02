export interface PackageGroup {
  id: string | number;
  name: string;
  description: string;
  packages: Array<string>;
}
