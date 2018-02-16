import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClientService } from '@app/core';
import { map } from 'rxjs/operators';

@Injectable()
export class MetadataService {
  constructor(private httpClient: HttpClientService) {
  }

  getMetadata(metadataUrl: string): Observable<any> {
    return this.httpClient.get(metadataUrl, false, true);
  }

  importMetadata(dryRun: boolean, metadata: any): Observable<any> {
    return this.httpClient.post(
      `metadata?importMode=${dryRun ? 'VALIDATE' : 'COMMIT'}&strategy=CREATE_AND_UPDATE`,
      metadata);
  }
}
