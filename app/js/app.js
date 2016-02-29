var app = angular.module('liquidator-server', [
    'ui.router',
    'angular.filter',
    'liquidator-server.controllers.MainController',
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
            .state('main', {
                url: "/main",
                templateUrl: "templates/main.html",
                controller: "MainController"
            })
        ;

        $urlRouterProvider.otherwise("/main");
    }
);
