(function () {
    angular.module('tedushop.product_categories', ['tedushop.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('product-categories', {
            url: '/product-categories',
            templateUrl: '/app/components/product-categories/productCategoryListView.html',
            controller: 'productCategoryListController'
        })
        .state('product-category-add', {
            url: '/product-category-add',
            templateUrl: '/app/components/product-categories/productCategoryAddView.html',
            controller: 'productCategoryAddController'
        })
    };
})();