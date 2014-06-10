module.exports = (function() {
    'use strict';

    var extend = require('extend');
    var path = require('path');
    var yeoman = require('yeoman-generator');
    var yosay = require('yosay');
    var chalk = require('chalk');

    var prompts = require('./prompts');


    var ViewGenerator = yeoman.generators.NamedBase.extend({
        init: function () {
            this.log('You called the view subgenerator with the argument ' + this.name + '.');
        },
        files: function () {
            this.template();
        }
    });


    return ViewGenerator;

})();