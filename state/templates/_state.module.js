define([
    'angular',
    <% if(_stateDef.featureToggle) { %>

    '<%= _stateDef.deps.common.features.path %>',
    <% } %>

    // sub-states
    <% if(_stateDef.views) { %>

    // views
        <%  _stateDef.views.forEach(function(view) { %>
    '<%= view.path %>',
        <% }); %>
    <% } %>

    <% if(_stateDef.angularDeps) { %>

    // angular dependencies
        <%  _stateDef.angularDeps.forEach(function(depName) { %>
    '<%= dep.path %>',
        <% }); %>
    <% } %>
], function (
    angular,
    <% if(_stateDef.featureToggle) { %>

    <%= _stateDef.deps.common.features.variable %>
    <% } %>

    // sub-states
    <% if(_stateDef.views) { %>

    // views
        <%  _stateDef.views.forEach(function(view) {
  %><%= view.variable %>,
        <% }); %>
    <% } %>

    <% if(_stateDef.angularDeps) { %>

    // angular dependencies
        <%  _stateDef.angularDeps.forEach(function(depName) { %>
    <%= dep.variable %>
        <% }); %>
    <% } %>
    ) {
    'use strict';

    return angular.module('<%= _stateDef.angularName %>', <% if(_stateDef.featureToggle) { %><%= _stateDef.deps.common.features.variable %>.toggle(<% } %>[
    <% if(_stateDef.views) { %>

        <%  _stateDef.views.forEach(function(view) {
  %><%= view.variable %>.name,
        <% }); %>
    <% } %>
    <% if(_stateDef.angularDeps) { %>

        <%  _stateDef.angularDeps.forEach(function(dep) { %>
        '<%= dep.angularName %>'
        <% }); %>
    <% } %>
    ]<% if(_stateDef.featureToggle) { %>)<% } %>)
    .config(function ($stateProvider<% if(_stateDef.views) { _stateDef.views.forEach(function(view) { %>, <%= view.routerDefVariable %><% }); } %>) {
        $stateProvider
            .state('root', {
                url: '',
                <% if(_stateDef.views) { %>
                views: {
                <% _stateDef.views.forEach(function(view) {
                %> '<%= view.name %>': <%= view.routerDefVariable  %>,
                    <% }); %>
                }
                <% } %>
            });
    });

});