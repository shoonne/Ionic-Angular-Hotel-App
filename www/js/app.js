// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("tab/home");
  
  $stateProvider
  .state("tabs", {
    url : "/tab",
    abstract : true,
    templateUrl : "template/tabs.html"

  })
  .state("tabs.home", {
    url: "/home",
    views : {
      "home-tab" : {
        templateUrl : "template/home.html"
      }
    }

  })
  .state("tabs.list", {
    url : "/list",
    views : {
      "list-tab" : {
        controller : "ListController",
        templateUrl : "template/list.html"
      }
    }

  })
  .state("tabs.details", {
    url : "/list/:aID",
    views : {
      "list-tab" : {
        templateUrl : "template/details.html",
        controller : "ListController"
      }
    }

  })
  .state("contact",{
    url : "/contact",
    templateUrl: "template/contact.html",
    controller : "ListController"
  })
  .state("checkout",{
    url : "/checkout",
    templateUrl: "template/checkout.html",
    controller : "ListController"
  })
})



.controller("ListController", function($scope, $http,$state,$stateParams, $ionicPopup){
  $scope.data = {};
  $scope.telform = "+46"
 
 
  $scope.submit = function(){
  console.log($scope.data);
  var url = "http://shaondesign.se/ionic/index.php";
  $http.post(url, $scope.data)
  .then(function(response){
    $scope.response = response;
    console.log(response);
   
    $ionicPopup.alert({
      title: "Bokning godkänd",
      template: "<p>" + "Namn: " + $scope.data.firstname + " " +  $scope.data.lastname + "</p>" + "<br>" + 
                "<p>" + "Rum: " + $scope.whichRoom + "</p>" + "<br>" + 
                "<p>" + "Email: " + $scope.data.email + "</p>" + "<br>" +
                "<p>" + "Telefonnummer: " + $scope.telform + $scope.data.tel +
                "<p>" + "Antal vuxna: " + $scope.data.adult +
                "<p>" + "Antal barn: " + $scope.data.kid +
                "<p>" + "Checkin: " + $scope.data + "-" + $scope.data.checkout + "</p>" + "<br>"  +
                "<p>" + "{{tot}}" + "</p>"
    });
  })
};

  $http.get('data/rooms.json').success(function(data){
  $scope.rooms = data;
  $scope.whichRoom = $state.params.aID;
  });
 
  $scope.diffDate = function(checkin, checkout){

    var checkin = new Date(checkin);
    var checkout = new Date(checkout);

    var timeDiff = Math.abs(checkout.getTime() - checkin.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24) ); 
    var diffD=parseInt(diffDays);
    return diffD;
};





 
 
 })




.run(function($ionicPlatform, $rootScope) {
  $rootScope.namn = 'test';
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


