// faces.js
// ======
//

define('faces', [
  'jquery'
, 'underscore'
, 'text!../templates/face.html'
], function($, _, face_template) {

  var faces_target // jQuery Object
    , class_name   // String
    , callback     // Function

  face_template = _.template(face_template)

  function load(params, _callback) {
    var url        = 'https://api.github.com/orgs/openve/members'
    faces_target   = $(params.faces_target)
    class_name     = params.class_name
    callback       = _callback

    $.getJSON(url, gotUsers)
  }

  function gotUsers(data) {
    _.each(data, function(user) {
      getDetails(user)
    })
  }

  function getDetails(user) {
    var url = 'https://api.github.com/users/' + user.login
    $.getJSON(url, function(details) {
      writeFace(user, details)
    })
  }

  function writeFace(user, details) {
    faces_target.append(face_template({
      user       : user
    , class_name : class_name
    , details    : details
    }))
  }

  return {
    load : load
  }
})
