angular.module('liquidator-server.controllers.SiniestroController', [])
    .controller('SiniestroController',
        function ($scope, $http, $interval, $stateParams, DBService) {

            var siniestroId = $stateParams.siniestro_id;
            console.log("------------------ siniestroId = " + siniestroId);

            DBService.getSiniestros().then(function(siniestros){
                $scope.siniestro = _.find(siniestros,{id:parseInt(siniestroId)});

                DBService.getTalleres().then(function(talleres){
                    $scope.taller = _.find(talleres, {sucursales:[{id:$scope.siniestro.sucursal_id}]});
                    $scope.sucursal = _.find($scope.taller.sucursales, {id:$scope.siniestro.sucursal_id});
                })
            });

            getBitacora();
            $interval(function(){
                console.log("------------------ interval");
                getBitacora();
            }, 1000);

            function getBitacora(){
                DBService.getBitacora(siniestroId).then(function(data){
                    //console.log("------------------ data = " + JSON.stringify(data, null, 2));
                    $scope.bitacora = data;
                });
            }

        }
    )
;
