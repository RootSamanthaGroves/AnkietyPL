/**
 * Created by Dominika on 2017-03-20.
 */
angular.module('myApp').controller('UserController', function ($scope, $location, $resource, $http, $localStorage) {
      $scope.currentPath = $location.path();
});