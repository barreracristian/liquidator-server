var app = angular.module('liquidator-server', [
    'ui.router',
    'liquidator-server.controllers.BusquedaController',
    'liquidator-server.controllers.IndexController',
    'liquidator-server.controllers.SiniestroController',
    'liquidator-server.controllers.StatsSiniestrosController',
    'liquidator-server.controllers.StatsTalleresController',
    'liquidator-server.controllers.StatsTandemsController',
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
            .state('busqueda', {
                url: "/busqueda",
                templateUrl: "templates/busqueda.html",
                controller: "BusquedaController"
            })

            .state('siniestro', {
                url: "/siniestro",
                templateUrl: "templates/siniestro.html",
                controller: "SiniestroController"
            })

            .state('statssiniestros', {
                url: "/statssiniestros",
                templateUrl: "templates/stats_siniestros.html",
                controller: "StatsSiniestrosController"
            })

            .state('statstalleres', {
                url: "/statstalleres",
                templateUrl: "templates/stats_talleres.html",
                controller: "StatsTalleresController"
            })

            .state('statstandems', {
                url: "/statstandems",
                templateUrl: "templates/stats_tandems.html",
                controller: "StatsTandemsController"
            })

        ;

        $urlRouterProvider.otherwise("/");
    }
);