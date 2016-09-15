/* global angular */

'use strict';

/* Services */

var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('packageService', function($http) {
    return {
        all: function() {
            return $http.get(dhis2.settings.baseUrl+'/../api/synchronization/metadataRepo');
        }
    }
});

appServices.factory('metadataService', function($http) {
    return {
      getByUrl: function(href) {
          return $http.get(href);
      }
    }
})
