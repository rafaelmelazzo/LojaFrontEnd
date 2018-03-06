'use strict';

myApp.controller('ProdutosController', function ($scope, $http, $location, $routeParams) {

  $scope.produtos = [];
  $scope.produto = {};

  $scope.title = '';

  /**
   * Init da controller
   */
  $scope.init = function () {
    if ($routeParams.id) {
      $scope.produto.Id = $routeParams.id;
      $scope.findProduto();
    }

    if ($location.$$path.indexOf('adicionar') > 0) {
      $scope.title = 'Adicionar Produto';
    }

    if ($location.$$path.indexOf('alterar') > 0) {
      $scope.title = 'Alterar Produto';
    }

    if ($location.$$path.indexOf('adicionar') < 0 && $location.$$path.indexOf('alterar') < 0) {
      $scope.title = 'Lista de Produtos';
      $scope.getProdutos();
    }    
  }

  /**
   * Busca todos os produtos para preenchimento do grid
   */
  $scope.getProdutos = function () {
    var req = {
      method: 'GET',
      url: baseUrl + '/produtos'
    }

    $http(req).then(
      function (response) {
        $scope.produtos = response.data;
      },
      function (response) {
        myApp.messageError('Desculpe... não foi possível listar os produtos.');
      }
    );
  }

  /**
   * Busca apenas um produto para preenchimento do formulário em caso de alteração
   */
  $scope.findProduto = function () {
    var req = {
      method: 'GET',
      url: baseUrl + '/produtos/' + $scope.produto.Id
    }

    $http(req).then(
      function (response) {
        $scope.produto = response.data[0];
      },
      function (response) {
        myApp.messageError('Desculpe... não foi possível recuperar o produto solicitado.');
      }
    );
  }

  /**
   * Salva o formulário
   */
  $scope.salva = function () {

    var method = 'POST';
    var url = baseUrl + '/produtos';
    if ($scope.produto.Id) {
      method = 'PUT';
      url = url + '/' + $scope.produto.Id;
    }

    var req = {
      method: method,
      url: url,
      data: $scope.produto
    }

    $http(req).then(
      function (response) {
        if ($scope.produto.id) {
          myApp.messageSuccess("Produto '" + response.data.nome + "' alterado com sucesso!");
        } else {
          myApp.messageSuccess("Produto '" + response.data.nome + "' cadastrado com sucesso!");
        }
        $location.path("/produtos");
      },
      function (response) {
        myApp.messageError('Desculpe... não foi possível salvar suas alterações.');
      }
    );
  }

  /**
   * Exclui produto
   */
  $scope.exclui = function (id) {
    var fn = new Object();
    fn.callback = function () {
      var req = {
        method: 'DELETE',
        url: baseUrl + '/produtos/' + id,
        data: $scope.produto
      }
  
      $http(req).then(
        function (response) {
          myApp.messageSuccess("Produto Id " + id + " excluído com sucesso!");
          $scope.getProdutos();
        },
        function (response) {
          myApp.messageError('Desculpe... não foi possível excluir o produto solicitado.');
        }
      );
    }

    myApp.messageConfirm("Você tem certeza que deseja excluir este produto?", fn);
  }

  $scope.init();

});