'use strict';

/* Filters */

var appFilters = angular.module('appFilters', []);

appFilters.filter('readableMetadata', function() {
    return function(name) {
        var readableName = [];
        var i = 0;
        angular.forEach(name, function(value, index) {
            if(index == 0) {
                readableName[i] = value.toUpperCase();
                i++;
            } else {
                if(value == value.toUpperCase()) {
                    readableName[i] = ' ';
                    i++;
                    readableName[i] = value.toLowerCase();
                    i++;

                } else{
                    readableName[i] = value;
                    i++;
                }

            }

        });
        return readableName.join("");
    }
})
