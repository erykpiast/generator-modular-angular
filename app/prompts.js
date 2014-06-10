module.exports = (function() {

    return function() {
        return [{
            type: 'input',
            name: 'appName',
            message: 'How do you want to name your app?',
            default: this.appname
        }];
    };

})();