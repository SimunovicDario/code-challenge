module.exports = function encoder(req, res) {
  const encodingString = req.body.input.toUpperCase()
  var input = encodingString.split('')

  if ((/^[A-Z]+$/g.test(encodingString)) && encodingString.length != 0) {
    var i = 0;
    var counter = 0;
    var output = '';
    var char = input[i];
    for (i; i < input.length; i++) {
      if (char === input[i]) {
        counter++;
      } else {
        output = output + char + counter.toString()
        counter = 1
        char = input[i]
      }
    }
    output += char + counter.toString()
    return res.send({output})
  }
  if(encodingString.length == 0){
    return res.status(400).send("String can't be empty.")
  }
  return res.status(400).send('Only letters are allowed.')
}
