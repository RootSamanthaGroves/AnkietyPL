angular.module('myApp').controller('RegisterController', function ($scope, $resource, $http) {
    $scope.message = '';

    $scope.test = function() {
        alert('Thanks');
    }
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });

    $scope.saveUser= function () {
        var email = $scope.emailOfUser;
        var firstName = $scope.firstNameOfUser; //pobieramy imie z pola w html
        var lastName = $scope.lastNameOfUser;
        var password = $scope.passwordOfUser;
        // var acountRole ="ROLE_ADMIN";
        // alert(firstName);

         //to tylko dla testu czy dane sie pobieraja, w google chrome ctrl+shif j otwiera conosle do debuga
        //degug //tak sie wlacza debugger w js

        //Potrzebujemy stworzyc nasz obiekt, ktorego zadamy w Javie patrz RequestBody
        var userObject = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            // acountRole: acountRole

        };
        alert(userObject.firstName+userObject.email);
        $http.post('/user/add',userObject).success(function () { //wywloujemy
            alert('Thanks');

        }).error(function () {
            alert('We have problem!');
        })
    };

});