angular.module('myApp').controller('AccountController', function ($scope, $resource, $http, $localStorage) {


    $scope.zalogowany = "";

    $scope.showMe = false;
    // $scope.isLogin = $localStorage.isLogin;
    $scope.myFunc = function () {
        $scope.showMe = true;

    }


    var getZalogowany = function () {
        var User = $resource('user/current.json', {}, {
            query: {method: 'get', isArray: false, cancellable: true}
        });
        User.query(function (response) {
            $scope.myemail = response.email;
            $scope.myFunc();
        });
    };
    getZalogowany();


    $scope.dajId = function (id) {
            alert(id);
        }


    $scope.loadMyDate = function () {
        var User = $resource('user/current', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });

        User.query(function (response) {

            $scope.myemail = response;
        });


    };


        var loadAllPeopleFromDb = function () {
            var User = $resource('user/all', {}, {
                query: {method: 'get', isArray: true, cancellable: true}
            });
            User.query(function (response) {
                //alert(response);
                $scope.user = response;
            });
        };
        loadAllPeopleFromDb();


    $scope.loadOneUserFromDb = function (id) {
            var User = $resource('user/id' + id, {}, {
                query: {method: 'get', isArray: true, cancellable: true}
            });

            User.query(function (response) {

                $scope.user = response;
            });
        };
    // loadOneUserFromDb();

        //Delete a person
        $scope.delete = function (Id) {
            //Defining $http service for deleting a person
            $http({
                method: 'DELETE',
                url: '/user/delete/id/' + Id
            }).success(function (data) {
                //Showing Success message
                $scope.status = "The Person Deleted Successfully!!!";
                alert('Delete User');
                loadAllPeopleFromDb();
            })
                .error(function (error) {
                    //Showing error message
                    $scope.status = 'Unable to delete a person: ' + error.message;
                });
        }


        //Edit a person
        $scope.editUser = function (user) {
            $scope.myFunc();
            // alert(user.id);
            $scope.id = user.id,
                $scope.firstName = user.firstName, // uswawienie  ng com.model = firstName w hnml wartoscia z user.firstName
                $scope.lastName = user.lastName,
                $scope.email = user.email,
                $scope.password = user.password,
                $scope.salary = user.salary;
        }


        //Update
        $scope.update = function () {
            var testObj = {
                id: $scope.id,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email,
                password: $scope.password,
                salary: $scope.salary,
            };

            var url = 'user/put/' + $scope.id;
            $http.post(url, testObj).success(function () {
                alert('User został zmodyfikowany');
                loadAllPeopleFromDb();
                $scope.status = "Update Successfully!!!";
            }).error(function () {
                alert('Nie udało się zmienić danych!');
            })
        }


    }
);