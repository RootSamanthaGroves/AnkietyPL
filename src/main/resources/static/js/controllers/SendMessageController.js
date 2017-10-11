angular.module('myApp').controller('SendMessageController', function ($scope, $resource, $http) {


    $scope.sendMessage = function () {
        var Email = $scope.emailOfMessage;
        var Name = $scope.nameOfMessage;
        var Message = $scope.messageOfMessage;

        var messageObject = {
            name: Name,
            email: Email,
            message: Message
        };
        $http.post('/message/add', messageObject).success(function () {
            alert('Wiadomośc została wysłana');
        }).error(function () {
            alert('Nie udało się wysłać wiadomości! Podaj poprawne dane ');
        })
    };


    var loadAllMessageFromDb = function () {
        var User = $resource('message/all', {}, {
            query: {method: 'get', isArray: true, cancellable: true}
        });
        User.query(function (response) {

            $scope.message = response;
        });
    };
    loadAllMessageFromDb();




    //
    //     $scope.dajId = function (id) {
    //         alert(id);
    //
    //     }
    //
    //     $scope.myFunc = function () {
    //         $scope.showMe = true;
    //         //  !$scope.showMe;
    //     }
    //

    //
    //     var loadAllPeopleFromDb = function () {
    //         var User = $resource('user/all', {}, {
    //             query: {method: 'get', isArray: true, cancellable: true}
    //         });
    //
    //         User.query(function (response) {
    //             //alert(response); teraz w response masz to co bys widzial w postmanie takiego jsona
    //             $scope.user = response;
    //         });
    //     };
    //     loadAllPeopleFromDb();
    //
    //
    //     var loadOneUserFromDb = function (id) {
    //         var User = $resource('user/id' + id, {}, {
    //             query: {method: 'get', isArray: true, cancellable: true}
    //         });
    //
    //         User.query(function (response) {
    //             //alert(response); teraz w response masz to co bys widzial w postmanie takiego jsona
    //             $scope.user = response; // widoku będziesz używał teraz people
    //         });
    //     };
    //     loadOneUserFromDb();
    //
    //     //Delete a person
    //     $scope.delete = function (Id) {
    //         //Defining $http service for deleting a person
    //         $http({
    //             method: 'DELETE',
    //             url: '/user/delete/id/' + Id
    //         }).success(function (data) {
    //             //Showing Success message
    //             $scope.status = "The Person Deleted Successfully!!!";
    //             alert('Delete User');
    //             loadAllPeopleFromDb();
    //         })
    //             .error(function (error) {
    //                 //Showing error message
    //                 $scope.status = 'Unable to delete a person: ' + error.message;
    //             });
    //     }
    //     //Edit a person
    //     $scope.editUser = function (user) {
    //         $scope.myFunc();
    //         // alert(user.id);
    //         $scope.id = user.id,
    //             $scope.firstName = user.firstName, // uswawienie  ng com.model = firstName w hnml wartoscia z user.firstName
    //             $scope.lastName = user.lastName,
    //             $scope.email = user.email,
    //             $scope.password = user.password,
    //             $scope.salary = user.salary;
    //
    //     }
    //
    //     //Update
    //     $scope.update = function () {
    //
    //
    //         var testObj = {
    //             id: $scope.id,
    //             firstName: $scope.firstName,
    //             lastName: $scope.lastName,
    //             email: $scope.email,
    //             password: $scope.password,
    //             salary: $scope.salary,
    //         };
    //
    //         // var url = 'user/edit/' + $scope.id;
    //         // $http.post(url, testObj).success(function () {
    //         //     alert('User został zmodyfikowany');
    //         // }).error(function () {
    //         //     alert('Nie udało się zmienić danych!');
    //         // })
    //         var url = 'user/put/' + $scope.id;
    //         $http.post(url, testObj).success(function () {
    //             alert('User został zmodyfikowany');
    //             loadAllPeopleFromDb();
    //             $scope.status = "Update Successfully!!!";
    //         }).error(function () {
    //             alert('Nie udało się zmienić danych!');
    //         })
    //
    //     }
    // }
});