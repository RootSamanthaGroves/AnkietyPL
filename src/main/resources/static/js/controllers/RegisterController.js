angular.module('myApp').controller('RegisterController', function ($scope, $resource, $http) {
    $scope.message = '';

    var n = false;
    var ln = false;
    var p = false;
    var e = false;
    $('.sendButton').attr('disabled', true);


    // do  walidania do nazwy usera
    $(document).ready(function () {
        //   $('.sendButton').attr('disabled', true);

        $('#imie').keyup(function () {
            if ($(this).val().length >= 3) {
                // $('.sendButton').attr('disabled', false);
                n = true;
                $scope.CorrectData();
            }
            else {
                n = false;
                $scope.CorrectData();
                // $('.sendButton').attr('disabled', true);
            }
        })
    });
    // do  walidania do nazwy usera
    $(document).ready(function () {
        //  $('.sendButton').attr('disabled', true);

        $('#nazwisko').keyup(function () {

            $('.sendButton').attr('disabled', true);


            if ($(this).val().length >= 3) {
                ln = true;
                $scope.CorrectData();
                // $('.sendButton').attr('disabled', false);
            }
            else {
                ln = false;
                $scope.CorrectData();
                // $('.sendButton').attr('disabled', true);
            }
        })
    });

// do hasła
    $(document).ready(function () {
        $('.sendButton').attr('disabled', true);

        $('#password').keyup(function () {


            if ($(this).val().length >= 5) {
                p = true;
                //  console.log(p);
                $scope.CorrectData();
                // $('.sendButton').attr('disabled', false);
            }
            else {
                p = false;
                $scope.CorrectData();
                // $('.sendButton').attr('disabled', true);
            }
        })
    });


// do maila
    $(document).ready(function () {
        $('.sendButton').attr('disabled', true);

        $('#email').keyup(function () {


            if ($(this).val().length >= 4) {
                e = true;
                $scope.CorrectData();
                // $('.sendButton').attr('disabled', false);
            }
            else {
                e = false;

                $scope.CorrectData();
                // $('.sendButton').attr('disabled', true);
            }
        })
    });

    $scope.CorrectData = function () {


        if (n == true && ln == true && p == true && e == true) {

            $('.sendButton').attr('disabled', false);
            //  console.log(n==true & ln==true & p==true & e==true);
        }
        else {
            // console.log(n==true & ln==true & p==true & e==true);
            $('.sendButton').attr('disabled', true);
        }
    };
    $scope.CorrectData();


    $scope.test = function () {
        alert('Thanks');
    }
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $scope.saveUser = function () {

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
        //  alert(userObject.firstName+userObject.email);
        $http.post('/user/add', userObject).success(function () { //wywloujemy
             $scope.emailOfUser="";
            $scope.firstNameOfUser = ""; //pobieramy imie z pola w html
            $scope.lastNameOfUser = "";
            $scope.passwordOfUser = "";
            alert('Thanks ' + userObject.firstName);


        }).error(function () {
            alert('We have problem!');
        })
    };

});