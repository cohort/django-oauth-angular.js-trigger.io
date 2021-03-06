angular.module('fff', ['tastypieModule']).config(function($routeProvider) { 
    $routeProvider.
        when('/', {controller:HomeCrtl, templateUrl:'home.html'}).
        when('/sign-in', {controller:SiginInCtrl, templateUrl:'sign-in.html'}).
        when('/no-connection', {templateUrl:'no-connection.html'}).
        when('/list', {controller:ListCtrl, templateUrl:'list.html'}).
        when('/new', {controller:CreateCtrl, templateUrl:'add_option.html'}).
        otherwise({redirectTo:'/'});
    });

function HomeCrtl($scope, $location) {
    //check for connecton 
    var online = navigator.onLine;
    
    //if connected attempt to login
    if (online === true) {
        $location.path('/sign-in');
    
    //else show connection error
    } else {
        $location.path('/no-connection');
    }
};

function SiginInCtrl($scope, $location, apiCall) {
    $scope.twitterSignIn = function() {
        //forge.tabs.openWithOptions({
          //  url: 'http://192.168.91.20/accounts/twitter/login/',
        //    pattern: 'http://192.168.91.20/auth/*'
        //}, function (data) {
            //forge.logging.log(data.url);
            //$scope.$apply(function() {
                $location.path('/list');
                apiCall.userCreds = data.url;
            //});
        //}); 
    }
};

function ListCtrl($scope, $http, apiCall) {
    
    $scope.food_options =  apiCall.get();
    
    $scope.testApi = function () {
        apiCall.get();
    }
};

function CreateCtrl($scope, $http, apiCall){
    $scope.addOption = function() {
        //$http.post('http://192.168.91.20/api/food/', {name: $scope.optionText}, {withCredentials: false});

        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.103/api/food/?username=rob_balfre&api_key=58ce21171b76da7755a7353313160867aeda1311',
            data: '{"name":"'+$scope.optionText+'"}',
            contentType: "application/json"
            //dataType: 'json',
            //processData: false
        }).done(function(data) { console.log('sent: '+data) });
    };
}