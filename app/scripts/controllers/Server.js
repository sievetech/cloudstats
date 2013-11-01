'use strict';

angular.module('dashSupervisorFrontApp')
  .controller('ServerCtrl', function ($scope, $rootScope, $http, $location, $routeParams) {
    $rootScope.activate("Servidores");
    var id = $routeParams.id;
    $http({method: "GET", url:"http://localhost:3000/server/" + id}).
        success(function (data, status){
            $scope.process = data;
        }

    );
    $http({method: "GET", url:"http://localhost:3000/server"}).
        success(function (data, status){
            $scope.servers = data;
        }

    );

    $scope._remove_from_list = function(list, _id){
        var new_list = [];
        list.forEach(function (server){
            if (server._id != _id){
                new_list.push(server);
            }
        });
        return new_list;
    };

    $scope._delete = function(_id){
      $http({method: "DELETE", url:"http://localhost:3000/server/"+_id}).
          success(function (data, status){
              $scope.servers = $scope._remove_from_list($scope.servers, _id);
          }
      );
    };

    $scope._edit = function (_id){
        $location.path("/server/edit/"+_id);
    };
  });