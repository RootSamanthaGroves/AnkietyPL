/**
 * Created by Dominika on 2017-03-25.
 */


angular.module('myApp').controller('AnalysisController', function ($scope, $resource, $http, $rootScope, $routeParams) {
        $scope.message = 'Hello from AnalysisController';
        $scope.survey;
        $scope.path;
        $scope.rules="";
        $scope.TaRules;
        var rulesOBJ;



    $scope.loadAllRules = function () {
        var Rules = $resource('analysis/rules', {}, {
            query: {method: 'get', isString: true, cancellable: true}
        });

        Rules.query(function (response) {
            $scope.rules = response;
             console.log("Load -> "+$scope.rules);
        });
    };





        $scope.showRules = function () {
            $http({
                method: 'GET',
                url: 'analysis/rules/',
                 dataType: "Object"
            }).success(function (data) {

                alert(data);
                var rulesObj = {
                    r: data

                };
                $scope.rules=rulesObj;
                alert(rulesObj+'udało się');

            })
                .error(function (error) {
                    $scope.rules="nie ma nic";

                });
        }



    }
);