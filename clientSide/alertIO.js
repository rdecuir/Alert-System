var alertApp = angular.module('alertApp', []);

alertApp.factory('socket', function($rootScope) {
    var socket = io.connect('localhost:3000');
    console.info('Socket created');
    
    // Call scope.apply to force angular to update templates
    return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
        
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

alertApp.controller('mainController', ['$scope', '$log', 'socket', function($scope, $log, socket) {

    $scope.socketAlerts = [];
    
    socket.on('alert', function(data) {

        $scope.socketAlerts.splice(0, 0, data);
        console.info('Alert: ' + JSON.stringify(data));
    });
}]);

alertApp.directive("alertWindow", function() {
   return {
       restrict: 'AE',
       templateUrl: 'directives/alertwindow.html',
       replace: true
   }
});