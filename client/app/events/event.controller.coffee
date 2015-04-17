'use strict'

angular.module 'snappyRsvpApp'
.controller 'EventCtrl', ($scope, $stateParams, Event) ->
  $scope.event = Event.get({id: $stateParams.eventId});
