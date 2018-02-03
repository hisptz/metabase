import { Package } from '@app/core';

export interface PackageGroupVm {
  id: string | number;
  name: string;
  description: string;
  packages: Package[];
}
