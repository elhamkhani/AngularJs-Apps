/**
 * Created by elham on 10/01/2016.
 */

angular.module('locationApp', [])
    .controller('LocationController',['$http', function($http) {
        var location = this;

        var googleKey ='AIzaSyCcAd_LTLqtzoCqTHShUxNjGLPxfCsTABo';
        var nasaKey ='Erj1DXpDoYLc8yl2bNOILUbprBGKQBLhKSo7BlRn';

        location.address = {
            postcode:'',
            lat:0,
            lon:0
        };
        location.imageUrl='';
        location.nasaImages=[];

        location.errorMessage = '';

        location.GetListOfImages = function () {

            $http({
                method: 'GET',
                url: 'https://api.nasa.gov/planetary/earth/assets?api_key='+nasaKey+'&lat='+location.address.lat+'&lon='+location.address.lon
            }).then(function successCallback(response) {
                location.nasaImages = response.data.results;
            }, function errorCallback(response) {
                location.errorMessage = 'An error occured in retrieving data from Nasa.';
            });

        }

        location.GetLatLong = function () {
            $http({
                method: 'GET',
                url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+location.address.postcode+'&key='+googleKey
            }).then(function successCallback(response) {
                    location.address.lat = response.data.results[0].geometry.location.lat;
                    location.address.lon = response.data.results[0].geometry.location.lng;
            }, function errorCallback(response) {
                location.errorMessage = 'Could not find the latitude/longitude';
            });
        }

        location.ShowImageOfDay = function(date){
            $http({
                method: 'GET',
                url: 'https://api.nasa.gov/planetary/earth/imagery?lat='+location.address.lat+'&lon='+location.address.lon+'&date='+FormatDate(date)+'&cloud_score=True&api_key=DEMO_KEY'
            }).then(function successCallback(response) {
                    location.imageUrl= response.data.url;
            }, function errorCallback(response) {
                location.errorMessage = 'Could not find the latitude/longitude';
            });
        }

        function FormatDate(date)
        {
            var d= new Date(date);
            var formatedDate = d.getFullYear()+'-'+d.getMonth()+'-'+ d.getDate();
            return formatedDate;
        }
    }]);




