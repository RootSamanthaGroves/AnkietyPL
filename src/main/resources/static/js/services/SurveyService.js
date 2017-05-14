/**
 * Created by Dominika on 2017-01-23.
 */

angular.module('myApp').service('SurveyService', function ($resource, $http) {


    this.findOneSurvey = function (id) {
        var URL = "survey/id/" + id;
        return $http({

            method: "GET",
                url: URL
            }
        ).then(function successCallBack(response) {
            return response;
        }, function error(response) {
            return response.status;
        });
    }



});