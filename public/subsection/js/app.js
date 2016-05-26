(function() {
  'use strict';

  angular
    .module('gabagramApp', [
      'ui.router',
      // 'GabsController',
      // 'GabsFactory'
    ])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/subsection");

    $stateProvider
      .state('gabs', {
        url: '/gabs',
        templateUrl: 'subsection/partials/gabs.html',
        controller: 'GabsController as ctrl'
      });

  }
})();
