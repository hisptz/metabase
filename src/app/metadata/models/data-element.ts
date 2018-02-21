import { CategoryCombo } from './category-combo';
export interface DataElement {
  id: string;
  name: string;
  shortName: string;
  aggregationType: string;
  domainType: string;
  valueType: string;
  zeroIsSignificant: boolean;
  categoryCombo: { id: string };
  description?: string;
  code?: string;
}
