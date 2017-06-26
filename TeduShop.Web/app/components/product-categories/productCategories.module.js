(function () {
    angular.module('tedushop.product_categories', ['tedushop.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('product-categories', {
            url: '/product-categories',
            templateUrl: '/app/components/product-categories/productCategoryListView.html',
            controller: 'productCategoryListController'
        })
        .state('add-product-category', {
            url: '/add-product-category',
            templateUrl: '/app/components/product-categories/productCategoryAddView.html',
            controller: 'productCategoryAddController'
        })
        .state('edit-product-category', {
            url: '/edit-product-category/:id',
            templateUrl: '/app/components/product-categories/productCategoryEditView.html',
            controller: 'productCategoryEditController'
        })
    };
})();