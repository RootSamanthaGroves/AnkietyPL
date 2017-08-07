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
        // var role = $scope.roleOfUser;
        // console.log(role);

        var userObject = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password
            // Role: role

        };
        alert(userObject.firstName+userObject.email);
        $http.post('/user/add',userObject).success(function () { //wywloujemy
            alert('Thanks');

        }).error(function () {
            alert('We have problem!');
        })
    };

});