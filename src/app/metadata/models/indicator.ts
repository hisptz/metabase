export interface Indicator {
  id: string;
  name: string;
  shortName: string;
  indicatorType: { id: string };
  numerator: string;
  denominator: string;
  annualized: string;
  description?: string;
  numeratorDescription?: string;
  denominatorDescription?: string;
  code?: string;
}
