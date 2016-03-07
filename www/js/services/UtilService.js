angular.module('liquidator-server.services.UtilService', [])

    .factory('UtilService', function () {

        return {

            array2map: function (array) {
                var map = {};
                _.each(array, function(item){
                    map[item.id] = item;
                });
                return map;
            }



        }
    });
