const mongoose = require('mongoose')

mongoose.connect("mongodb://locahost/blog").then(
  () => {
    console.log("conectado ao mongo")
  },
).catch(err =>
  console.log("impossvel conectar ao banco"),
)
