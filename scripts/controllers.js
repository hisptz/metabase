/* global angular */

'use strict';

/* Controllers */
var appControllers = angular.module('appControllers', [])

.controller('MainController', function($scope, $window, $q, ModalService, packageService, metadataService, $http) {

    $scope.loading = true;
    $scope.importSummary = false;
    $scope.importSuccess = false;
    $scope.expand = false;

    //@todo Waiting for update from oslo
    var groups = ['WHO', 'HISP', 'OSLO'];
    $scope.current_group = 'WHO';
    $scope.groups = groups;

    //set default group
    $scope.setCurrent = function(group) {
        $scope.current_group = group;
        $scope.importSummary = false;
        $scope.importSummary = false;
    }
    //get all packages from the repository
    var getAllPackages = function() {
        $scope.packages = {};
        packageService.all().success(function(data) {
            $scope.loading = false;
            var obtainedPackages = data.packages;

            //get metadata for each package

            angular.forEach(obtainedPackages, function(value, key) {
                getPackageMetadata(value.href).then(function(response){
                    obtainedPackages[key].metadata = response;
                    obtainedPackages[key].group = groups[key];
                    $scope.packages = obtainedPackages;

                }, function(error) {
                    //@todo
                    alert(error);
                });
            });

        }).error(function() {
            alert('error');
        })
    }

    var getPackageMetadata = function(href) {
        var deferred = $q.defer();
        var data = {};
        metadataService.getByUrl(href).success(function(metadata) {

            //Get count for every metadata
            angular.forEach(metadata, function(value, key){
                if (angular.isArray(value)) {
                    data[key] = value.length;
                }
            });

            deferred.resolve(data);

        }).error(function(error) {
            deferred.reject(error);
        });

        return deferred.promise;

    }

    $scope.previewOrImportPackage = function(action, packageId, packageHref) {
        $http.get(packageHref).then(function(response) {

            var data = response.data;
            var dryRun = true;

            if(action == 'import') {
                dryRun = false;
            }

            $http({
                url: '/api/metadata',
                method: 'POST',
                data: data,
                params: {'dryRun': dryRun, strategy: 'CREATE_AND_UPDATE'}
            }).then(function(response) {
                $scope.importCount = response.data.importCount;
                var summary = response.data.importTypeSummaries;
                $scope.importTypeSummaries = summary;
                compileImportConflicts(summary);
                $scope.currentPackage = packageId;
                $scope.importSuccess = true;

            }, function(error) {
                console.log(error)
            });

        }, function(error){
            console.log(error)
        });

    }

    $scope.showImportSummary = function() {
        $scope.importSummary = true;
    }

    var compileImportConflicts = function(data) {
        var conflicts = [];
        angular.forEach(data, function(value, key) {

            if(value.importConflicts != undefined) {
                angular.forEach(value.importConflicts, function(conflict, key) {
                    conflicts[key] = {
                        element: conflict.object,
                        description: conflict.value,
                        type: value.type
                    }
                });

            }
        });
        $scope.conflicts = conflicts;
    }

    $scope.importPackage = function(packageId) {

    }

    getAllPackages();

})
