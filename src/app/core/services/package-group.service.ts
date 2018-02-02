import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClientService } from './http-client.service';
@Injectable()
export class PackageGroupService {
  repoUrl: string;
  constructor(private httpClient: HttpClientService) {
    this.repoUrl =
      'https://raw.githubusercontent.com/hisptz/dhis2-metadata-repo/master/who.json';
  }

  loadPackageGroups() {
    return this.httpClient
      .get(this.repoUrl, false, true)
      .pipe(map(res => res.packageGroups || []));
  }
}
