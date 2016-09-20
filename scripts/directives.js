'use strict';

/* Directives */

var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('appIcon', function() {
    return {
        restrict: 'E',
        scope: {
            title: '='
        },
        template: '<span class="badge folder-icon">' +
                  '<span>{{title}}</span>' +
                  '</span>'
    }
});
