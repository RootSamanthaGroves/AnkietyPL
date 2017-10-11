// create the module and name it scotchApp
var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngStorage']);

myApp.config(function ($routeProvider) {
    $routeProvider

        .when('/register', {
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
        .when('/data', {
            templateUrl: 'views/data.html',
            controller: 'DataController'
        })
        .when('/oneSurvey', {
            templateUrl: 'views/oneSurvey.html',
            controller: 'OneSurveyController'
        })

        .when('/createSurvey', {
            templateUrl: 'views/createSurvey.html',
            controller: 'SurveysController'
        })

                //     .when('/analisys', {
                //     templateUrl: 'views/analisys.html',
                //     controller: 'AnalisysController'
                // })
        .otherwise({redirectTo: '/'});



});


