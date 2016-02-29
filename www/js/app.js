var app = angular.module('liquidator-server', [
    'ui.router',
    'liquidator-server.controllers.BusquedaController',
    'liquidator-server.controllers.IndexController',
    'liquidator-server.controllers.SiniestroController',
    'liquidator-server.extras'
]);

app.run(
    function () {
        console.log("RUN!");
    }
).config(
    function ($compileProvider, $sceProvider, $stateProvider, $urlRouterProvider) {
        $compileProvider.debugInfoEnabled(false);
        $sceProvider.enabled(false);

        $stateProvider
            .state('siniestro', {
                url: "/siniestro",
                templateUrl: "templates/siniestro.html",
                controller: "SiniestroController"
            })

            .state('busqueda', {
                url: "/busqueda",
                templateUrl: "templates/busqueda.html",
                controller: "BusquedaController"
            })


        ;

        $urlRouterProvider.otherwise("/main");
    }
);