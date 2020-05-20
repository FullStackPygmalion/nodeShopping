/* Main controller for product  */

const Product = require('./product.model')


function create(req, res) {
  return Product.create(req.body)
    .then(respondWithResult(res))
    .catch(handleError(res))
}

module.exports = {
  create
}

function respondWithResult(res, code) {
  const statusCode = code || 200
  return (entity) => {
    if (entity) res.status(statusCode).json(entity)
  }
}

function handleError(res, code) {
  const statusCode = code || 500
  return (err) => {
    res.status(statusCode).send(err)
  }
}
