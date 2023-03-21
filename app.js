const express = require('express')
const dotenv= require('dotenv')
const cookieParser = require('cookie-parser')

const app = express()
// PREPARAR EL MOTOR DE PLANTILLAS
app.set('view engine', 'ejs')

// preparar la carpeta public para archivos estaticos
app.use(express.static('public'))

// Procesador de datos enviados desde los forms o formularios
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

// Prepara variables de entorno
dotenv.config({path: './env/.env'})

// Par usar las cookies 
//desactivar en la primera prueba del servidor
app.use(cookieParser)


// llamar al router
app.use('/',require ('./routes/router.js'))


app.listen(3000,()=>{
    console.log('Servidor activo en la ruta http://localhost:3000')
})