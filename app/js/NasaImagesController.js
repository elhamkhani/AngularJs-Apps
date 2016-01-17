/**
 * Created by Elham.Khani on 12/01/2016.
 */
nasaApp.controller('NasaImagesController',function(NasaDatesService, NasaImagesService,DataSharingService,$scope,$filter) {

    $scope.dates=[],
    $scope.filteredDates = [],
    $scope.imageUrl='',
    $scope.errorMessage = '',
    $scope.currentPage = 1,
    $scope.numPerPage = 10,
    $scope.maxSize = 5;

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


    $scope.$watch("currentPage + numPerPage", function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        $scope.filteredDates = $scope.dates.slice(begin, end);
    });

});

