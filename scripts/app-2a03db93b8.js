!function(){"use strict";angular.module("gcloudConsole",["ngAnimate","ngSanitize","ui.router","ngMaterial","angular-google-gapi","oc.lazyLoad"])}(),function(){"use strict";function t(t,e){var n=this;e.load("storage","v1"),e.executeAuth("storage","buckets.list",{project:t.projectId}).then(function(t){n.buckets=t.items})}var e=angular.module("gcloudConsole").controller("StorageBrowserCtrl",t);t.$inject=["$stateParams","GApi"],"undefined"!=typeof module&&(module.exports=e)}(),function(){"use strict";function t(t,e,n){function o(t,e){return angular.extend({},t,{headers:{Authorization:"Bearer "+e.access_token},url:u+t.url,method:t.method||"GET",cache:i})}function r(e){return n.setScope(c),n.getToken().then(function(n){var r=o(e,n);return t(r)})}function l(){return r({url:"/projects"}).then(function(t){return t.data.projects})}var c="https://www.googleapis.com/auth/cloud-platform",u="https://cloudresourcemanager.googleapis.com/v1beta1",i=e("resource");return{getProjectList:l}}angular.module("gcloudConsole").factory("resource",t),t.$inject=["$http","$cacheFactory","GAuth"]}(),function(){"use strict";function t(){return{restrict:"E",replace:!0,scope:{projects:"=",user:"="},templateUrl:"app/components/navbar/navbar.html",controller:e,controllerAs:"navbar",bindToController:!0}}function e(t,e,n){function o(){return t.params.projectId}function r(t){i.selectedProject=l(t)||u}function l(t){for(var e=0;e<a.length;e++)if(a[e].projectId===t)return a[e].name}function c(){return n.logout().then(function(){t.go("login")})}var u="Select a project",i=this,a=i.projects;i.selectedProject=u,i.logout=c,e.$watch(o,r)}angular.module("gcloudConsole").directive("navbar",t),e.$inject=["$state","$scope","GAuth"]}(),function(){"use strict";function t(t){t.state("projects",{url:"/projects",templateUrl:"app/projects/projects.html",controller:"ProjectsCtrl",controllerAs:"projects",resolve:{projectList:e}})}function e(t){return t.getProjectList()}angular.module("gcloudConsole").config(t),t.$inject=["$stateProvider"],e.$inject=["resource"]}(),function(){"use strict";function t(t){var e=this;e.list=t}angular.module("gcloudConsole").controller("ProjectsCtrl",t),t.$inject=["projectList"]}(),function(){"use strict";function t(t){t.state("project",{parent:"projects",url:"/:projectId",templateUrl:"app/project/project.html",resolve:{project:e}})}function e(t,e){for(var n=t.projectId,o=0;o<e.length;o++)if(e[o].projectId===n)return e[o];throw new Error('Unknown project id "'+n+'"')}angular.module("gcloudConsole").config(t),t.$inject=["$stateProvider"],e.$inject=["$stateParams","projectList"]}(),function(){"use strict";function t(t,e,n){function o(t){return angular.isArray(t)?t:[t]}function r(r){var l=o(r).map(function(t){return n["import"](t)});return t.all(l).then(function(t){return e.inject(t)})}return{load:r}}angular.module("gcloudConsole").factory("$gcPlugin",t),t.$inject=["$q","$ocLazyLoad","System"]}(),function(){"use strict";function t(t){t.state("plugin",{parent:"project",url:"/:pluginId",templateUrl:"app/plugin/plugin.html",controller:"PluginCtrl",controllerAs:"plugin",resolve:{plugin:e}})}function e(t){return t.load("app/components/storage-browser/storage-browser.controller.js").then(function(){return{controller:"StorageBrowserCtrl",templateUrl:"app/components/storage-browser/storage-browser.html"}})}angular.module("gcloudConsole").config(t),t.$inject=["$stateProvider"],e.$inject=["$gcPlugin"]}(),function(){"use strict";function t(t,e){var n=e("{{controller}} as plugin"),o=e('"{{view}}"');return{restrict:"A",scope:{controller:"=pluginController",view:"=pluginView"},link:function(e,r){r.attr("ng-controller",n(e)),r.removeAttr("plugin-controller"),r.attr("ng-include",o(e)),r.removeAttr("plugin-view"),t(r)(e)}}}angular.module("gcloudConsole").directive("pluginController",t),t.$inject=["$compile","$interpolate"]}(),function(){"use strict";function t(t,e){angular.extend(this,t)}angular.module("gcloudConsole").controller("PluginCtrl",t),t.$inject=["plugin","project"]}(),function(){"use strict";function t(t){t.state("login",{controller:"LoginCtrl",controllerAs:"mv",url:"/login",templateUrl:"app/login/login.html"})}angular.module("gcloudConsole").config(t),t.$inject=["$stateProvider"]}(),function(){"use strict";function t(t,e){function n(){return e.login().then(function(){t.go("projects")})}var o=this;o.login=n}angular.module("gcloudConsole").controller("LoginCtrl",t),t.$inject=["$state","GAuth"]}(),function(){"use strict";function t(t,e,n,o,r){n.setClient(r),t.$on("$stateChangeError",function(){console.log(arguments)}),t.$on("$locationChangeSuccess",function(t){o.isLogin()||(t.preventDefault(),n.checkAuth().then(null,function(){return n.login()}).then(function(){e.sync()}))}),e.listen()}angular.module("gcloudConsole").run(t),t.$inject=["$rootScope","$urlRouter","GAuth","GData","CLIENT_ID"]}(),function(){"use strict";function t(t){t.deferIntercept(),t.otherwise(function(t){var e=t.get("GData");return e.isLogin()?"/projects":"/login"})}angular.module("gcloudConsole").config(t),t.$inject=["$urlRouterProvider"]}(),function(){"use strict";angular.module("gcloudConsole").constant("System",System).constant("CLIENT_ID","288560394597-82lbmhf7077sl5bfp1ll4nnjbhi27etn.apps.googleusercontent.com")}(),function(){"use strict";function t(t,e){var n=t.extendPalette("grey",{0:"#9e9e9e",500:"#fafafa"});t.definePalette("consolePalette",n),t.theme("default").primaryPalette("consolePalette").accentPalette("blue"),e.config({paths:{"*":"*.js","github:*":"https://github.jspm.io/*.js","npm:*":"https://npm.jspm.io/*.js"}})}angular.module("gcloudConsole").config(t),t.$inject=["$mdThemingProvider","System"]}(),angular.module("gcloudConsole").run(["$templateCache",function(t){t.put("app/login/login.html",'<div flex="" layout="column" layout-align="center center" layout-margin="" class="layout"><div class="login-logo"><img src="assets/images/logo-vertical.svg" alt="Google Developers Console"></div><md-button class="md-primary md-raised" ng-click="mv.login()">Login</md-button></div>'),t.put("app/project/project.html",'<md-sidenav flex="" md-is-locked-open="true" class="md-sidenav-left md-whiteframe-z1 project-nav"><ul class="project-nav-list"><li><a ui-sref="plugin({ pluginId: \'bucket-explorer\' })" class="project-nav-link">Bucket Explorer</a></li></ul></md-sidenav><div layout="column" flex="" ui-view=""></div>'),t.put("app/plugin/plugin.html",'<div flex="" layout="column" plugin-controller="plugin.controller" plugin-view="plugin.templateUrl"></div>'),t.put("app/projects/projects.html",'<section layout="column" flex=""><navbar projects="projects.list" user="gapi.user"></navbar><div ui-view="" layout="row" layout-margin="" flex=""></div></section>'),t.put("app/components/navbar/navbar.html",'<md-toolbar layout="row" layout-align="start center" class="md-whiteframe-z1 navbar"><a ui-sref="projects" title="Developer Console Projects"><img class="navbar-logo" src="assets/images/logo-color.svg" alt="gcloud"></a><md-menu layout="column" class="navbar-project-selector"><md-button ng-click="$mdOpenMenu($event)">{{navbar.selectedProject}}<md-icon class="material-icons">arrow_drop_down</md-icon></md-button><md-menu-content width="3"><md-menu-item ng-repeat="option in navbar.projects"><md-button ui-sref="project({ projectId: option.projectId })" class="navbar-project-link">{{option.name}}</md-button></md-menu-item></md-menu-content></md-menu><span flex=""></span><md-button class="md-icon-button"><md-tooltip>Settings</md-tooltip><md-icon>settings</md-icon></md-button><md-menu layout="column"><md-button class="md-icon-button" ng-click="$mdOpenMenu($event)" aria-label="Open user actions menu"><img class="navbar-user-icon" ng-src="{{navbar.user.picture}}"></md-button><md-menu-content><md-menu-item><md-button ng-click="navbar.logout()">Sign out</md-button></md-menu-item></md-menu-content></md-menu></md-toolbar>'),t.put("app/components/storage-browser/storage-browser.html",'<md-content flex="" class="md-whiteframe-z1"><ul><li ng-repeat="bucket in plugin.buckets">{{bucket.name}}</li></ul></md-content>')}]);