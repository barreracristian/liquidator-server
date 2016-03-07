angular.module('liquidator-server.controllers.OverviewController', [])
    .controller('OverviewController', function ($scope, $http, $stateParams, DBService, UtilService) {

        DBService.getTalleres().then(function (talleres) {
            //console.log("------------------ talleres = " + JSON.stringify(talleres, null, 2));
            $scope.talleres = talleres;
        });

        DBService.getSiniestros().then(function(siniestros){
            //console.log("------------------ siniestros = " + JSON.stringify(siniestros, null, 2));

            var map = {};
            _.each(siniestros, function(siniestro){
                map[siniestro.sucursal_id] = map[siniestro.sucursal_id] || [];
                map[siniestro.sucursal_id].push(siniestro);
            });

            $scope.siniestros = map;
        });


    });
