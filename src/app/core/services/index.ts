import { CurrentUserService } from './current-user.service';
import { ManifestService } from './manifest.service';
import { HttpClientService } from './http-client.service';
import { MetadataPackageRepositoryService } from './metadata-package-repository.service';
import { MetadataPackageService } from '@app/core/services/metadata-package.service';

export const services: any[] = [
  ManifestService,
  HttpClientService,
  CurrentUserService,
  MetadataPackageRepositoryService,
  MetadataPackageService
];

export * from './http-client.service';
export * from './manifest.service';
export * from './current-user.service';
export * from './metadata-package-repository.service';
export * from './metadata-package.service';
