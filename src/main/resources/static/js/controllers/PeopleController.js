/**
 * Created by Marcin on 24.11.2016.
 */
angular.module('myApp').controller('PeopleController', function ($scope, $resource, $http) {
    $scope.message = 'Hello from PeopleController';
    $scope.user;
    $scope.firstname;
    $scope.lastname;


    $scope.loadOnePeople = function (email) {
        $scope.Email =email;
        var User = $resource('user/email/', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });

        User.query(function (response) {
            //alert(response); teraz w response masz to co bys widzial w postmanie takiego jsona
            $scope.user = response; // widoku będziesz używał teraz people
        });

    };


    var loadAllPeopleFromDb = function () {
        var User = $resource('user/all', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });

        User.query(function (response) {
            //alert(response); teraz w response masz to co bys widzial w postmanie takiego jsona
            $scope.user = response; // widoku będziesz używał teraz people
        });
    };
    loadAllPeopleFromDb();



    //Zapis osoby do bazy danych
    $scope.savePerson = function () {
        var firstName = $scope.firstNameOfUser; //pobieramy imie z pola w html
        var lastName = $scope.lastNameOfUser;
        var email = $scope.emailOfUser;
        var password = $scope.passwordOfUser;
        var salary = $scope.salaryOfUser;


        //Potrzebujemy stworzyc nasz obiekt, ktorego zadamy w Javie patrz RequestBody
        var userObject = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            salary: salary

        };

        var userObject = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            salary: salary

        };
    };

});