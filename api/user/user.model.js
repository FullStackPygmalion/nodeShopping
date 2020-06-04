/* User Model */

const crypto = require('crypto')
const mongoose = require('mongoose')

const { Schema } = mongoose

const authTypes = ['github', 'facebook', 'google']



const AdittionalDataSchema = new Schema({
    address: { type: String, uppercase: true},
    phoneNumber: {type: String},
    country: {type: String, default: 'COLOMBIA', uppercase: true},
    city: { type: String, default: 'MEDELLIN', uppercase: true},
    picture: {type: String, lowercase: true, trim: true}
}, {_id: false})


const UserSchema = new Schema({
    name: { type: String, required: true },
    email: {type: String, lowercase:true, unique: true, trim: trim,
        required() {
            if(authTypes.indexOf(this.provider) === -1){
            return true
            }
            return false
        },
    },
    role : { type: String, default: 'user'},
    password: { type: String, 
        required() {
            if(authTypes.indexOf(this.provider) === -1){
            return true
            }
            return false
        },
    },
    adittionalData: AdittionalDataSchema,
    provider: String, 
    gooogle: {},
    github: {},
    passwordResetToken : String, 
    passwordResetExpires: Date, 
  }, { timestamps: true })


  UserSchema.path('role').validate( role => /admin|manager|user/, 'assigned role is invalid')

  module.exports = mongoose.model('User', UserSchema)