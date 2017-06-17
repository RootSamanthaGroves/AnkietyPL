/**
 * Created by Dominika on 2017-05-15.
 */
angular.module('myApp').controller('DataController', function ($scope, $resource, $http, $rootScope, $routeParams, SurveyService) {
        $scope.message = 'Hello from PeopleController';
        $scope.user;
        $scope.firstname;
        $scope.lastname;
        $scope.rules = [];

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

                        console.log($scope.ankietka);

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
                alert(response);
                console.log(response);

            });

        };
        $scope.showStatistic = function () {

            data = $resource('analysis/statystic/' +  $scope.selectAtribute, {}, {
                query: {method: 'get', isArray: true, cancellable: true}
            });


            data.query(function (response) {
                $scope.statictic = response;
                alert("statictic" + $scope.selectAtribute);
                data = $resource('analysis/statystic/' + $scope.selectAtribute, {}, {
                    query: {method: 'get', isArray: true, cancellable: true}
                });

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
            });

        };


    }




//wykres kolowy

    //
    // var chartData = generateChartData();
    //
    // function generateChartData() {
    //     var chartData = [];
    //     var firstDate = new Date(2012, 0, 1);
    //     firstDate.setDate(firstDate.getDate() - 1000);
    //     firstDate.setHours(0, 0, 0, 0);
    //
    //
    //     for (var i = 0; i < 10; i++) {
    //         var newDate = new Date(firstDate);
    //         newDate.setHours(0, i, 0, 0);
    //
    //         var a = Math.round(Math.random() * (40 + i)) + 100 + i;
    //         var b = Math.round(Math.random() * 100000000);
    //
    //         chartData.push({
    //             date: newDate,
    //             value: a,
    //             volume: b
    //         });
    //     }
    //     return chartData;
    // }
    //
    // var chart = AmCharts.makeChart("chartdiv", {
    //
    //     type: "stock",
    //     "theme": "none",
    //     pathToImages: "http://www.amcharts.com/lib/3/images/",
    //
    //     categoryAxesSettings: {
    //         minPeriod: "mm"
    //     },
    //
    //     dataSets: [{
    //         color: "#b0de09",
    //         fieldMappings: [{
    //             fromField: "value",
    //             toField: "value"
    //         }, {
    //             fromField: "volume",
    //             toField: "volume"
    //         }],
    //
    //         dataProvider: chartData,
    //         categoryField: "date"
    //     }],
    //
    //
    //     panels: [{
    //         showCategoryAxis: false,
    //         title: "Value",
    //         percentHeight: 70,
    //
    //         stockGraphs: [{
    //             id: "g1",
    //             valueField: "value",
    //             type: "smoothedLine",
    //             lineThickness: 2,
    //             bullet: "round"
    //         }],
    //
    //
    //         stockLegend: {
    //             valueTextRegular: " ",
    //             markerType: "none"
    //         }
    //     },
    //
    //         {
    //             title: "Volume",
    //             percentHeight: 30,
    //             stockGraphs: [{
    //                 valueField: "volume",
    //                 type: "column",
    //                 cornerRadiusTop: 2,
    //                 fillAlphas: 1
    //             }],
    //
    //             stockLegend: {
    //                 valueTextRegular: " ",
    //                 markerType: "none"
    //             }
    //         }
    //     ],
    //
    //     chartScrollbarSettings: {
    //         graph: "g1",
    //         usePeriod: "10mm",
    //         position: "top"
    //     },
    //
    //     chartCursorSettings: {
    //         valueBalloonsEnabled: true
    //     },
    //
    //     periodSelector: {
    //         position: "top",
    //         dateFormat: "YYYY-MM-DD JJ:NN",
    //         inputFieldWidth: 150,
    //         periods: [{
    //             period: "hh",
    //             count: 1,
    //             label: "1 hour",
    //             selected: true
    //
    //         }, {
    //             period: "hh",
    //             count: 2,
    //             label: "2 hours"
    //         }, {
    //             period: "hh",
    //             count: 5,
    //             label: "5 hour"
    //         }, {
    //             period: "hh",
    //             count: 12,
    //             label: "12 hours"
    //         }, {
    //             period: "MAX",
    //             label: "MAX"
    //         }]
    //     },
    //
    //     panelsSettings: {
    //         usePrefixes: true
    //     }
    // });


);