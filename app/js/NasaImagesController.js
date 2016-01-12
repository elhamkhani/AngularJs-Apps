/**
 * Created by Elham.Khani on 12/01/2016.
 */
nasaApp.controller('NasaImagesController',function(NasaImagesService,$scope) {

    $scope.dates=[];
    $scope.imageUrl='';
    $scope.errorMessage = '';

    $scope.getDates = function () {
        NasaImagesService.async()
            .then( function() {
                $scope.dates = NasaImagesService.dates(0,0);
            });
    };


    function FormatDate(date)
    {
        var d= new Date(date);
        var formatedDate = d.getFullYear()+'-'+d.getMonth()+'-'+ d.getDate();
        return formatedDate;
    }
});

