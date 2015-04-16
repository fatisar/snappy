'use strict'

angular.module 'snappyRsvpApp'
.factory 'Host', ($resource) ->
  $resource '/api/hosts/:id/:controller',
    id: '@_id'
  ,
    changePassword:
          method: 'PUT'
          params:
            controller: 'password'

    get:
      method: 'GET'
      params:
        id: 'me'


angular.module 'snappyRsvpApp'
.factory 'Guest', ($resource) ->
  $resource '/api/guests/:id/:controller',
    id: '@_id'
  ,
    changePassword:
          method: 'PUT'
          params:
            controller: 'password'

    get:
      method: 'GET'
      params:
        id: 'me'

