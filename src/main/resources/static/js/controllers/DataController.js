/**
 * Created by Dominika on 2017-05-15.
 */
angular.module('myApp').controller('DataController', function ($scope, $resource, $http, $rootScope, $routeParams, SurveyService) {
        $scope.message = 'Hello from PeopleController';
        $scope.user;
        $scope.firstname;
        $scope.lastname;
        $scope.rules = [];
        $scope.minUfnosc = [];


        var minUfnosc = function () {

            for (i = 4; i < 10; i = i + 5 / 10) {
                $scope.minUfnosc.push(i / 10);
                console.log(i);
            }
        };
        minUfnosc();


        $scope.loadAllSurveyFromDb = function () {
            var Survey = $resource('survey/all', {}, {
                query: {method: 'get', isArray: true, cancellable: true}
            });

            Survey.query(function (response) {
                $scope.survey = response;
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


        $scope.loadOneSurvey = function (id) {
            $scope.idSurvey = id;

            SurveyService
                .findOneSurvey(id)
                .then(function (response) {
                    if (response.status == 200) {
                        $rootScope.ankietka = response.data;


                        $scope.selectAtribute = $scope.ankietka.question.length;
                        $scope.showStatistic();

                    } else {
                        console.log($scope.ankietka + " sdasdsa");
                    }
                })
        };

        $scope.loadRules = function (path) {

            // @param n    Liczba regul do policzenia (standardowo: 10)
            //* @param c    Minmalna ufnosc reguly (standardowo: 0.9).
            var x = document.getElementById("ufnosc").value;
            // console.log(x + " " + $scope.liczbaRegul);
            rules = $resource('analysis/rules/'+x+"/"+$scope.liczbaRegul    , {}, {
                query: {method: 'get', isArray: true, cancellable: true}
            });

            rules.query(function (response) {
                $scope.rulesweka = response;
                // alert(response); //teraz w response masz to co bys widzial w postmanie takiego jsona
                // $scope.rules = response; // widoku będziesz używał teraz people
            });

        };
        $scope.showData = function () {

            alert("data");
            data = $resource('analysis/showdata', {}, {
                query: {method: 'get', isArray: true, cancellable: true}
            });

            data.query(function (response) {
                $scope.dataweka = response;

                console.log(response);

            });

        };

        $scope.change = function (id) {
            $scope.showStatistic();
            console.log(id);
        };


        $scope.showStatistic = function () {

            data = $resource('analysis/statystic/' + $scope.selectAtribute, {}, {
                query: {method: 'get', isArray: true, cancellable: true}
            });


            data.query(function (response) {


                    var atributes = [];

                    for (i = 0; i < response.length; i++) {
                        atributes.push({
                            lable: response[i][0],
                            value: Number(response[i][1])
                        });
                    }


                    var chart = AmCharts.makeChart("chartdiv", {
                        "type": "pie",
                        "theme": "none",
                        "innerRadius": "40%",
                        "gradientRatio": [-0.4, -0.4, -0.4, -0.4, -0.4, -0.4, 0, 0.1, 0.2, 0.1, 0, -0.2, -0.5],
                        "dataProvider": atributes,
                        "balloonText": "[[value]]",
                        "valueField": "value",
                        "titleField": "lable",
                        "balloon": {
                            "drop": true,
                            "adjustBorderColor": false,
                            "color": "#FFFFFF",
                            "fontSize": 16
                        },
                        "export": {
                            "enabled": true
                        }
                    });

                    console.log(chart);
                }
            );

        };


    }
);