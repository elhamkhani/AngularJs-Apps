/**
 * Created by elham on 10/01/2016.
 */


    nasaApp.controller('LocationController',function(GeocodeService,$scope) {

        $scope.location={
            address : {
                postcode:'sm4 4su',
                lat:0,
                lon:0
            },
            imageUrl:'',
            dates:[]
        };

        $scope.errorMessage = '';



        $scope.getLatLong = function () {
            GeocodeService.async($scope.location.address.postcode)
                .then( function() {
                   $scope.location.address.lat = GeocodeService.coordinates().lat;
                   $scope.location.address.lon = GeocodeService.coordinates().lon;
               });
        };
    });




