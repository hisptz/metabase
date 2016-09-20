/**
 * Created by rajab on 9/16/16.
 */
'use strict';
var packagesController = angular.module('packagesController', []);

packagesController.controller('packageController', ['$scope','$rootScope','$routeParams', 'packagesManager', function($scope, $rootScope, $routeParams, packagesManager) {
    $rootScope.showNav = true;
    $scope.showMetadataSummary = false;
    $scope.showPackages = true;
    $scope.isImporting = false;
    $scope.showImportSummary = false;
    $scope.showDetails = false;
    var categoryName = $routeParams.category;

    //Get list of all categories
    packagesManager.loadAllCategories().then(function(categories) {
        $scope.categories = categories;
    }, function(error) {
        //@todo
    });

    //Load all packages for current category
    packagesManager.loadPackagesByCategory(categoryName).then(function(packageData) {
        $scope.packages = packageData;
    }, function(error) {
        //@todo
    });

    //Preparing for import or preview
    $scope.initializePreviewOrImport = function(action, packageData) {
        $scope.showPackages = false;
        $scope.isImporting = true;
        $scope.progressValue = 40;
        $scope.importProgressMessage = 'Loading package metadata from remote repository...';
       //@todo load package from remote repository to prepare for import
       packagesManager.getPackageMetadata(packageData.href).then(function(response) {
           $scope.progressValue = 60;
           $scope.importProgressMessage = 'Importing metadata.....';
           var metadata = response.metadataList;
           packagesManager.importOrPeviewPackage(action, metadata).then(function(response) {
               $scope.progressValue = 100;
               $scope.importProgressMessage = 'Package metadata imported successfully';
               $scope.showImportSummary = true;
               $scope.overallImportCounts = response.importCount;
               $scope.importCountsPerMetadata = packagesManager.getImportCountPerMetadata(response.importTypeSummaries);
               $scope.importConflicts = packagesManager.compileImportConflicts(response.importTypeSummaries);
           }, function(error) {
            //@todo
           });
       })
    }

    $scope.closeImportSummary = function() {
        $scope.isImporting = false;
        $scope.showPackages = true;
    }
    $scope.closeMetadataDetails = function() {
        $scope.showDetails = false;
        $scope.showPackages = true;
    }

    $scope.showMetadataDetails = function (metadataDetails) {
        $scope.metadataDetails = metadataDetails;
        $scope.showDetails = true;
        $scope.showPackages = false;

    }

}]);
