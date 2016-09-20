/**
 * Created by rajab on 9/16/16.
 */
var mainServices = angular.module('mainServices', ['ngResource']);

mainServices.factory('packagesManager', ['$http','$q', function($http, $q)  {

    var packagesManager = {
        /**
         *
         * @returns {*}
         */
        getAllPackages: function() {

            var deferred = $q.defer();
            $http.get(dhis2.settings.baseUrl+'/../api/synchronization/metadataRepo')
                .then(function(packageData) {
                    //Get basic attribute from the package
                    var _packages = packageData.data.packages;
                    deferred.resolve(_packages);

                }, function(packageError) {
                    deferred.reject(packageError.status)
                });
            return deferred.promise;
        },
        /**
         *
         * @param metadataHref
         * @returns {*}
         */
        getPackageMetadata: function(metadataHref) {
            var _metadataArray = {};
            var deferred = $q.defer();
            $http.get(metadataHref)
                .then(function(metadata) {
                    //Get list of all metadata for this package
                    _metadataArray['metadataList'] =  metadata.data;
                    _metadataArray['metadataCount'] = packagesManager._getMetadataCounts(metadata.data);
                    deferred.resolve(_metadataArray);
                },function(error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        },
        _getMetadataCounts: function(metadata) {
            var _metadataCountArray = {};
            angular.forEach(metadata, function(metadataValue, metadataKey){
                if (angular.isArray(metadataValue)) {
                    _metadataCountArray[metadataKey] = metadataValue.length;
                }
            });
            return _metadataCountArray;
        },
        /**
         *
         * @param packageData
         * @returns {*}
         */
        saveOrUpdatePackage: function(packageData) {
            var _category = packageData.group;
            var _data = [packageData];
            var deferred = $q.defer();
            $http.get(dhis2.settings.baseUrl+'/../api/dataStore/metabaseApp/'+ _category)
                .then(function() {
                    //update package
                    $http.put(dhis2.settings.baseUrl+'/../api/dataStore/metabaseApp/'+ _category, _data)
                        .then(function(success) {
                            deferred.resolve(success)
                        }, function(error) {
                            deferred.reject(error)
                        });
                }, function() {
                    //save package
                    $http.post(dhis2.settings.baseUrl+'/../api/dataStore/metabaseApp/'+ _category, _data)
                        .then(function(success) {
                            deferred.resolve(success)
                        }, function(error) {
                            deferred.reject(error)
                        });
                });
            return deferred.promise;
        },
        loadPackagesByCategory: function(category)  {
            var deferred = $q.defer();
            $http.get(dhis2.settings.baseUrl+'/../api/dataStore/metabaseApp/' + category).then(function(response) {
                deferred.resolve(response.data);
            }, function(error) {
               deferred.reject(error);
            });
            return deferred.promise;
        },

        loadAllCategories: function() {

            var deferred = $q.defer();
            $http.get(dhis2.settings.baseUrl+'/../api/dataStore/metabaseApp').then(function(response) {
                deferred.resolve(response.data);
            }, function(error) {
                deferred.reject(error)
            });

            return deferred.promise;
        },

        importOrPeviewPackage: function(action, packageData) {
            var dryRun = true;
            var deferred = $q.defer();

            //change dry run if its import action
            if (action == 'import') {
                dryRun = false;
            }

            //Import the package with options provided
            $http({
                url: dhis2.settings.baseUrl+'/../api/metadata',
                method: 'POST',
                data: packageData,
                params: {'dryRun': dryRun, strategy: 'CREATE_AND_UPDATE'}
            }).then(function(response) {
                deferred.resolve(response.data);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        },
        /**
         * Compile summary generated after an import or preview import action
         * @param importSummary
         * @returns {Array}
         */
        compileImportConflicts: function(importSummary) {
            var conflicts = [];
            //Get conflict summary if exist
            angular.forEach(importSummary, function(summaryItem, summaryKey) {
                if(summaryItem.importConflicts != undefined) {
                    angular.forEach(summaryItem.importConflicts, function(conflict, summaryKey) {
                        conflicts[summaryKey] = {
                            element: conflict.object,
                            description: conflict.value,
                            type: summaryItem.type
                        }
                    });
                }
            });

            return conflicts;
        },

        getImportCountPerMetadata: function(summary) {
            var compiledImportCount = [];
            angular.forEach(summary, function(summaryItem, summaryKey) {
                compiledImportCount[summaryKey] = {
                    type: summaryItem.type,
                    count: summaryItem.importCount
                };
            });

            return compiledImportCount;
        }
    };

    return packagesManager;
}]);

