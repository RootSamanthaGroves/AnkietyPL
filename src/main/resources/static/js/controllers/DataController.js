/**
 * Created by Dominika on 2017-05-15.
 */
angular.module('myApp').controller('DataController', function ($scope, $resource, $http, $rootScope, $routeParams, SurveyService) {
    $scope.message = 'Hello from PeopleController';
    $scope.user;
    $scope.firstname;
    $scope.lastname;
    $scope.liczbaRegul = 10;
    $scope.liczbaRegul2 = 1;
    var rules = [];
    $scope.minUfnosc = [];
    $scope.all = [];


    var minUfnosc = function () {

        for (i = 1; i < 10; i = i + 5 / 10) {
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
                //    console.log($scope.ankietka);
                } else {
                 //   console.log($scope.ankietka + " zaladowano ankiety");
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
                    // $scope.selectAtribute = $scope.atributes.length;
                    // console.log($scope.selectAtribute );
                    // $scope.showStatistic();
                } else {
                 //   console.log($scope.ankietka + " sdasdsa");
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
                $scope.rulesweka = response;
                var i = 0;
                var j = 0;
                var text = "";
                var rule = "";
                var tabR = [];
                var n = [];
                var e = [];
                var f = 0;
                var l = 0;
                var nast = [];
                var pop = [];

                while (response[i]) {
                    l = response[i].length;
                    // rule = response[i];
                    rule = response[i].substring(f, l);
                    tabR[i] = rule;

                    var pos = tabR[i].indexOf("==>");
                    var posk = tabR[i].indexOf(".");

                    pop[i] = tabR[i].substring(posk + 2, pos);
                    nast[i] = tabR[i].substring(pos + 3, tabR[i].length - 4);
                    f = l;
                    text = response[i] + "<br>";

                    i++;
                }

                i = 0;
                var p = [];
                f = 0;
                var cale = "";
                var tabPop = [];
                var temp = [];

                while (pop[i]) {
                    l = pop[i].length;
                    cale = pop[i].substring(f, l);
                    tabPop[i] = cale;
                    var posI = tabPop[i].indexOf("&");
                    var lastposI = tabPop[i].lastIndexOf("&");
                    if (posI === lastposI) {
                        n[i] = {id: i, label: i+1, font: {size: 30}, size: 40, title: tabPop[i].substring(posI + 1, l)};
                    }
                    else {
                        temp[i] = cale;
                        l = temp[i].length;
                        p[0] = temp[i].substring(posI + 1, lastposI);
                        p[1] = temp[i].substring(lastposI + 1, l);
                        var between = p[0].lastIndexOf("&");

                        if (between != -1) {
                            p[0] = temp[i].substring(posI + 1, between);
                            p[1] = temp[i].substring(between + 6, lastposI);
                            p[2] = temp[i].substring(lastposI + 1, l);
                            n[i] = {
                                id: i, label: i + 1, font: {size: 30}, size: 40, title: p[0] + "<br>" + p[1] + "<br>" + p[2]
                                // , shape: 'dot'

                            };
                        } else {
                            // pops[i] = p;
                            n[i] = {
                                id: i, label: i + 1, font: {size: 30}, size: 40, title: p[0] + "<br>" + p[1]
                                // , shape: 'dot'
                            }

                        }

                    }
                    i++;
                }


                var uniq = nast.reduce(function (a, b) {
                        if (a.indexOf(b) < 0) a.push(b);
                        return a;
                    },
                    []);

                // console.log(uniq) // unikalne żeelementy

//========================================
                i = 0;
                var il = n.length;
                while (uniq[i]) {
                    n[il] = {id: il, font: {size: 30}, size: 40, title: uniq[i], color: "orange"};
                    j = 0;
                    while (nast[j]) {
                        if (nast[j] === uniq[i]) {
                            e[j] = {
                                from: j,
                                to: il,
                                font: {align: 'middle'},
                                arrows: {to: {scaleFactor: 1}},
                                color: 'blue  ',
                                title: tabR[j],
                                // shape: 'dot'
                            };
                        }
                        j++;
                    }
                    i++;
                    il++;
                }
//================================================

                var nodes = new vis.DataSet();

                nodes.add(n);
                // create an array with edges
                var edges = new vis.DataSet();
                edges.add(e);
                // create a network
                var container = document.getElementById('mynetwork');


                // provide the data in the vis format
                var data = {
                    nodes: nodes,
                    edges: edges
                };
                var options = {
                    // "edges": {
                    //     "smooth": {
                    //         "type": "straightCross",
                    //         "roundness": 0.2
                    //     }
                    // }
                };

                // initialize your network!
                var network = new vis.Network(container, data, options);
                document.getElementById("demo").innerHTML = text;
                $scope.wsparcieUfnosc();
                // MatchRulesToNetworkFormat(tabR);

            }
        )
    };

    var MatchRulesToNetworkFormat = function (tabOfRule) {
        var r;
        var i = 0;
        var j = 0;

        while (tabOfRule[i]) {
            j = 1;
            r = tabOfRule[i];

            while (j <= r.length) {

                j++;
            }
            i++;
        }

    }

    $scope.loadRulesFromNewData = function (path) {

        // @param n    Liczba regul do policzenia (standardowo: 10)
        //* @param c    Minmalna ufnosc reguly (standardowo: 0.9).
        var x = document.getElementById("ufnosc2").value;
        alert(x + " " + $scope.liczbaRegul2);
        rules = $resource('analysis/newdata/rules/' + x + "/" + $scope.liczbaRegul2, {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });

        rules.query(function (response) {
                // $scope.rulesweka = response;
                // var i = 0;
                // var text = "";
                // var tes = "";
                // $scope.rules = [];
                // while (response[i]) {
                //     $scope.rules[i] = response[i];
                //     console.log(i + " " + $scope.rules[i][i]);
                //     tes = response[i];
                //     text = response[i] + "<br>";
                //     i++;
                // }


                    $scope.rulesweka = response;
                    var i = 0;
                    var j = 0;
                    var text = "";
                    var rule = "";
                    var tabR = [];
                    var n = [];
                    var e = [];
                    var f = 0;
                    var l = 0;
                    var nast = [];
                    var pop = [];

                    while (response[i]) {
                        l = response[i].length;
                        // rule = response[i];
                        rule = response[i].substring(f, l);
                        tabR[i] = rule;

                        var pos = tabR[i].indexOf("==>");
                        var posk = tabR[i].indexOf(".");

                        pop[i] = tabR[i].substring(posk + 2, pos);
                        nast[i] = tabR[i].substring(pos + 3, tabR[i].length - 4);
                        f = l;
                        text = response[i] + "<br>";

                        i++;
                    }

                    i = 0;
                    var p = [];
                    f = 0;
                    var cale = "";
                    var tabPop = [];
                    var temp = [];

                    while (pop[i]) {
                        l = pop[i].length;
                        cale = pop[i].substring(f, l);
                        tabPop[i] = cale;
                        var posI = tabPop[i].indexOf("&");
                        var lastposI = tabPop[i].lastIndexOf("&");
                        if (posI === lastposI) {
                            n[i] = {id: i, label: i+1, font: {size: 30}, size: 40, title: tabPop[i].substring(posI + 1, l)};
                        }
                        else {
                            temp[i] = cale;
                            l = temp[i].length;
                            p[0] = temp[i].substring(posI + 1, lastposI);
                            p[1] = temp[i].substring(lastposI + 1, l);
                            var between = p[0].lastIndexOf("&");

                            if (between != -1) {
                                p[0] = temp[i].substring(posI + 1, between);
                                p[1] = temp[i].substring(between + 6, lastposI);
                                p[2] = temp[i].substring(lastposI + 1, l);
                                n[i] = {
                                    id: i, label: i + 1, font: {size: 30}, size: 40, title: p[0] + "<br>" + p[1] + "<br>" + p[2]
                                    // , shape: 'dot'

                                };
                            } else {
                                // pops[i] = p;
                                n[i] = {
                                    id: i, label: i + 1, font: {size: 30}, size: 40, title: p[0] + "<br>" + p[1]
                                    // , shape: 'dot'
                                }

                            }

                        }
                        i++;
                    }


                    var uniq = nast.reduce(function (a, b) {
                            if (a.indexOf(b) < 0) a.push(b);
                            return a;
                        },
                        []);

                     // console.log(uniq) // unikalne żeelementy

//========================================
                    i = 0;
                    var il = n.length;
                    while (uniq[i]) {
                        n[il] = {id: il, font: {size: 30}, size: 40, title: uniq[i], color: "orange"};
                        j = 0;
                        while (nast[j]) {
                            if (nast[j] === uniq[i]) {
                                e[j] = {
                                    from: j,
                                    to: il,
                                    font: {align: 'middle'},
                                    arrows: {to: {scaleFactor: 1}},
                                    color: 'blue  ',
                                    title: tabR[j],
                                    // shape: 'dot'
                                };
                            }
                            j++;
                        }
                        i++;
                        il++;
                    }
//================================================

                    var nodes = new vis.DataSet();

                    nodes.add(n);
                    // create an array with edges
                    var edges = new vis.DataSet();
                    edges.add(e);
                    // create a network
                    var container = document.getElementById('mynetworkNewDate');


                    // provide the data in the vis format
                    var data = {
                        nodes: nodes,
                        edges: edges
                    };
                    var options = {
                        // "edges": {
                        //     "smooth": {
                        //         "type": "straightCross",
                        //         "roundness": 0.2
                        //     }
                        // }
                    };

                    // initialize your network!
                    var network = new vis.Network(container, data, options);



                document.getElementById("demo2").innerHTML = text;
                $scope.wsparcieUfnosc2();
                // console.log(" to to" + $scope.rules[0]);


            }
        );

    };


    $scope.showData = function () {

        data = $resource('analysis/showdata', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });

        data.query(function (response) {
            $scope.dataweka = response;

           // console.log(response);

        });

    };

    $scope.change = function (id) {
        $scope.showStatistic();
     //   console.log(id);
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
                // console.log(atributes.length);

                var chart = AmCharts.makeChart("chartdiv", {
                    "type": "pie",
                    "startDuration": 0,
                    "theme": "none",
                    "addClassNames": true,
                    "legend": {
                        "position": "right",
                        "marginRight": 100,
                        "marginTop": 100,
                        "autoMargins": true
                    },
                    "innerRadius": "30%",
                    "defs": {
                        "filter": [{
                            "id": "shadow",
                            "width": "200%",
                            "height": "200%",
                            "feOffset": {
                                "result": "offOut",
                                "in": "SourceAlpha",
                                "dx": 0,
                                "dy": 0
                            },
                            "feGaussianBlur": {
                                "result": "blurOut",
                                "in": "offOut",
                                "stdDeviation": 5
                            },
                            "feBlend": {
                                "in": "SourceGraphic",
                                "in2": "blurOut",
                                "mode": "normal"
                            }
                        }]
                    },
                    "dataProvider": atributes,


                    // "balloonText": "[[value]]",
                    "valueField": "value",
                    "titleField": "lable",
                    // "balloon": {
                    //     "drop": true,
                    //     "adjustBorderColor": false,
                    //     "color": "#FFFFFF",
                    //     "fontSize": 16
                    // },
                    "export": {
                        "enabled": true
                    }
                });


                chart.addListener("init", handleInit);

                chart.addListener("rollOverSlice", function (e) {
                    handleRollOver(e);
                });

                function handleInit() {
                    chart.legend.addListener("rollOverItem", handleRollOver);
                }

                function handleRollOver(e) {
                    var wedge = e.dataItem.wedge.node;
                    wedge.parentNode.appendChild(wedge);
                }

                // console.log(chart);
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
                                text: "Statistics chart",
                                fontSize: 30
                            },
                            animationEnabled: true,
                            axisX: {
                                title: "Trust",
                                titleFontSize: 18

                            },
                            axisY: {
                                title: "Support",
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
                                    "Trust</strong> {x} <br/><strong> Support</strong></span> {y} <br/><strong> RULE </strong></span>{r}",

                                    name: "Rule",
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
                // console.log(response);
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
                        x: i + 1,
                        y: response[i][0]

                    });
                    wsparcie.push({
                        x: i + 1,
                        y: response[i][1]

                    });
                    oczekiwanaUfnosc.push({
                        x: i + 1,
                        y: response[i][2]

                    });
                    lift.push({
                        x: i + 1,
                        y: response[i][3],

                    });

                }


                var wykres4 = function () {
                    var chart = new CanvasJS.Chart("chartContainer",
                        {
                            zoomEnabled: false,
                            animationEnabled: true,
                            title: {
                                text: "Line chart statistics"
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
                                title: "Index of rule",
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
                                    name: "Support",
                                    axisYType: "secondary",
                                    dataPoints: wsparcie
                                },
                                {
                                    type: "line",
                                    lineThickness: 3,
                                    showInLegend: true,
                                    name: "Expected confidence",
                                    axisYType: "secondary",
                                    dataPoints: oczekiwanaUfnosc
                                },
                                {
                                    type: "line",
                                    lineThickness: 3,
                                    showInLegend: true,
                                    name: "Trust",
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


    $scope.wsparcieUfnosc2 = function () {

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


                var wykres2 = function () {
                    var chart = new CanvasJS.Chart("2chartContainer2",
                        {
                            title: {
                                text: "Statistics chart",
                                fontSize: 30
                            },
                            animationEnabled: true,
                            axisX: {
                                title: "Trust",
                                titleFontSize: 18

                            },
                            axisY: {
                                title: "Support",
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
                                    "Trust</strong> {x} <br/><strong> Support</strong></span> {y} <br/><strong> RULE </strong></span>{r}",

                                    name: "Rule",
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
                wykres2();
                $scope.wykresLiniowyStatystyk2();
             //   console.log(response);
            }
        );

    };

    $scope.wykresLiniowyStatystyk2 = function () {

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
                        x: i + 1,
                        y: response[i][0]

                    });
                    wsparcie.push({
                        x: i + 1,
                        y: response[i][1]

                    });
                    oczekiwanaUfnosc.push({
                        x: i + 1,
                        y: response[i][2]

                    });
                    lift.push({
                        x: i + 1,
                        y: response[i][3],

                    });

                }


                var wykres4newData = function () {
                    var chart = new CanvasJS.Chart("2chartContainer4",
                        {
                            zoomEnabled: false,
                            animationEnabled: true,
                            title: {
                                text: "Line chart statistics"
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
                                title: "Index of rule",
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
                                    name: "Support",
                                    axisYType: "secondary",
                                    dataPoints: wsparcie
                                },
                                {
                                    type: "line",
                                    lineThickness: 3,
                                    showInLegend: true,
                                    name: "Expected confidence",
                                    axisYType: "secondary",
                                    dataPoints: oczekiwanaUfnosc
                                },
                                {
                                    type: "line",
                                    lineThickness: 3,
                                    showInLegend: true,
                                    name: "Trust",
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
                wykres4newData();
                // console.log(response);
            }
        );

    };


    $scope.items = [1, 2, 3, 4, 5];
    $scope.selected = [];

    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        }
        else {
            list.push(item);
        }
    };

    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };


    $scope.SelectAtributesAndGenerateRules = function () {

        data = $resource('analysis /selectedAtribute/' + listOfAtributes, {}, {
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
                        x: i + 1,
                        y: response[i][0]

                    });
                    wsparcie.push({
                        x: i + 1,
                        y: response[i][1]

                    });
                    oczekiwanaUfnosc.push({
                        x: i + 1,
                        y: response[i][2]

                    });
                    lift.push({
                        x: i + 1,
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


    $scope.showNewData = function () {

        //  var x = document.getElementById("ufnosc").value;


       // console.log($scope.selected);
        newData = $resource('analysis/selectedAtribute/' + $scope.selected + "/" + $scope.all, {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });


        ///selectedAtribute/{listOfAtributes}
        newData.query(function (response) {
                // alert("1 " + response[2]);
                $scope.newData = response;
                $scope.showData();
              //  console.log(response[1]);

            }
        );

    };


    $scope.show = function () {

        newData = $resource('analysis/AllAtributes/', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });

        newData.query(function (response) {
                $scope.atributes = response;

                var i = 0;
                while (response[i]) {

                    $scope.all.push(i);

                    i++;
                }

            }
        );

    };
    $scope.show();


})
;

