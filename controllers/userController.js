// ObjectId() method for converting studentId string into an ObjectId for querying database
const req = require('express/lib/request');
const { Thought, User } = require('../models');


module.exports = {
  // Get all Users
  getAllUsers(req, res) {
    User.find()
      .then(async(users) => 
        !users
          ? res.status(404).json({ message: 'No users found'})
          : res.json(users)
      )
  },
  // Get a single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new User
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },
  //update a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        $set: req.body
      },
      {
        runValidators: true,
        new: true
      }
    ).then((user) => {
      !user 
        ? res.status(404).json({ message: 'No User' })
        : res.json(user)
    })
  },
  // Delete a User & its thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.deleteMany({
              _id: {
                $in: user.thoughts
              }
            }
          )
      )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({
              message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'User and Associated thoughts successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a friend to User
  addFriend(req, res) {
    console.log('You are adding a friend!');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendsId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No User found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove friend from a User
    removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendsId }},
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No friend found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
