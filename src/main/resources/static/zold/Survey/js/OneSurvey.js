// /**
//  * Created by Dominika on 2017-05-13.
//  */
//
//
//
// angular.module('myApp').controller('OneSurveysController', function ($scope, $resource, $http, $rootScope, $routeParams, SurveyService) {
//     $scope.message = 'Hello from PeopleController';
//     $scope.survey;
//     $scope.idSurvey;
//     $scope.ankietka;
//     $scope.questions;
//     $scope.answer;
//     $scope.question;
//
//     $scope.testMessage = "banan";
//
//     $scope.testowy = 56;
//     $scope.items = [];
//     $scope.selected = [];
//
//
//
//     var loadAllQuestionFromDb = function () {
//         var Survey = $resource('question/all', {}, {
//             query: {method: 'get', isArray: true, cancellable: true}
//         });
//         Survey.query(function (response) {
//             $scope.questions = response;
//             // console.log("LoadAllQuestions -> "+$scope.questions);
//         });
//     };
//     loadAllQuestionFromDb();
//
//
//     var loadAllAnswersFromDb = function () {
//         var Survey = $resource('answer/all', {}, {
//             query: {method: 'get', isArray: true, cancellable: true}
//         });
//         Survey.query(function (response) {
//             $scope.answer = response;
//             // console.log("LoadAllAnswers -> "+$scope.answer);
//         });
//     };
//     loadAllAnswersFromDb();
//
//
//     $rootScope.loadAllSurveyFromDb = function () {
//         var Survey = $resource('survey/all', {}, {
//             query: {method: 'get', isArray: true, cancellable: true}
//         });
//
//         Survey.query(function (response) {
//             $scope.survey = response;
//         });
//     };
//     $rootScope.loadAllSurveyFromDb();
//
//     $scope.loadAllSurveyFromDb = function () {
//         var Survey = $resource('survey/all', {}, {
//             query: {method: 'get', isArray: true, cancellable: true}
//         });
//
//         Survey.query(function (response) {
//             $scope.survey = response;
//             // console.log("LoadAllSurveys -> "+$scope.survey);
//         });
//     };
//     $scope.loadAllSurveyFromDb();
//
//
//
//
//     $scope.showQuestion = function (id) {
//
//
//         $http({
//             method: 'GET',
//             url: '/survey/id/' + id
//         }).success(function (data) {
//             //Showing Success message
//             $scope.status = "The Survey Deleted Successfully!!!";
//             alert('Pobieranie jednej ankiety');
//
//         })
//             .error(function (error) {
//                 //Showing error message
//                 $scope.status = 'Unable to delete a person: ' + error.message;
//             });
//     }
//     $rootScope.showAnswer = function (id) {
//
//
//         $http({
//             method: 'GET',
//             url: '/answer/id/' + id
//         }).success(function (data) {
//             $scope.status = "The Survey Deleted Successfully!!!";
//             alert('Pobieranie jednej odpoweidzi');
//
//         })
//             .error(function (error) {
//                 //Showing error message
//                 $scope.status = 'Unable to delete a person: ' + error.message;
//             });
//     }
//
//
//
//     $scope.loadOneSurvey = function () {
//         $scope.idSurvey = 1;
//         alert("" + $scope.idSurvey);
//         SurveyService
//             .findOneSurvey(1)
//             .then(function (response) {
//                 if (response.status == 200) {
//                     $rootScope.ankietka = response.data;
//
//                     console.log($scope.ankietka);
//
//                 } else {
//                     console.log($scope.ankietka + " sdasdsa");
//                 }
//             })
//     };  $scope.loadOneSurvey;
//
//
// })
// ;