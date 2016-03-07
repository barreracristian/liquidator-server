angular.module('liquidator-server.controllers.SiniestroController', [])
    .controller('SiniestroController',
        function ($scope, $http, $stateParams, DBService) {

            var siniestroId = $stateParams.siniestro_id;
            console.log("------------------ siniestroId = " + siniestroId);

            DBService.getSiniestros().then(function(siniestros){
                $scope.siniestro = _.find(siniestros,{id:parseInt(siniestroId)});

                DBService.getTalleres().then(function(talleres){
                    $scope.taller = _.find(talleres, {sucursales:[{id:$scope.siniestro.sucursal_id}]});
                    $scope.sucursal = _.find($scope.taller.sucursales, {id:$scope.siniestro.sucursal_id});
                })
            })

        }
    )
;
