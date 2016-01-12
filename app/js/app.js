/**
 * Created by Elham.Khani on 12/01/2016.
 */

var nasaApp = angular.module('nasaApp', []);

nasaApp.factory('GeocodeService',  function($http,$q){

    var googleKey ='AIzaSyCcAd_LTLqtzoCqTHShUxNjGLPxfCsTABo';
    var coordinates={
        lat:0,
        lon:0
    };

    var deferred = $q.defer();
    var GeocodeService = {};

    GeocodeService.async = function(postcode) {
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + postcode + '&key=' + googleKey)
            .success(function (response) {
                coordinates.lat = response.results[0].geometry.location.lat;
                coordinates.lon = response.results[0].geometry.location.lng;
                deferred.resolve();
            });
        return deferred.promise;
    };

    GeocodeService.coordinates = function(postcode){return coordinates;}

    return GeocodeService;

});



nasaApp.factory('NasaImagesService',  function($http,$q){

    var nasaKey ='Erj1DXpDoYLc8yl2bNOILUbprBGKQBLhKSo7BlRn';
    var dates=[];

    var deferred = $q.defer();
    var NasaImagesService = {};

    NasaImagesService.async = function(lat,lon) {
        $http.get('https://api.nasa.gov/planetary/earth/assets?api_key='+nasaKey+'&lat='+lat+'&lon='+lon)
            .success(function (response) {
                dates = response.results[0];
                deferred.resolve();
            });
        return deferred.promise;
    };

    NasaImagesService.dates = function(lat,lon){return dates;}

    return NasaImagesService;

});
