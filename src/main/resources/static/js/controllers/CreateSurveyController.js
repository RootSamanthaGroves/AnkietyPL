/**
 * Created by Dominika on 2017-01-08.
 */

angular.module('myApp').controller('CreateSurveyController', function ($scope, $resource, $http) {
        $scope.message = 'Create Survey';





    $scope.saveSurvey = function () {
        var Title = $scope.titleOfSurvey;
        alert(Title);
        $scope.saveQuestion();

        var surveyObject = {
            title: Title
        };


        $http.post('/survey/add', surveyObject).success(function () { //wywloujemy
            alert('Thanks');
            // $scope.$emit("myEvent");

        }).error(function () {
            alert('We have problem!');
        })
    };


});