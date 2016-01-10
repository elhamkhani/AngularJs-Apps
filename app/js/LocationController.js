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

        location.FindLastImage = function (address) {

            location.GetLatLong(address);


            $http({
                method: 'GET',
                url: 'https://api.nasa.gov/planetary/earth/assets?api_key='+nasaKey+'&lat='+location.address.lat+'&lon='+location.address.lon
            }).then(function successCallback(response) {
                location.nasaImages = response.data.results;
                console.log('https://api.nasa.gov/planetary/earth/assets?api_key='+nasaKey+'&lat='+location.address.lat+'&lon='+location.address.lon);

            }, function errorCallback(response) {
                location.errorMessage = 'An error occured in retrieving data from Nasa.';
            });

        }

        location.GetLatLong = function (address) {
            $http({
                method: 'GET',
                url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key='+googleKey
            }).then(function successCallback(response) {
                try {
                    location.address.lat = response.data.results[0].geometry.location.lat;
                    location.address.lon = response.data.results[0].geometry.location.lng;
                }catch(error)
                {
                    location.errorMessage = error;
                }
                return true;
            }, function errorCallback(response) {
                location.errorMessage = 'Could not find the latitude/longitude';
                return false;
            });
            return false;
        }

        location.ShowImageOfDay = function(date){
            var d= new Date(date);
            var formatedDate = d.getFullYear()+'-'+d.getMonth()+'-'+ d.getDate();
            $http({
                method: 'GET',
                url: 'https://api.nasa.gov/planetary/earth/imagery?lat='+location.address.lat+'&lon='+location.address.lon+'&date='+formatedDate+'&cloud_score=True&api_key=DEMO_KEY'
            }).then(function successCallback(response) {
                    location.imageUrl= response.data.url;
            }, function errorCallback(response) {
                location.errorMessage = 'Could not find the latitude/longitude';
            });
        }
    }]);




