// create the module and name it scotchApp
var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngStorage']);

myApp.config(function ($routeProvider) {
    $routeProvider

        .when('/sign', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
        })
        .when('/', {
            templateUrl: 'views/content.html',
            controller: 'SurveysController'
        })
        .when('/survey', {
            templateUrl: 'views/survey.html',
            controller: 'SurveysController'
        })
        .when('/user/account', {
            templateUrl: 'views/user-account.html',
            controller: 'AccountController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/user', {
            templateUrl: 'views/user.html',
            controller: 'UserController'
        })
        .when('/message', {
            templateUrl: 'views/message.html',
            controller: 'SendMessageController'
        })
        .when('/analisys', {
            templateUrl: 'views/analisys.html',
            controller: 'AnalysysController'
        })
        .when('/oneSurvey', {
            templateUrl: 'views/oneSurvey.html',
            controller: 'OneSurveyController'
        })

        .when('/createSurvey', {
            templateUrl: 'views/createSurvey.html',
            controller: 'SurveysController'
        })

        .when('/test', {
            templateUrl: 'views/test.html',
            controller: 'TestController'
        })

        .otherwise({redirectTo: '/'});
});


