'use strict';

/* App Module */

var app = angular.module('app',
                    ['ui.bootstrap', 
                     'ngRoute', 
                     'ngCookies', 
                     'ngSanitize',
                     'appDirectives', 
                     'metabaseControllers',
                     'metabaseServices',
                     'appFilters',
                     'd2Services',
                     'd2Controllers',
                     'pascalprecht.translate',
                     'd2HeaderBar',
                        'angular-spinkit'
                    ])
              
.value('DHIS2URL', dhis2.settings.baseUrl)

.config(function($translateProvider,$routeProvider) {
	
	$routeProvider
        .when('/', {
        templateUrl: 'views/index.html',
        controller: 'homeController'
        })
        .when('/packages/:category', {
            templateUrl: 'views/home.html',
            controller: 'packageController'
        })
        .when('/:category/:packageId/import-preview', {
            templateUrl: 'views/import-progress.html',
            controller: 'previewController'
        })
        .otherwise({
        redirectTo : '/'
    });
     
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escaped');
    $translateProvider.useLoader('i18nLoader');
});
