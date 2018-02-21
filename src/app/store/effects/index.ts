import {CurrentUserEffects} from './current-user.effects';
import {RouterEffects} from './router.effects';
import { MetadataPackageRepositoryEffects } from './metadata-package-repository-effects';
import { MetadataPackageEffects } from './metadata-package.effects';

export const effects: any[] = [CurrentUserEffects, RouterEffects, MetadataPackageRepositoryEffects, MetadataPackageEffects];

export * from './current-user.effects';
export * from './router.effects';
export * from './metadata-package-repository-effects';
export * from './metadata-package.effects';
