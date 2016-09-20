/**
 * Created by rajab on 9/16/16.
 */
'use strict';
var  mainController = angular.module('mainController', []);

mainController.controller('homeController', ['$scope','$rootScope','$location','packagesManager', function($scope, $rootScope,$location, packagesManager) {

    var groups = ['WHO', 'HISP', 'OSLO'];
    $rootScope.showNav = false;
    $scope.welcomeNotification = 'Loading packages.....';

    packagesManager.getAllPackages().then(function(packages) {
        $scope.welcomeNotification = 'Fetching metadata from remote repositories...';
        //Save the package to data store
        var packageCount = packages.length;
        var initCount = 0;
        angular.forEach(packages, function(packageItem, packageKey) {
            //@todo
            packageItem.group = groups[packageKey];
            //get metadata
            packagesManager.getPackageMetadata(packageItem.href)
                .then(function(metadataResponse){
                    packageItem.metadata = metadataResponse;
                    $scope.welcomeNotification = 'Synchronizing with local store.....';
                    packagesManager.saveOrUpdatePackage(packageItem)
                        .then(function(success) {
                            $scope.welcomeNotification = 'local store updated';
                            initCount++;

                            if(initCount == packageCount) {
                                $location.path('/packages/' + packageItem.group);
                            }
                        }, function(error) {
                        })
                }, function(metadataError) {
                    //@todo
                });
        });
    }, function(error) {
        console.log(error);
    });

}]);



