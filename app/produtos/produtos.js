'use strict';

angular.module('myApp.produtos', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/produtos', {
    templateUrl: 'produtos/produtos.html',
    controller: 'ProdutosCtrl'
  });
}])

.controller('ProdutosCtrl', [function() {

}]);