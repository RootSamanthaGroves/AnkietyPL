/**
 * Created by Dominika on 2017-05-15.
 */
angular.module('myApp').controller('DataController', function ($scope, $resource, $http, $rootScope, $routeParams, SurveyService) {
        $scope.message = 'Hello from PeopleController';
        $scope.user;
        $scope.firstname;
        $scope.lastname;
        $scope.rules = [];

        var zmiana = function (id) {
            $scope.selectAtribute = id;
        }


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


        // $('select').on('change', function () {
        //
        //     var isDirty = !this.options[this.selectedIndex].selectAtribute;
        //
        //     if (isDirty) {
        //         $scope.showStatistic();
        //
        //     } else {
        //
        //
        //     }
        // });


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

            // alert("test");
            rules = $resource('analysis/rules', {}, {
                query: {method: 'get', isArray: true, cancellable: true}
            });

            rules.query(function (response) {
                $scope.rulesweka = response;
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
                $scope.dataweka = response;

                console.log(response);

            });

        };

    $scope.change = function(id) {
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