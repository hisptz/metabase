import { MetadataPackageEffects } from './metadata-package.effects';
import { PackageEffects } from './package.effects';
import { PackageGroupEffects } from './package-group.effects';
import { CurrentUserEffects } from './current-user.effects';
import { RouterEffects } from './router.effects';

export const effects: any[] = [
  CurrentUserEffects,
  RouterEffects,
  PackageGroupEffects,
  PackageEffects,
  MetadataPackageEffects
];

export * from './current-user.effects';
export * from './router.effects';
export * from './package-group.effects';
export * from './package.effects';
export * from './metadata-package.effects';
