/*const Sequelize =require ('sequelize')

const sequelize = new Sequelize('prefaculdade', 'postgres', 'admin', {
  host: "localhost",
  dialect: "postgres",
})

sequelize.authenticate().then( function(){
  console.log("conectado a base de dados ")
}).catch( function(erro){
  console.log(" Houve um erro ao conectar "+ erro)
})


const tipos = sequelize.define('tipos')

//tipos.sync({ force: true })

tipos.create({
  descricao: "'outra coisa '",
  outra_coisa: 21,
})
*/
const express = require('express')

const app = express()
const PORT = 8080

app.listen( PORT, function (params){
  console.log("Sevidor rodando naporta "+PORT)
} )
