const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcryptjs')

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

UserSchema.pre('save', function(next){
  if (this.isModified('password') || this.isNew())
  this.password = bcrypt.hashSync(this.password, 12)
  next()
})

UserSchema.pre('findOneAndUpdate', function(next) {
  this.update({}, { password: bcrypt.hashSync(this._update.password, 12) } );
  next()
})

module.exports = mongoose.model('User', UserSchema)
