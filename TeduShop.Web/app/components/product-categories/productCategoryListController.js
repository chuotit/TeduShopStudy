(function (app) {
    app.controller('productCategoryListController', productCategoryListController);

    productCategoryListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox', '$filter'];

    function productCategoryListController($scope, apiService, notificationService, $ngBootbox, $filter) {
        $scope.productCategories = [];
        $scope.page = 0;
        $scope.pagesCount = 0;
        $scope.keyword = '';
        $scope.disabledDelete = false;
        $scope.isAll = false;

        $scope.getProductCategories = getProductCategories;

        $scope.selectAll = selectAll;
        function selectAll() {
            if ($scope.isAll === false) {
                angular.forEach($scope.productCategories, function (item) {
                    item.checked = true;
                });
                $scope.isAll = true;
            } else {
                angular.forEach($scope.productCategories, function (item) {
                    item.checked = false;
                });
                $scope.isAll = false;
            }
        }

        $scope.deleteMultiple = deleteMultiple;
        function deleteMultiple() {
            var listId = [];
            $.each($scope.selected, function (i, item) {
                listId.push(item.ID);
            });
            var config = {
                params: {
                    checkedProductCategories: JSON.stringify(listId)
                }
            }

            apiService.del('/api/productcategory/deletemulti', config, function (result) {
                notificationService.displaySuccess('Đã xóa thành công + ' + result.data + ' bản ghi.');
                getProductCategories();
            }, function () {
                notificationService.displayError('Xóa không thành công.');
            });
        }

        $scope.$watch('productCategories', function (n, o) {
            var checked = $filter('filter')(n, { checked: true });
            if (checked.length) {
                $scope.selected = checked;
                $scope.disabledDelete = false;
            } else {
                $scope.disabledDelete = true;
            }
        }, true);

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