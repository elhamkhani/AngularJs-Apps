/**
 * Created by Elham.Khani on 12/01/2016.
 */
nasaApp.controller('NasaImagesController',function(NasaImagesService,DataSharingService,$scope) {

    $scope.dates=[];
    $scope.imageUrl='';
    $scope.errorMessage = '';

    $scope.getDates = function () {
        NasaImagesService.async(DataSharingService.lat, DataSharingService.lon)
            .then( function() {
                $scope.dates = NasaImagesService.dates();
            });
    };

    $scope.displayImage = function (date) {
        NasaImagesService.async(DataSharingService.lat, DataSharingService.lon)
            .then( function() {
                $scope.dates = NasaImagesService.dates();
            });
    };

});

