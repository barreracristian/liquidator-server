angular.module('liquidator-server.extras', [])

    .filter('capitalize', function () {
        return function (input) {
            if (_.isUndefined(input)) {
                return undefined;
            }

            return _.map(_.words(input.toLowerCase()), function (word) {
                if(input.indexOf(word) != 0 && (word == 'de' || word == 'en' || word == 'a' || word == 'por' || word == 'al')){
                    return word;
                }
                return _.capitalize(word);
            }).join(" ");
        };
    })

    .filter('prettyDate', function () {
        return function (input) {
            if (_.isUndefined(input)) {
                return undefined;
            }
            return moment(input).format("ddd D MMM YYYY, HH:mm");
        };
    })

    .filter('fromNow', function () {
        return function (input) {
            if (_.isUndefined(input)) {
                return undefined;
            }
            return moment(input).fromNow(true);
        };
    })

;
