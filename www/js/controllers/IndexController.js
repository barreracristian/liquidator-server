angular.module('liquidator-server.controllers.IndexController', [])
    .controller('IndexController',
        function ($scope, $rootScope, $state) {

            $scope.data = {};

            $scope.search = function(){
                if($scope.data.search.trim().length >= 2){
                    console.log("------------------ $scope.data = " + JSON.stringify($scope.data, null, 2));
                    $state.go('busqueda', {
                        search: $scope.data.search.trim()
                    });
                }
            };

            $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    $scope.overviewSectionActive = $state.includes("overview");
                    $scope.statsSectionActive = $state.includes("stats");
                }
            );

        }
    )
;
