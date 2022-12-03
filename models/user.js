const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Your email was Wrong,please enter a valid email address",]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought"
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false
  }
);
//creating a virtual that will return the length of the users friendCount from the friend array within the model.
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User;
