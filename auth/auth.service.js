/* Auth middleware */

const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const compose = require('composable-middleware')
const User = require('../api/user/user.model')

const config = {
    secrets : {
        session : 'mi-frase_s3cre3t4'
    },
    userRoles: ['admin', 'manager', 'user']
}

const validateJwt = expressJwt({
    secret: config.secrets.session,
})

/* Attach user object to the request if authenticated, otherwise return 403 */

function isAuthenticated() {
    return compose()
        .use( (req, res, next) => {
            //allow access_token
            if (req.query && req.query.hasOwnProperty('access_token')){
                req.headers.authorization = `Bearer ${req.query.access_token}`
            }
            validateJwt(req, res, next)
        })
        .use((req, res, next)=>{
            User.findById(req.user._id).exec()
                .then((user)=>{
                    if(!user){
                        return res.status(401).end()
                    }
                    req.user = user
                    next()
                    return null
                })
                .catch(err =>next(err))
        })
}


/* Check if user has autorization to route */

function hasRole(roleRequired) {
    if(!roleRequired) {
        throw new Error('Required role')
    }
    return compose()
        .use(isAuthenticated())
        .use((req, res, next)=>{
            if(config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)){
                return next()
            }
            return res.status(403).send('Forbidden')
        })

    }


    /* Return a jwt signed*/

    function signToken(id, role){
        return jwt.sign({_id: id, role}, config.secrets.session, { expiresIn :  60 * 60 * 5 } )
    }


    module.exports = {
        isAuthenticated, 
        hasRole,
        signToken
    }