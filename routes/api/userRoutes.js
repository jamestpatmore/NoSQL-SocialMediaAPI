const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getSingleUser).delete(deleteUser);

// /api/users/:id/friends
router.route('/:id/friends/:friendsId').post(addFriend);

// /api/users/:id/friends/:friendsId
router.route('/:id/friends/:friendsId').delete(removeFriend);

module.exports = router;
