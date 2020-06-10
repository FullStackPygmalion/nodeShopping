/* User Model */

const crypto = require('crypto')
const mongoose = require('mongoose')

const { Schema } = mongoose

const authTypes = ['github', 'facebook', 'google']



const AdittionalDataSchema = new Schema({
    address: { type: String, uppercase: true },
    phoneNumber: { type: String },
    country: { type: String, default: 'COLOMBIA', uppercase: true },
    city: { type: String, default: 'MEDELLIN', uppercase: true },
    picture: { type: String, lowercase: true, trim: true }
}, { _id: false })

/*  Main Data Schema */
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required() {
            if (authTypes.indexOf(this.provider) === -1) {
                return true
            }
            return false
        },
    },
    role: { type: String, default: 'user' },
    password: {
        type: String,
        required() {
            if (authTypes.indexOf(this.provider) === -1) {
                return true
            }
            return false
        },
    },
    adittionalData: AdittionalDataSchema,
    provider: String,
    salt: String,
    gooogle: {},
    github: {},
    passwordResetToken: String,
    passwordResetExpires: Date,
}, { timestamps: true })


/* Schema Virtual */

// Public profile information
UserSchema
    .virtual('profile')
    .get(function() {
        return {
            name: this.name,
            role: this.role,
        }
    })

// Non-sensitive info we'll be putting in the token
UserSchema
    .virtual('token')
    .get(function() {
        return {
            _id: this._id,
            role: this.role,
        }
    })

const validatePresenceOf = function(value) {
    return value && value.length;
};

/** */

UserSchema
    .pre('save', function(next) {
        // Handle new/update passwords
        if (!this.isModified('password')) {
            return next();
        }

        if (!validatePresenceOf(this.password)) {
            if (authTypes.indexOf(this.provider) === -1) {
                return next(new Error('Invalid password'));
            }
            return next();
        }

        // Make salt with a callback
        return this.makeSalt((saltErr, salt) => {
            if (saltErr) {
                return next(saltErr);
            }
            this.salt = salt;
            this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
                if (encryptErr) {
                    return next(encryptErr);
                }
                this.password = hashedPassword;
                return next();
            });
        });
    });

UserSchema.methods = {

     /* Authenticate - check if the passwords are the same */


    authenticate(password, callback) {
        if (!callback) {
            return this.password === this.encryptPassword(password);
        }

        return this.encryptPassword(password, (err, pwdGen) => {
            if (err) {
                return callback(err);
            }

            if (this.password === pwdGen) {
                return callback(null, true);
            }
            return callback(null, false);
        });
    },

    /** Make salt Optional salt byte size, default to 16 */

    makeSalt(...args) {
        const defaultByteSize = 16;
        let byteSize;
        let callback;

        if (typeof args[0] === 'function') {
            callback = args[0];
            byteSize = defaultByteSize;
        } else if (typeof args[1] === 'function') {
            callback = args[1];
        } else {
            throw new Error('Missing Callback');
        }

        if (!byteSize) {
            byteSize = defaultByteSize;
        }

        return crypto.randomBytes(byteSize, (err, salt) => {
            if (err) {
                return callback(err);
            }
            return callback(null, salt.toString('base64'));
        });
    },
    encryptPassword(password, callback) {
        if (!password || !this.salt) {
            if (!callback) {
                return null;
            }
            return callback('Missing password or salt');
        }

        const defaultIterations = 10000;
        const defaultKeyLength = 64;
        const salt = Buffer.from(this.salt, 'base64');

        if (!callback) {
            return crypto.pbkdf2Sync(
                password,
                salt,
                defaultIterations,
                defaultKeyLength,
                'sha256',
            ).toString('base64');
        }

        return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha256', (err, key) => {
            if (err) {
                return callback(err);
            }
            return callback(null, key.toString('base64'));
        });
    },
};

UserSchema.path('role').validate(role => /admin|manager|user/, 'assigned role is invalid')

module.exports = mongoose.model('User', UserSchema)
