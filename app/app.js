'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', ['ngRoute']);
var baseUrl = 'http://localhost:51496/api';

myApp.config(function ($locationProvider, $routeProvider) {

  $routeProvider
    .when('/produtos', {
      controller: 'ProdutosController',
      templateUrl: 'produtos/produtos.html'
    })
    .when('/produtos/adicionar', {
      controller: 'ProdutosController',
      templateUrl: 'produtos/produtos-form.html'
    })
    .when('/produtos/alterar/:id', {
      controller: 'ProdutosController',
      templateUrl: 'produtos/produtos-form.html'
    });


  myApp.messageSuccess = function (message) {
    swal({
      text: message,
      icon: "success",
    });
  };

  myApp.messageError = function (message) {
    swal({
      text: message,
      icon: "error",
    });
  };

  myApp.messageConfirm = function (message, fn) {
    var retorno;

    swal({
      text: message,
      buttons: true,
    })
    .then((value) => {
      if (value) {
        fn.callback();
      }
    });
  };

  $routeProvider.otherwise({ redirectTo: '/produtos' });
});
