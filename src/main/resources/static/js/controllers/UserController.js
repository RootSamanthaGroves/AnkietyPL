/**
 * Created by Dominika on 2017-03-20.
 */
angular.module('myApp').controller('UserController', function ($scope, $location, $resource, $http, $localStorage) {
    $scope.message = 'Hello  my frienxds';
    $scope.currentPath = $location.path();
});