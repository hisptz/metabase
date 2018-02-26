import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { tap, switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import * as _ from 'lodash';
import * as fromCore from '@app/core';
import * as fromRoot from '../../store/reducers';
import * as fromPackageGroupActions from '../actions/package-group.actions';
import * as fromPackageActions from '../actions/package.actions';
import * as fromMetadataPackageActions from '../actions/metadata-package.actions';
import * as fromAppPackageActions from '../actions/app-package.actions';
import * as fromResourcePackageAction from '../actions/package-resource.actions';

@Injectable()
export class PackageGroupEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.State>,
    private packageGroupService: fromCore.PackageGroupService
  ) {}

  @Effect()
  loadPackageGroups$ = this.actions$
    .ofType(fromPackageGroupActions.PackageGroupTypes.LOAD_PACKAGE_GROUPS)
    .pipe(
      switchMap((action: fromPackageGroupActions.LoadPackageGroupsAction) =>
        this.packageGroupService
          .loadPackageGroups()
          .pipe(
            map(
              (packageGroupsResponse: any[]) =>
                new fromPackageGroupActions.LoadPackageGroupsSuccessAction(
                  packageGroupsResponse
                )
            ),
            catchError(error =>
              of(new fromPackageGroupActions.LoadPackageGroupsFailAction())
            )
          )
      )
    );

  @Effect({ dispatch: false })
  loadPackageGroupSuccess$ = this.actions$
    .ofType(
      fromPackageGroupActions.PackageGroupTypes.LOAD_PACKAGE_GROUPS_SUCCESS
    )
    .pipe(
      tap((action: fromPackageGroupActions.LoadPackageGroupsSuccessAction) => {
        /**
         * Retrieve package groups and add them into the store
         */
        this.store.dispatch(
          new fromPackageGroupActions.AddPackageGroupsAction(
            _.map(action.payload, (packageGroup: any) => {
              return {
                id: packageGroup.id,
                name: packageGroup.name,
                description: packageGroup.description,
                packages: _.map(
                  packageGroup.packages || [],
                  (packageObject: any) => packageObject.id
                )
              };
            })
          )
        );

        /**
         * Retrieve all packages and add them into the store
         */
        const packages: any[] = _.filter(
          _.flatten(
            _.map(action.payload, (packageGroup: any) => packageGroup.packages)
          ),
          (packageObject: any) => packageObject
        );

        this.store.dispatch(
          new fromPackageActions.AddPackagesAction(
            _.map(packages, (packageObject: any) => {
              return {
                id: packageObject.id,
                name: packageObject.name,
                description: packageObject.description,
                icons: packageObject.icons,
                tags: packageObject.tags,
                metadataPackages: _.map(
                  packageObject.metadataPackages || [],
                  (metadataPackage: any) => metadataPackage.id
                ),
                apps: [],
                resources:  _.map(
                  packageObject.resources || [],
                  (resourcePackage: any) => resourcePackage.id
                )
              };
            })
          )
        );

        /**
         * Retrieve all metadata packages from package list and add them to the store
         */
        const metadataPackages: any[] = _.uniqBy(
          _.filter(
            _.flatten(
              _.map(
                packages,
                (packageObject: any) => packageObject.metadataPackages
              )
            ),
            (metadataPackage: any) => metadataPackage && metadataPackage.id
          ),
          'id'
        );

        this.store.dispatch(
          new fromMetadataPackageActions.AddMetadataPackagesAction(
            _.map(metadataPackages, (metadataPackage: any) => {
              return {
                id: metadataPackage.id,
                name: metadataPackage.name,
                description: metadataPackage.description,
                created: metadataPackage.created,
                lastUpdated: metadataPackage.lastUpdated,
                license: {
                  id: metadataPackage.license.id,
                  created: metadataPackage.license
                    ? metadataPackage.license.created
                    : '',
                  lastUpdated: metadataPackage.license
                    ? metadataPackage.license.lastUpdated
                    : '',
                  name: metadataPackage.license
                    ? metadataPackage.license.name
                    : '',
                  url: metadataPackage.license
                    ? metadataPackage.license.url
                    : ''
                },
                tags: metadataPackage.tags || [],
                icons: metadataPackage.icons || [],
                versions: _.map(
                  metadataPackage.versions || [],
                  (version: any) => {
                    return {
                      created: version.created,
                      lastUpdated: version.lastUpdated,
                      version: version.version,
                      url: version.href
                    };
                  }
                )
              };
            })
          )
        );

        /**
         * Retrieve all apps from package list and add them to the store
         */
        const apps: any[] = _.uniqBy(
          _.filter(
            _.flatten(
              _.map(packages, (packageObject: any) => packageObject.apps)
            ),
            (app: any) => app && app.id
          ),
          'id'
        );

        this.store.dispatch(
          new fromAppPackageActions.AddAppPackagesAction(
            _.map(apps, (app: any) => {
              return {
                id: app.id,
                name: app.name,
                description: app.description,
                appType: app.appType,
                owner: app.owner,
                developer: {
                  name: app.developer ? app.developer.name : undefined,
                  organisation: app.developer
                    ? app.developer.organisation
                    : undefined,
                  email: app.developer ? app.developer.email : undefined,
                  address: app.developer ? app.developer.address : undefined
                },
                versions: _.map(app.versions || [], (appVersion: any) => {
                  return {
                    minPlatformVersion: appVersion.minPlatformVersion,
                    maxPlatformVersion: appVersion.maxPlatformVersion,
                    downloadUrl: appVersion.downloadUrl,
                    demoUrl: appVersion.demoUrl,
                    version: appVersion.version
                  };
                })
              };
            })
          )
        );

        /**
         * Retrieve all resources from package list and add them to the store
         */
        const resources: any[] = _.uniqBy(
          _.filter(
            _.flatten(
              _.map(packages, (packageObject: any) => packageObject.resources)
            ),
            (resource: any) => resource && resource.id
          ),
          'id'
        );

        this.store.dispatch(
          new fromResourcePackageAction.AddPackageResourcesAction(
            _.map(resources, (resource: any) => {
              return {
                id: resource.id,
                name: resource.name,
                type: resource.type,
                url: resource.url,
                icon: fromCore.PACKAGE_RESOURCE_ICONS[resource.type]
              };
            })
          )
        );
      })
    );
}
