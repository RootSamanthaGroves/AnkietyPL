/**
 * Created by Dominika on 2017-05-15.
 */
angular.module('myApp').controller('DataController', function ($scope, $resource, $http) {
    $scope.message = 'Hello from PeopleController';
    $scope.user;
    $scope.firstname;
    $scope.lastname;
    $scope.rules = [];



    $scope.loadRules = function (path) {

        // alert("test");
        rules = $resource('analysis/rules', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });

        rules.query(function (response) {
            $scope.rulesweka=response;
            alert(response); //teraz w response masz to co bys widzial w postmanie takiego jsona
             // $scope.rules = response; // widoku będziesz używał teraz people
        });

    };

    $scope.showData = function () {

        alert("data");
        data = $resource('analysis/showdata', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });

        data.query(function (response) {
            $scope.dataweka=response;
            alert(response);
            console.log(response);

        });

    };


});