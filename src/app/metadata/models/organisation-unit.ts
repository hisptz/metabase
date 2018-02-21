export interface OrganisationUnit {
  id: string;
  name: string;
  shortName: string;
  openingDate: string;
  code?: string;
  parent?: { id: string };
  children?: Array<{ id: string }>;
  description?: string;
  featureType?: string;
}
