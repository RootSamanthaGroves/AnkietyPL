/**
 * Created by Dominika on 2017-01-23.
 */
angular.module('myApp').controller('NavbarController', function ($http, $scope, $resource, $location, $rootScope, $localStorage, LoginService) {

    var loadCurrentUser = function () {
        LoginService
            .getCurrentUser()
            .then(function (response) {
                if (response.status == 200) {
                    $rootScope.email = response.data.email; //rootScope umozliwia wyswietlanei w dowolnym miejscu
                    $rootScope.name = response.data.firstName;
                    $rootScope.role = response.data.role;
                    $rootScope.id = response.data.id;
                    console.log("navbar  name " + $localStorage.firstName + " " + $localStorage.role + " " + $rootScope.id);

                    if (angular.equals(response.data.role, 'ROLE_ADMIN')) {
                        $rootScope.admin = true;
                        $localStorage.isAdmin = true;
                    } else {
                        $rootScope.admin = false;
                        $localStorage.isAdmin = false;
                    }
                }
            })
    };
    loadCurrentUser();

    $scope.removeUserFromStorage = function () {
        delete $localStorage.email;
        delete $localStorage.isAdmin;
        $localStorage.$reset();
        LoginService
            .logoutUser()
            .then(function (response) {
                if (response.status == 200) {
                    $location.path('/');
                }
            })
    };

    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $scope.saveUser = function () {
        var email = $scope.emailOfUser;
        var firstName = $scope.firstNameOfUser; //pobieramy imie z pola w html
        var lastName = $scope.lastNameOfUser;
        var password = $scope.passwordOfUser;
        var userObject = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            role: "ROLE_USER"
        };
        alert(userObject.firstName + userObject.email);
        $http.post('/user/add', userObject).success(function () { //wywloujemy
            alert('Thanks');

        }).error(function () {
            alert('We have problem!');
        })
    };
});