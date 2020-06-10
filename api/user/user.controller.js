const jwt = require('jsonwebtoken')

const User = require('./user.model')
const config = require('../../config/environment')

/* Get all users */
function showAll(req, res) {
    return User.find().exec()
    .then(users => res.status(200).json(users))
    .catch(handleError(res))
}

/* Create user */

function create(req, res){
    const newUser = new User(req.body)
    newUser.provider = 'local'
    newUser.role = 'user'
 //  Before create a user return token to init session
    return newUser.save()
        .then((user) => {
            const token = jwt.sign(
                {_id: user._id}, 
                config.secrets.session,
                { expiresIn: 60*60*5}
            )
            res.json({ token })
        }
        )
        .catch(validationError(res))
}

function handleError(res, code) {
    const statusCode = code || 500
    return (err) => {
      res.status(statusCode).send(err)
    }
  }


function validationError(res, code){
    const statusCode = code || 422
    return err => res.status(statusCode).json(err)
}

module.exports = {
    showAll,
    create
}