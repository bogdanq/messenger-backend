const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

mongoose.plugin(uniqueValidator)

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: 'User email already',
      lowercase: true,
      required: 'Email is required',
      trim: true,
    },
    password: {
      type: String,
      required: 'Password is required',
      trim: true,
    },
    firstName: {
      type: String,
      lowercase: true,
      required: 'first name is required',
      trim: true,
    },
    lastName: {
      type: String,
      lowercase: true,
      required: 'lastName is required',
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

UserSchema.statics.createFields = ['email', 'password', 'firstName', 'lastName']

module.exports = mongoose.model('User', UserSchema)
