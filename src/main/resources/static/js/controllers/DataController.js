/**
 * Created by Dominika on 2017-05-15.
 */
angular.module('myApp').controller('DataController', function ($scope, $resource, $http, $rootScope, $routeParams, SurveyService) {
        $scope.message = 'Hello from PeopleController';
        $scope.user;
        $scope.firstname;
        $scope.lastname;
        $scope.liczbaRegul=10;
        var rules = [];
        $scope.minUfnosc = [];


        var minUfnosc = function () {

            for (i = 4; i < 10; i = i + 5 / 10) {
                $scope.minUfnosc.push(i / 10);

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
                        console.log($scope.selectAtribute );
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
            rules = $resource('analysis/rules/' + x + "/" + $scope.liczbaRegul, {}, {
                query: {method: 'get', isArray: true, cancellable: true}
            });

            rules.query(function (response) {
                // alert("1 " + response[2]);
                $scope.rulesweka = response;
                var i = 0;
                var text = "";
                $scope.rules = [];
                while (response[i]) {
                    // $scope.rules[i]=response[i];
                    // console.log(i+" "+$scope.rules[i][i]);

                    text = response[i] + "<br>";
                    i++;
                }
                document.getElementById("demo").innerHTML = text;
                $scope.wsparcieUfnosc();
                console.log(" to to" + $scope.rules[0]);

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


        $scope.wsparcieUfnosc = function () {

            data = $resource('analysis/supportAndTrust', {}, {
                query: {method: 'get', isArray: true, cancellable: true}
            });


            data.query(function (response) {


                    var atributes = [];


                    for (i = 0; i < response.length; i++) {
                        // console.log($scope.rules[i])
                        atributes.push({
                            x: response[i][0],
                            y: Number(response[i][1]),
                            r: i + 1

                        });

                    }


                    var wykres = function () {
                        var chart = new CanvasJS.Chart("chartContainer2",
                            {
                                title: {
                                    text: "Wykres statystyk",
                                    fontSize: 30
                                },
                                animationEnabled: true,
                                axisX: {
                                    title: "Ufność",
                                    titleFontSize: 18

                                },
                                axisY: {
                                    title: "Wsparcie",
                                    titleFontSize: 16
                                },
                                legend: {
                                    verticalAlign: 'bottom',
                                    horizontalAlign: "center"
                                },

                                data: [
                                    {
                                        type: "scatter",
                                        markerType: "square",
                                        toolTipContent: "<span style='\"'color: {color};'\"'><strong>{name}</strong></span><br/><strong> " +
                                        "Ufność</strong> {x} <br/><strong> Wsparcie</strong></span> {y} <br/><strong> REGUŁA</strong></span>{r}",

                                        name: "Reguła",
                                        showInLegend: true,
                                        dataPoints: atributes,

                                    },

                                ],
                                legend: {
                                    cursor: "pointer",
                                    itemclick: function (e) {
                                        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                                            e.dataSeries.visible = false;
                                        }
                                        else {
                                            e.dataSeries.visible = true;
                                        }
                                        chart.render();
                                    }
                                }
                            });

                        chart.render();
                    }
                    wykres();
                    $scope.wykresLiniowyStatystyk();
                    console.log(response);
                }
            );

        };

        $scope.wykresLiniowyStatystyk = function () {

            data = $resource('analysis/supportAndTrust', {}, {
                query: {method: 'get', isArray: true, cancellable: true}
            });


            data.query(function (response) {


                    var lift = [];
                    var ufnosc = [];
                    var wsparcie = [];
                    var oczekiwanaUfnosc = [];

                    for (i = 0; i < response.length; i++) {
                        // console.log($scope.rules[i])
                        ufnosc.push({
                            x: i+1,
                            y:response[i][0]

                        });
                        wsparcie.push({
                            x: i+1,
                            y:response[i][1]

                        });
                        oczekiwanaUfnosc.push({
                            x: i+1,
                            y:response[i][2]

                        });
                        lift.push({
                            x:i+1,
                            y: response[i][3],

                        });

                    }


                    var wykres4 = function () {
                        var chart = new CanvasJS.Chart("chartContainer",
                            {
                                zoomEnabled: false,
                                animationEnabled: true,
                                title: {
                                    text: "Wykres liniowy statystyk"
                                },
                                axisY2: {
                                valueFormatString: "0.0 ",

                                maximum: 1.0,
                                interval: .05,
                                interlacedColor: "#F5F5F5",
                                gridColor: "#D7D7D7",

                                tickColor: "#D7D7D7"
                            },
                                axisX: {
                                    title: "Indeks reguły",
                                    titleFontSize: 18

                                },
                                theme: "theme2",
                                toolTip: {
                                    shared: true
                                },
                                legend: {
                                    verticalAlign: "bottom",
                                    horizontalAlign: "center",
                                    fontSize: 15,
                                    fontFamily: "Lucida Sans Unicode"

                                },
                                data: [
                                    {
                                        type: "line",
                                        lineThickness: 3,
                                        axisYType: "secondary",
                                        showInLegend: true,
                                        name: "Lift",
                                        dataPoints: lift
                                    },
                                    {
                                        type: "line",
                                        lineThickness: 3,
                                        showInLegend: true,
                                        name: "Wsparcie",
                                        axisYType: "secondary",
                                        dataPoints: wsparcie
                                    },
                                    {
                                        type: "line",
                                        lineThickness: 3,
                                        showInLegend: true,
                                        name: "Oczekiwana ufność",
                                        axisYType: "secondary",
                                        dataPoints: oczekiwanaUfnosc
                                    },
                                    {
                                        type: "line",
                                        lineThickness: 3,
                                        showInLegend: true,
                                        name: "Ufność",
                                        axisYType: "secondary",
                                        dataPoints: ufnosc
                                    }


                                ],
                                legend: {
                                    cursor: "pointer",
                                    itemclick: function (e) {
                                        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                                            e.dataSeries.visible = false;
                                        }
                                        else {
                                            e.dataSeries.visible = true;
                                        }
                                        chart.render();
                                    }
                                }
                            });

                        chart.render();

                    }
                    wykres4();
                    // console.log(response);
                }
            );

        };

    }
);

