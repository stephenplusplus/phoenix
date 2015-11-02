(function() {
  'use strict';

  angular
    .module('gcloudConsole')
    .config(routeConfig)
    .run(runBlock);

  /** @ngInject */
  function routeConfig($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();

    $urlRouterProvider.otherwise(function($injector) {
      var GData = $injector.get('GData');
      return GData.isLogin() ? '/projects' : '/login';
    });
  }

  /** @ngInject */
  function runBlock($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function(e, toState) {
      $rootScope.ACTIVE_STATE = toState;
    });
  }

})();
