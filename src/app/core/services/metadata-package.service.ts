import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { map } from 'rxjs/operators';

@Injectable()
export class MetadataPackageService {
  constructor(private httpClient: HttpClientService) {
  }

  load(metadataPackageRepositoryUrl: string) {
    return this.httpClient.get(metadataPackageRepositoryUrl, false, true).pipe(map((res) => res.packages || []));
  }
}
