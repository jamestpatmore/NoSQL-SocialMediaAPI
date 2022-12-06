const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId})
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
    createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId})
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.findOneAndUpdate(
            { _id: req.params.userID},
            {$pull: {thoughts: thought._id}},
            {new: true}
          )
      )
      .then(() => res.json({ message: 'thought has been deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought).json({ message: 'Thought has been updated!' })
      )
      .catch((err) => res.status(500).json(err));
  },
  //add reaction
  addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body }},
      { runValidators: true, new: true }
    )
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No friend found with that ID'})
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //delete reaction 
  deleteReaction(req, res) {
    console.log(req.params)
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId }}},
      { runValidators: true, new: true }
    )
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No friend found with this ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  }
};

 
