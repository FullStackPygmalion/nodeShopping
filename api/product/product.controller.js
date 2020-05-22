/* Main controller for product  */

const Product = require('./product.model')


function create(req, res) {
  return Product.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res))
}

function index(req, res) {
  return Product.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res))
}

function show(req, res){
  console.log(req)
  return Product.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res, 200))
    .catch(handleError(res))
}

function respondWithResult(res, code) {
  const statusCode = code || 200
  return (entity) => {
    if (entity) {
      res.status(statusCode).json(entity)
    }
  }
}

function handleEntityNotFound(res){
  return (entity) => {
    if(!entity) {
      res.status(404).end()
      return null
    }
    return entity
  }
}

function handleError(res, code) {
  const statusCode = code || 500
  return (err) => {
    res.status(statusCode).send(err)
  }
}

module.exports = {
  create,
  index,
  show
}
