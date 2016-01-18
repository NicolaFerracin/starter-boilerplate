app.controller('SignupController', function($scope, $http, $window) {

  // booleans to show/hide alerts
  $scope.submitted = false;
  $scope.showPasswordAlert = false;
  $scope.showErrorAlert = false;

  // account model for our view
  $scope.account = {
    email : '',
    password : '',
    repeatPassword : ''
  }

  // at signup button click
  $scope.signup = function(account) {
    resetErrors();
    $scope.submitted = true;

    if (account.password != account.repeatPassword) {
      $scope.submitted = false;
      $scope.showPasswordAlert = true;
    }

    // user obj we are sending to the server
    var user = {
      email : account.email,
      password : account.password
    };

    $http.post("/api/signup", user)
    .success(function (data, status) {
      console.log('Successful signup.');
      // if successfull, redirect to / with full page reload
      $window.location.href = "/";
    })
    .error(function (data) {
      console.log('Error: ' + data);
      $scope.showErrorAlert = true;
      $scope.submitted = false;
    });
  };

  var resetErrors = function() {
    $scope.submitted = false;
    $scope.showPasswordAlert = false;
    $scope.showErrorAlert = false;
  }
});
