import {MetadataDependency} from "./metadata-dependency";
export interface Metadata {
  id: string;
  name: string;
  code: string;
  created: string;
  lastUpdated: string;
  available: boolean;
  dependencies: Array<MetadataDependency>;
  originalVersion: any;
  importableVersion: any;
}
