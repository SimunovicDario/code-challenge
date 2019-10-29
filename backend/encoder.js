module.exports = function encoder (req, res) {
  const encodingString = req.body

  var output = encodingString.split('')

  console.log(output)

  return res.status(401).send('Only letters are allowed.')
}
