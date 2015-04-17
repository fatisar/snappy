'use strict'

angular.module 'snappyRsvpApp'
.factory 'Event', ($resource) ->
    $resource '/api/events/:id/:controller',
        id: '@_id'
    ,
        get:
            method: 'GET'
