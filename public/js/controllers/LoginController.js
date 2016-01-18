app.controller('LoginController', function($scope, $http, $location) {

  // booleans to show/hide alerts
  $scope.submitted = false;
  $scope.showErrorAlert = false;

  // alert string
  $scope.errorAlert = '';

  // account model for our view
  $scope.account = {
    email : '',
    password : ''
  }

  // at login button click
  $scope.login = function(account) {
    $scope.submitted = true;

    // user obj we are sending to the server
    var user = {
      email : account.email,
      password : account.password
    };

    $http.post("/api/login", user)
    .success(function (data, status) {
      console.log('Successful login.');
      // if successfull redirect to /
      $location.path("/");
    })
    .error(function (data) {
      console.log('Error: ' + data);
      $scope.showErrorAlert = true;
      $scope.errorAlert = data[0];
    });
  };
});
