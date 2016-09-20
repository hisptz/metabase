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
    .filter('abbreviate', function() {

        return function(title) {
            var abbr = [];
            var  i = 0;
            for (var n in title) {
                if(n == 0) {
                    abbr[i] = title[n].toUpperCase();
                    i++;
                } else {
                    if(title[n] == ' ') {
                        n++;
                        abbr[i] = title[n].toUpperCase();
                        break;
                    }
                }
            }

            return abbr.join('');

        }
    });
