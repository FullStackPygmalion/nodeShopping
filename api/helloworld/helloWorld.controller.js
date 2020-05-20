/*  Example Controller */

function index(req, res) {
  return res.status(200).json({ message: 'hello fullstack' })
}

module.exports = { index }
