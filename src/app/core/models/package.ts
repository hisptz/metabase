export interface Package {
  id: string;
  name: string;
  description: string;
  icons: { [size: number]: string };
  tags: Array<string>;
  metadataPackages?: Array<string>;
  apps?: Array<string>;
  resources?: Array<string>;
}
