angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addListing = function() {
    Listings.create($scope.newListing).then(function(response){
        $scope.listings.push($scope.newListing);
        $scope.newListing = {};
    }, function(error) {
      console.log('add fail: ', error);
    });
  };

    $scope.deleteListing = function(index) {
      var list = $scope.listings[index];
      Listings.delete(list._id).then(function(response){
        $scope.listings.splice(index, 1);
      }, function(error) {
        console.log('remove fail: ', error);
      });
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);
