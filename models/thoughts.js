const { Schema, model, Types } = require('mongoose');

const reationSchema = new Schema({
    reactionId:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: "Who's reaction is this!"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
    },
    {
    toJSON: {
        getters: true
        }
    }
);

const ThoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        min: [1, 'Too few characters for a full thoguht'],
        max: [280, 'Too many Characters'],
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
      username: [        {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
      reactions : [reationSchema]
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
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('Comment', ThoughtSchema);

module.exports = Thought;