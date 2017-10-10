/**
 * Created byDominika on 24.11.2016.
 */
angular.module('myApp').controller('SurveysController', function ($scope, $resource, $http, $rootScope, $routeParams, SurveyService) {
    $scope.message = 'Hello from PeopleController';
    $scope.survey;
    $scope.idSurvey;
    $scope.ankietka;
    $scope.questions;
    $scope.answer;
    $scope.question;
    var updateAnswer;

    $scope.testMessage = "banan";

    $scope.testowy = 56;
    $scope.items = [];
    $scope.selected = [];
    $scope.selectedQ = [];


    $('input[type=file]').change(function () {
        console.dir(this.files[0])
    })

    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
            console.log(item);
        }
        else {
            list.push(item);
        }
    };

    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };

    $scope.change = function (id) {
        $scope.selectSurvey = id;


        $http({
            method: 'GET',
            url: '/survey/id/' + id
        }).success(function (data) {
            $scope.selectTitle = data.title;
            $scope.status = "The Survey Deleted Successfully!!!";
        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person: ' + error.message;
            });

    };


    $scope.saveRelationsSurveyWithQuestions = function () {

        // console.log($scope.selectedQ.length + " ==> " + $scope.selectSurvey);


        var questionObject = {
            survey: $scope.selectSurvey,
            question: $scope.selectedQ

        };

        // alert(questionObject.question+" question     helo moto "+ questionObject.survey)

        $http.post('/survey/put/' + questionObject.survey, questionObject).success(function () { //wywloujemy
            // alert('Thanks'+$scope.selected);
            loadAllQuestionFromDb();


        }).error(function () {
            alert("nie udało się ")
        })
    };

    $scope.saveIdSurvey = function (id) {
        $scope.idSurvey = id;

    };


    $scope.saveRelations = function () {
        // alert($scope.selected + " " + $scope.question);
        console.log($scope.selected + " " + $scope.question);


        var questionObject = {
            question: $scope.question,
            answers: $scope.selected
        };

        // alert(questionObject.question+" question     answer "+ questionObject.answers)

        $http.post('/question/put/' + $routeParams.id, questionObject).success(function () { //wywloujemy
            // alert('Thanks'+$scope.selected);
            loadAllQuestionFromDb();


        }).error(function () {
            alert("nie udało się ")
        })
    };

    var loadAllQuestionFromDb = function () {
        var Survey = $resource('question/all', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });
        Survey.query(function (response) {
            $scope.questions = response;
            // console.log("LoadAllQuestions -> "+$scope.questions);
        });
    };
    loadAllQuestionFromDb();


    var loadAllAnswersFromDb = function () {
        var Survey = $resource('answer/all', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });
        Survey.query(function (response) {
            $scope.answer = response;
            // console.log("LoadAllAnswers -> "+$scope.answer);
        });
    };
    loadAllAnswersFromDb();


    $scope.loadAllSurveyFromDb = function () {
        var Survey = $resource('survey/all', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });

        Survey.query(function (response) {
            $scope.survey = response;
            $scope.selectSurvey = $scope.survey[$scope.survey.length - 1].id;
            $scope.selectTitle = $scope.survey[$scope.survey.length - 1].title;
        });
    };
    $scope.loadAllSurveyFromDb();


    $scope.loadAllSurvey = function (id) {
        $scope.idSurvey = id;

        SurveyService
            .loadAllSurvey()
            .then(function (response) {
                if (response.status == 200) {
                    $rootScope.ankietka = response.data;

                    console.log($scope.ankietka);

                } else {
                    console.log($scope.ankietka + " zaladowano ankiety");
                }
            })
    };


    $scope.delete = function (id) {
        SurveyService
            .deleteSurvey(id)
            .then(function (response) {
                if (response.status == 200) {
                    $rootScope.ankietka = response.data;
                    console.log($scope.ankietka);
                    SurveyService.loadAllSurvey().then(function (response2) {
                        if (response2 === 200) {
                            $rootScope.ankietka = response2.data;
                            console.log("udało sie");
                            window.location.reload(false);
                            // $route.reload();
                        }
                    })
                } else {
                    SurveyService.loadAllSurvey().then(function (response2) {
                        if (response2 === 200) {
                            $rootScope.ankietka = response2.data;
                            console.log("udało sie");
                            window.location.reload(false);
                        }
                    })
                    window.location.reload(false);
                    console.log($rootScope.ankietka + " zaladowano ankiety");
                }
            })
    };

    $scope.deleteAnswer = function (Id) {
        $http({
            method: 'DELETE',
            url: '/answer/delete/id/' + Id
        }).success(function (data) {
            //Showing Success message
            // $scope.status = "The Survey Deleted Successfully!!!";
            // alert('Delete User');
            // loadAllAnswersFromDb();
        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person: ' + error.message;
            });
    }

    $scope.showQuestion = function (id) {


        $http({
            method: 'GET',
            url: '/question/id/' + id
        }).success(function (data) {
            //Showing Success message
            $scope.status = "The Survey Deleted Successfully!!!";
            $rootScope.updateQuestion = data.question;
            $rootScope.idquestion = data.id;
            loadAllQuestionFromDb();
        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person: ' + error.message;
            });
    }
    $rootScope.showAnswer = function (id) {


        $http({
            method: 'GET',
            url: '/answer/id/' + id
        }).success(function (data) {
            $scope.status = "The Survey Deleted Successfully!!!";
            $rootScope.updateAnswer = data.answer;
            $rootScope.idanswer = data.id;
        })
            .error(function (error) {
                //Showing error message
                $scope.status = 'Unable to delete a person: ' + error.message;
            });
    }

    $scope.editAnswer = function () {


        var answerObj;
        var ans = $scope.updateAnswer;
        console.log(ans);
        answerObj = {
            id: $rootScope.idanswer,
            answer: ans
        };
        console.log(ans + ' ' + $scope.idanswer);
        $http({
            method: 'POST',
            url: 'answer/update/',
            data: answerObj
        }).success(function (data) {
            // $scope.me = data; // widoku będziesz używał teraz people
            console.log(data);
        }).error(function (error) {
            //Showing error message
            $scope.status = 'Unable to delete a person:';
        });
        loadAllAnswersFromDb();
        loadAllQuestionFromDb();


    };


    $scope.deleteQuestion = function (Id) {
        console.log("poczatek");
        $http({
            method: 'DELETE',
            url: '/question/delete/id/' + Id
        }).success(function (data) {
            //Showing Success message
            console.log("banan");
            $scope.status = "The Survey Deleted Successfully!!!";
            loadAllQuestionFromDb();
        })
            .error(function (error) {
                console.log("banana error");
                //Showing error message
                $scope.status = 'Unable to delete a question: ' + error.message;
            });
    }

    $scope.editQuestion = function (Id, text) {


        var questionObj;
        var quest = $scope.updateQuestion;
        //  console.log(ans);
        questionObj = {
            id: $rootScope.idquestion,
            question: quest
        };
              $http({
            method: 'POST',
            url: 'question/update/',
            data: questionObj
        }).success(function (data) {
            loadAllQuestionFromDb();
            console.log(data);
        }).error(function (error) {
            //Showing error message
            $scope.status = 'Unable to delete a person:';
        });



    };


    $scope.saveSurvey = function () {
        var title = $scope.titleOfSurvey; //pobieramy imie z pola w html
        var titleObj = {
            title: title
        };
        $http.post('/survey/add', titleObj).success(function () { //wywloujemy
            // $rootScope.loadAllSurveyFromDb();
            window.location.reload(false);

        }).error(function () {
            alert('We have problem!');
        })
    };

    $scope.loadOneSurvey = function (id) {
        $scope.idSurvey = id;

        SurveyService
            .findOneSurvey(id)
            .then(function (response) {
                if (response.status == 200) {
                    $rootScope.ankietka = response.data;

                    console.log($scope.ankietka);

                } else {
                    console.log($scope.ankietka + " sdasdsa");
                }
            })
    };

    $scope.saveQuestion = function () {
        var Question = $scope.questionOfSurvey;
        // alert($scope.questionOfSurvey);
        var questionObject = {
            question: Question
        };
        $http.post('/question/add', questionObject).success(function () { //wywloujemy
            loadAllQuestionFromDb();
        }).error(function () {
            alert('We have problem2!');
        })
    };

    $scope.saveAnswer = function () {
        var Answer = $scope.answerOfSurvey;
        // alert($scope.answerOfSurvey);
        var answerObject = {
            answer: Answer
        };
        $http.post('/answer/add', answerObject).success(function () { //wywloujemy
            // alert('Thanks');
            loadAllAnswersFromDb();
        }).error(function () {
            alert('We have problem2!');
        })
    };


    $scope.selectQ = function (id) {
        $scope.question = 0;
        $scope.question = id;
        $routeParams.id = id;
    };


})
;