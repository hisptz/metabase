import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClientService } from '@app/core';
@Injectable()
export class MetadataService {
  constructor(private httpClient: HttpClientService) {}

  getMetadata(metadataUrl: string): Observable<any> {
    return this.httpClient.get(metadataUrl, false, true);
  }
}
