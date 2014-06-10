define([], function() {

    return {
        data: {

        },
        toggle: function(deps) {
            return deps.filter(function(dep) {
                return dep;
            });
        }
    };

});