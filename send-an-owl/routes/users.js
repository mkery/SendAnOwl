var express = require('express');
var router = express.Router();

// Require controller modules
var friend_controller = require('../controllers/friendController');

/// AUTHOR ROUTES ///

/* GET catalog home page. */
router.get('/', friend_controller.index);

/* GET request for creating Friend. NOTE This must come before route for id (i.e. display friend) */
router.get('/friend/create', friend_controller.friend_create_get);

/* POST request for creating Friend. */
router.post('/friend/create', friend_controller.friend_create_post);

/* GET request to delete Friend. */
router.get('/friend/:id/delete', friend_controller.friend_delete_get);

// POST request to delete Friend
router.post('/friend/:id/delete', friend_controller.friend_delete_post);

/* GET request to update Friend. */
router.get('/friend/:id/update', friend_controller.friend_update_get);

// POST request to update Friend
router.post('/friend/:id/update', friend_controller.friend_update_post);

/* GET request for one Friend. */
router.get('/friend/:id', friend_controller.friend_detail);

/* GET request for list of all Friends. */
router.get('/friends', friend_controller.friend_list);


module.exports = router;
