'use strict'

angular.module 'snappyRsvpApp'
.controller 'MainCtrl', ($scope, $http, $state) ->
  $scope.events = []

  $scope.format = 'MMMM d, yyyy'

  $scope.toggle = ($event) ->
    $event.preventDefault()
    $event.stopPropagation()

    $scope.opened = true

  $http.get('/api/events').success (events) ->
    $scope.events = events


  $scope.saveEvent = ->
    return if $scope.newEvent is ''
    $http.post('/api/events', $scope.newEvent).success (response) ->
      $scope.events.push(response.event)
      $state.go('events.id', {eventId: response.event._id})

    $scope.newEvent = ''

  $scope.deleteEvent = (event) ->
    $http.delete '/api/event/' + event._id
