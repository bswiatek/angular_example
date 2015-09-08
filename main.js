var app = angular.module("TodoApp", ['ngMessages', 'ui.router']);

app.factory('itunesTracks', function($http) {
  return $http.get('https://xplatform.org/static/resources/itunes.json').then(function(response) {
    return response.data.results.map(function(track) {
      return {
        artist: track.artistName,
        track: track.trackName,
        price: track.collectionPrice
      };
    });
  });
});

app.factory('exchange', function($http) {
  return $http.get('https://xplatform.org/ext/convert/latest?base=USD&symbols=PLN').then(function(response) {
    return response.data.rates.PLN;
  });
});

app.controller("MyFirstCtrl", function($scope, $http, itunesTracks, exchange) {

  itunesTracks.then(function(data) {
    $scope.itunesTracks = data;
  });

  exchange.then(function(data) {
    $scope.exchange = data;
  });


  $scope.todos = [{
    source: 'http://lorempixel.com/400/200',
    text: 'aaaa',
    moretext: 'aaaaaaaaaaaaaaaa',
    price: 600,
    tags: ["tag1", "tag2", "tag3"],
    special: false,
    checked: false
  }, {
    source: 'http://lorempixel.com/400/200',
    text: 'zzzz',
    moretext: 'zzzzzazaaaaaaaaaaaaaaa',
    price: 200,
    tags: ["tag1", "tag4", "tag5"],
    special: false,
    checked: false
  }, {
    source: 'http://lorempixel.com/400/200',
    text: 'cccc',
    moretext: 'cccccaaaaaaaaaaaaaaaa',
    price: 800,
    tags: ["tag4", "tag2", "tag1"],
    special: true,
    checked: false
  }, {
    source: 'http://lorempixel.com/400/200',
    text: 'dddd',
    moretext: 'dddaddddddaaaaaaaaaaaaaaa',
    price: 100,
    tags: ["tag4", "tag8", "tag3"],
    special: true,
    checked: false
  }];

  $scope.sorting = {
    by: 'price',
    desc: true
  };

  $scope.addNewOrder = function(newOrder) {
    newOrder.completed = false;
    $scope.todos.push(newOrder);
  };

  $scope.postalCodeValidation = function(postalCode) {
    if (postalCode === "123") {
      return true;
    }
  };


});

app.directive('sortingButton', function() {
  return {
    restrict: 'E',
    scope: {
      text: '@',
      value: '@',
      sort: '='
    },
    templateUrl: 'sortingButton.html',
    link: function(scope) {
      scope.sortBy = function(byWhat) {
        scope.sort.by = byWhat;
        scope.sort.desc = !scope.sort.desc;
      };
    }
  };
});

app.directive('productItem', function() {
  return {
    restrict: 'E',
    scope: {
      prod: '='
    },
    templateUrl: 'productItem.html'
  };
});

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/productList");
  //
  // Now set up the states
  $stateProvider
    .state('productList', {
      url: "/productList",
      templateUrl: "productList.html"
    })
    .state('orderProduct', {
      url: "/orderProduct",
      templateUrl: "orderProduct.html"
    })
});
