/**
 * Created by Elham.Khani on 12/01/2016.
 */
nasaApp.controller('NasaImagesController',function(NasaDatesService, NasaImagesService,DataSharingService,$scope,$filter) {

    $scope.dates=[];
    $scope.imageUrl='';
    $scope.errorMessage = '';

    $scope.getDates = function () {
        NasaDatesService.async(DataSharingService.lat, DataSharingService.lon)
            .then( function() {
                $scope.dates = NasaDatesService.dates();
            });
    };

    $scope.displayImage = function (date) {
    var formattedDate = $filter('date')(date, 'yyyy-MM-dd');
        NasaImagesService.async(DataSharingService.lat, DataSharingService.lon,formattedDate)
            .then( function() {
                $scope.imageUrl = NasaImagesService.imageUrl();
            });
    };

});

