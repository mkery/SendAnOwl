var Friend = require('../models/friend');

exports.index = function(req, res) {
  Friend.find({}, 'first_name family_name')
    .exec(function (err, list_friends) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('index', { title: 'Friend List', friend_list: list_friends });
    });
};

// Display list of all Friends
exports.friend_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Friend list: ' + req.params.id);
};

// Display detail page for a specific Friend
exports.friend_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Friend detail: ' + req.params.id);
};

// Display Friend create form on GET
exports.friend_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Friend create GET');
};

// Handle Friend create on POST
exports.friend_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Friend create POST');
};

// Display Friend delete form on GET
exports.friend_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Friend delete GET');
};

// Handle Friend delete on POST
exports.friend_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Friend delete POST');
};

// Display Friend update form on GET
exports.friend_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Friend update GET');
};

// Handle Friend update on POST
exports.friend_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Friend update POST');
};
