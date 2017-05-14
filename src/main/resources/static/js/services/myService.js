/**
 * Created by Dominika on 2017-01-23.
 */
app.factory('myService', function () {
    var surveysId;

    function set(Id) {
        surveysId = Id;

    }

    function get() {
        return surveysId;

    }
});
