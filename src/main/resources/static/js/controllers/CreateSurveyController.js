/**
 * Created by Dominika on 2017-01-08.
 */

angular.module('myApp').controller('CreateSurveyController', function ($scope, $resource, $http) {
        $scope.message = 'Create Survey';


    // $scope.showMe = true;
    // $scope.showMeAnswer = true;


    // $scope.getNumber = function (num) {
    //     return new Array(num);
    // }
    //
    //
    // $scope.setNumber = function () {
    //     $scope.showMe = true;
    // };
    //
    //
    // $scope.getNumberAnswer = function (i) {
    //     return new Array(i);
    // };
    //
    //
    // $scope.setNumberAnswer = function () { alert(i);
    //     $scope.showMeAnswer = true;
    //     var i = $scope.answerOfQuestion; //pobieramy imie z pola w html
    //     alert(i);
    // };


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