'use strict'

angular.module 'snappyRsvpApp'
.controller 'MainCtrl', ($scope, $http) ->
  $scope.events = []

  $http.get('/api/events').success (events) ->
    $scope.events = events


  $scope.addEvent = ->
    console.log("sup")
    return if $scope.newEvent is ''
    $http.post '/api/events',
      name: $scope.newEvent

    $scope.newEvent = ''

  $scope.deleteEvent = (event) ->
    $http.delete '/api/event/' + event._id
