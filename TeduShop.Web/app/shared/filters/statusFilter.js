(function (app) {
    app.filter('statusFilter', function () {

        return function (input) {
            return input? 'Kích hoạt' : 'Đóng';
        };
    });

})(angular.module('tedushop.common'));