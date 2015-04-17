'use strict'

angular.module 'snappyRsvpApp'
.config ($stateProvider) ->
    $stateProvider
    .state 'events',
        url: '/events'
        templateUrl: 'app/events/main.html'
        controller: ($scope) ->
          $scope.title = 'Event'
          return

    .state 'events.id',
        url: '/:eventId'
        templateUrl: 'app/events/event.html'
        controller: 'EventCtrl'
