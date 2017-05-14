angular.module('myApp').controller('LoginController', function ($scope, $resource, $http, $location, LoginService, $localStorage, $rootScope) {
    // $scope.message = '';
    //
    // $scope.test = function() {
    //     alert('Thanks');
    // }
    // $(document).ready(function(){
    //     $('[data-toggle="tooltip"]').tooltip();
    // });
    //
    // $scope.saveUser= function () {
    //     var email = $scope.emailOfUser;
    //     var firstName = $scope.firstNameOfUser; //pobieramy imie z pola w html
    //     var lastName = $scope.lastNameOfUser;
    //     var password = $scope.passwordOfUser;
    //     // alert(firstName);
    //
    //     //to tylko dla testu czy dane sie pobieraja, w google chrome ctrl+shif j otwiera conosle do debuga
    //     //degug //tak sie wlacza debugger w js
    //
    //     //Potrzebujemy stworzyc nasz obiekt, ktorego zadamy w Javie patrz RequestBody
    //     var userObject = {
    //         email: email,
    //         firstName: firstName,
    //         lastName: lastName,
    //         password: password
    //
    //
    //     };
    //     alert(userObject.firstName+userObject.email);
    //     $http.post('/user/add',userObject).success(function () { //wywloujemy
    //         alert('Thanks');
    //
    //     }).error(function () {
    //         alert('We have problem!');
    //     })
    // };

///////////////////////////////////////////////////////////////////////////////

    $scope.message = "LoginController";
    $scope.errorMsg = '';
    $scope.rememberMe = true;
    $scope.username = '';
    $scope.password = '';

    $scope.login = function () {
        var userLoginAndPassword = {
            "username": $scope.username,
            "password": $scope.password
        };

        // console.log(userLoginAndPassword.password)
        if (userLoginAndPassword.password == "" || userLoginAndPassword.username == "") {
        } else {
            LoginService
                .login(userLoginAndPassword)
                .then(function (response) {
                        if (response.status == 200) {
                            LoginService
                                .getCurrentUser().then(function (response) {

                                $rootScope.currentUser = response.data;
                                $localStorage.currentUser = response.data;
                                $localStorage.showNavbar = true;
                                $localStorage.showTopMenu = true;
                                $rootScope.showNavbar = true;
                                $rootScope.showTopMenu = true;
                                $localStorage.firstName = response.data.name;
                                $localStorage.role = response.data.role;
                                $rootScope.id = response.data.id;
                                $location.path('/');
                            })
                        } else {
                            alert("Nie można poprawnie dokonać autoryzacji \nPrawdopodobną przyczyną jest zły email lub/i hasło");
                            $scope.errorMsg = 'Please check your credentials and try again.';
                        }
                    }
                )
        }
    }
});
