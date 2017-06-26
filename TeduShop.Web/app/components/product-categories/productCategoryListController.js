(function (app) {
    app.controller('productCategoryListController', productCategoryListController);

    productCategoryListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];

    function productCategoryListController($scope, apiService, notificationService, $ngBootbox) {
        $scope.productCategories = [];
        $scope.page = 0;
        $scope.pagesCount = 0;
        $scope.keyword = '';
        $scope.getProductCategories = getProductCategories;

        $scope.search = search;
        function search() {
            getProductCategories();
        }

        $scope.deleteProductCategory = deleteProductCategory;
        function deleteProductCategory(id) {
            $ngBootbox.confirm('Bạn có chắc chắn muốn xóa không?').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }

                apiService.del('/api/productcategory/delete', config, function (result) {
                    notificationService.displaySuccess('Đã xóa thành công: ' + result.data.Name);
                    getProductCategories();
                }, function () {
                    notificationService.displayError('Xóa không thành công.');
                });
            });
        };

        function getProductCategories(page) {
            page = page || 0;
            var config = {
                params: {
                    keyword: $scope.keyword,
                    page: page,
                    pagesize: 3
                }
            }
            
            apiService.get('/api/productcategory/getall', config, function (result) {
                if (result.data.TotalCount === 0) {
                    notificationService.displayWarning('Không tìm thấy bản ghi nào!');
                } else {
                    notificationService.displaySuccess('Đã tìm thấy ' + result.data.TotalCount + ' bản ghi!');
                }
                $scope.productCategories = result.data.Items;
                $scope.page = result.data.Page;
                $scope.pagesCount = result.data.TotalPages;
                $scope.totalCount = result.data.TotalCount;
            }, function () {
                console.log('Load data failed.');
            });
        };

        $scope.getProductCategories();
    };
})(angular.module('tedushop.product_categories'));