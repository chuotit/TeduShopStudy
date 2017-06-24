(function () {
    angular.module('tedushop.product_categories', ['tedushop.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('product_categories', {
            url: '/product_categories',
            templateUrl: '/app/components/product-categories/productCategoryListView.html',
            controller: 'productCategoryListController'
        })
        //.state('product_category_add', {
        //    url: '/product_category_add',
        //    templateUrl: '/app/components/product-categories/productCategoryAddView.html',
        //    controller: 'productCategoryAddController'
        //})
    };
})();