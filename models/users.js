const { Schema, model, Types } = require('mongoose');


const User = new Schema(
    {
      username: {
        type: String,
        unique: true,
        trim: true,
        required: 'Please enter a username! D:'
      },
      email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address D:']
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      friends: [        {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      // prevents virtuals from creating duplicate of _id as `id`
      id: false
    }
  );

// get total count of friends = not sure if this will work
User.virtual('friendCount').get(function() {
    return this.friends.reduce(
      (total, friends) => total + friends.length + 1,
      0
    );
  });