/* global getSlug:true */
(function() {
  'use strict';

  angular
    .module('gcloudConsole')
    .controller('ProjectsCtrl', ProjectsCtrl);

  function ProjectsCtrl($projects, $mdDialog) {
    var projects = this;

    projects.map = $projects.projects;
    for (var projectId in projects.map) {
      projects.map[projectId].dashboards = $projects.getProject(projectId).dashboards.$data;
    }

    projects.createDashboard = createDashboard;

    function createDashboard(projectId) {
      var $project = $projects.getProject(projectId);

      $mdDialog.show({
        parent: angular.element(document.body),
        templateUrl: 'app/projects/create-dashboard-dialog.html',
        controller: DialogCtrl,
        controllerAs: 'dialog',
        bindToController: true
      });

      /** @ngInject */
      function DialogCtrl($state) {
        var dialog = this;

        dialog.name = 'My Custom Dashboard';

        dialog.create = create;
        dialog.getRef = getRef;
        dialog.close = closeDialog;

        function create() {
          return $project.createDashboard(dialog.name)
            .then(function($dashboard) {
              return $state
                .go('dashboard', {
                  projectId: $project.id,
                  dashboardId: $dashboard.id
                })
                .then(closeDialog);
            });
        }

        function getRef(name) {
          return $project.getDashboard(getSlug(name)).$dataRef;
        }

        function closeDialog() {
          $mdDialog.hide();
        }
      }
    }
  }
}());
