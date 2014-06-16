module.exports = (function() {
    'use strict';

    var extend = require('extend');
    var path = require('path');
    var yeoman = require('yeoman-generator');
    var yosay = require('yosay');


    var ViewGenerator = yeoman.generators.NamedBase.extend({
        init: function () {
            this._initOptsAndArgs();

            this._stateDef = { };
            this._stateDef.name = this._getName();
            this._stateDef.path = this._getPath();
            this._stateDef.prefixedName = this._getPrefixedName();
            this._stateDef.angularName = this._getAngularName();
            this._stateDef.views = this._getViews();
        },
        files: function () {
            try {
                this.template('_state.module.js', this._stateDef.prefixedName + '.state.module.js');
            } catch(e) {
                debugger;
            }
        },
        _initOptsAndArgs: function() {
            this.option('prefix', {
                desc: 'should include hierarchy in module files',
                optional: true,
                type: Boolean,
                defaults: true
            });

            this.option('view', {
                desc: 'state view',
                optional: true,
                type: String
            });
        },
        _getPath: function() {
            var original = this.name;
            var filepath = original;

            if (original.indexOf('/') !== -1) {
                filepath = original.split('/').slice(0, -1).map(function(mod) {
                    if(mod !== 'root') {
                        return mod + '/sub';
                    }
                }).join('/') + '/' + this._stateDef.name;
            }

            return {
                original: original,
                filepath: filepath
            };
        },
        _getName: function() {
            return /[^\/]+$/.exec(this.name)[0];
        },
        _getAngularName: function() {
            return 'ts.' + this._.dasherize(this._stateDef.prefixedName).replace(/-/g, '.');
        },
        _getPrefixedName: function() {
            var prefixedName = this._stateDef.name;

            if(this.options.prefix && (this.name.indexOf('/') !== -1)) {
                this.name.split('/').slice(0, -1).reverse().forEach(function(mod) {
                    if(mod !== 'root') {
                        prefixedName = mod + '__' + prefixedName;
                    }
                });
            }

            return prefixedName;
        },
        _getViews: function() {
            if(this.options.view) {
                return this.options.view.map(function(viewName) {
                    viewName = this._.dasherize(viewName);

                    var prefixedPath = this._stateDef.prefixedName + '__' + viewName;
                    var prefixedVariable = this._.camelize('_' + prefixedPath); // first _ make it camelized

                    return {
                        name: viewName,
                        routerDefVariable: 'V' + prefixedVariable,
                        variable: 'M' + prefixedVariable,
                        path: './views/' + viewName + '/' + prefixedPath + '.view.module'
                    };
                }, this);
            } else {
                return;
            }
        }
    });


    return ViewGenerator;

})();