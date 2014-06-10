module.exports = (function() {
    'use strict';

    var extend = require('extend');
    var path = require('path');
    var yeoman = require('yeoman-generator');
    var yosay = require('yosay');
    var chalk = require('chalk');

    var prompts = require('./prompts');


    var ModularAngularRequireGenerator = yeoman.generators.Base.extend({
        init: function () {
            this.pkg = require('../package.json');

            this.option('appName', {
                desc: 'name of application',
                type: 'String',
                defaults: this.appname,
                hide: false
            });

            this.on('end', function () {
                if (!this.options['skip-install']) {
                    this.installDependencies();
                }
            });
        },
        askFor: function () {
            var done = this.async();

            // Have Yeoman greet the user.
            this.log(yosay('Welcome to the marvelous ModularAngularRequire generator!'));

            this.prompt(prompts.call(this), function (props) {
                extend(this.options, props);

                done();
            }.bind(this));
        },
        app: function () {
            this.mkdir('app');

            this._createHelpers();
            this._createStates();

            this.template('_package.json', 'package.json');
            this.template('_bower.json', 'bower.json');
        },
        projectfiles: function () {
            this.copy('editorconfig', '.editorconfig');
            this.copy('jshintrc', '.jshintrc');
        },
        _createHelpers: function() {
            this.mkdir('app/common/helpers/features');

            this.copy('app/common/helpers/features/features.js', 'app/common/helpers/features/features.js');
        },
        _createStates: function() {

        }
    });


    return ModularAngularRequireGenerator;

})();