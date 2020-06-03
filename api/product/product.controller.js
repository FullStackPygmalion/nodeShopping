/* Main controller for product  */

const Product = require('./product.model')


function create(req, res) {
  return Product.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res))
}

function showAll(req, res) {
  return Product.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res))
}

function showSingle(req, res) {
  return Product.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res, 200))
    .catch(handleError(res))
}

function update(req, res) {
  return Product.findOneAndUpdate(req.params.id, req.body, { new: true }).exec()
    .then(respondWithResult(res))
    .catch(handleError)
}

function deleteProduct(req, res) {
  return Product.findOneAndRemove(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .then(handleError(res))
}

function respondWithResult(res, code) {
  const statusCode = code || 200
  return (entity) => {
    if (entity) {
      res.status(statusCode).json(entity)
    }
  }
}

function handleEntityNotFound(res) {
  return (entity) => {
    if (!entity) {
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
  showAll,
  showSingle,
  update,
  deleteProduct
}
