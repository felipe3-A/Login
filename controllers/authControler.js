// Unir regisro y autenticar login
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../db/db.js')
const { promisify } = require('util')

// metodo para registro
exports.registro = async (req, res) => {
    // Capturar datos
    // Enviar datos al sql
    try {
        const name = req.body.name
        const user = req.body.user
        const pass = req.body.pass
        let passHash = await bcryptjs.hash(pass, 8)
        //  console.log(passHash)
        // llamar a conexion
        conexion.query('INSERT INTO users SET ?', { user: user, name: name, pass: passHash }, (error, result) => {
            //verifica si hay errores mostrar por consola, si no los hay dirigir al usuario a otra vista
            if (error) { console.log(error) }
            res.redirect('/')
        })
    } catch (error) {
        console.log(error)
    }
}
exports.login = async (req, res) => {
    try {
        const user = req.body.user
        const pass = req.body.pass
        console.log(user + " - " + pass)

        if (!user || !pass) {
            res.render('login', {
                alert: true,
                alertTitle: "Advertido",
                alertMessage: "Ingrese un usuario y contraseña",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'

            }
            )
        } else {
            conexion.query('select *from users WHERE user =?', [user], async (error, result) => {
                if (result.length == 0 || !(await bcryptjs.compare(pass, result[0].pass))) {
                    res.render('login', {
                        alert: true,
                        alertTitle: "ERROR",
                        alertMessage: "Incorrectos: usuario y contraseña",
                        alertIcon: 'ERROR',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    })
                } else {
                    // Inicio de secion verificada

                    const id = result[0].id
                    const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    // Generar token sin fecha de expiracion
                    // const token = jwt.sign({ id: id },process.env.JWT_SECRETO,)
                    console.log("token " + token + " para el usuario :" + user)
                    // Configurar la cokkie
                    const cokkiesOpcions = {
                        expires: new Date(Date.now() * process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    // Nombre de la cookie
                    res.cokkie('jwt', token, cokkiesOpcions)
                    res.render('login', {
                        alert: true,
                        alertTitle: "CONEXION EXITOSA",
                        alertMessage: "Login correcto",
                        alertIcon: 'success',
                        showConfirmButton: true,
                        timer: 800,
                        ruta: ''
                    })
                }

            })
        }


    } catch (error) {
console.log(error)
    }
}