const express = require('express');
const router = express.Router()
const authController=require('../controllers/authControler.js')

// Vistas
router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/login',(req,res)=>{
    res.render('login',{alert:false})
})

router.get('/registro',(req,res)=>{
    res.render('registro')
})

// Metodos
router.post('/registro', authController.registro)
router.post('/login', authController.login)
module.exports = router