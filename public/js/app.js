// angular routing
var app = angular.module('BoilerplateApp', ['ngRoute']);

// run for every route changes, to check if the next route is private or not
app.run(function($rootScope, $location, $http) {
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    var privateViews = []; // include private views/routes, as "views/private.html"
    // if the url is private
    if (privateViews.indexOf(next.templateUrl) > -1) {
      // check if user is logged in
      // if NOT logged in redirect to login page
      $http.get("/loggedIn")
      .success(function(data) {
        if (!data) {
          $location.path("/login");
        }
      })
      .error(function(err) {
        console.log("An error occured: " + err);
      })
    }
  });
});


// route provider to redirect the user to the requested view, using a single page application setup
app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/login', {
    controller: 'LoginController',
    templateUrl: 'views/login.html'
  })
  .when('/signup', {
    controller: 'SignupController',
    templateUrl: 'views/signup.html'
  })
  .otherwise({
    controller: 'HomeController',
    templateUrl: 'views/home.html'
  });

  // use the HTML5 History API
  // this line is needed because the SPA urls would show # characters otherwise. It also needs line 6 in index.html
  $locationProvider.html5Mode(true);
});

// to call when you want to check if the user is online
app.factory('loggedIn', function($http) {
    return {
      getUser: function() {
         return $http.get('/loggedIn');
      }
    }
  });
