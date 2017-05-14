/**
 * Created by Dominika on 2017-05-12.
 */
angular.module('myApp').service('LoginService', function ($http) {

    this.createUser = function (user) {
        var data = 'username=' + user.username + '&password=' + user.password + user.email;
        return $http({
            method: "POST",
            url: 'authenticate',
            data: data,
            ignoreAuthModule: 'ignoreAuthModule',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            return response.status;
        });
    };

    this.login = function (userLoginAndPassword) {
        var data = 'username=' + userLoginAndPassword.username + '&password=' + userLoginAndPassword.password;
        return $http({
            method: "POST",
            url: 'authenticate',
            data: data,
            ignoreAuthModule: 'ignoreAuthModule',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            return response.status;
        });
    };

    this.getCurrentUser = function () {
        var url = 'user/current';
        return $http({
            method: "GET",
            url: url
        }).then(function successCallback(response) {

            return response;
        }, function errorCallback(response) {
            return response.status;
        });
    };

    this.logoutUser = function () {
        var url = '/logout';
        return $http({
            method: "GET",
            url: url
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(response) {
            return response.status;
        });
    };
});