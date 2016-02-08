'use strict';
var app = angular.module('CarpeDiem', ['ngRoute', 'ngCookies']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'partials/main.html',
            controller: 'MainCtl'
        }).
        when('/config', {
            templateUrl: 'partials/birthday.html',
            controller: 'ConfigCtl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]
);

app.controller('MainCtl', function($scope, $http, $location, $cookies) {
    $scope.birthdayString = $cookies.get('brithdayString');
    if($scope.birthdayString === undefined) {
        $location.path("/config");
    }
    $scope.weeksLived = 0;
    var date = String($scope.birthdayString).split('/');
    var birthdate = new Date(date[2], date[1], date[0]);
    var todaydate = new Date();
    var diff = Math.abs(todaydate.getTime() - birthdate.getTime());
    diff = Math.ceil(diff / (1000 * 3600 * 24 * 7));
    $('.dots__item:lt(' + diff + ')').addClass('dots__item--full')


    $scope.updateMovie = function(movieId) {

    }
});

app.controller('ConfigCtl', function($scope, $http, $location, $cookies) {
    $scope.birthdayString = "";

    $scope.submitHandler = function(keyEvent) {
        if (keyEvent.which === 13) {
            $cookies.put('brithdayString', $scope.birthdayString);
            $location.path("/");
        }
    }

});

