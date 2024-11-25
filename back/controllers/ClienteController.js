'use strict'

var Cliente = require('../models/cliente');
var bcrypt = require('bcrypt-nodejs');

const registro_cliente = async function(req,res){
    //
    var data = req.body;
    var clientes_arr = [];

    clientes_arr = await Cliente.find({email:data.email});

 //registro
    if(clientes_arr.length == 0){
        //var reg = await Cliente.create(data);

        if(data.password){
            bcrypt.hash(data.password, async function(err,hash){
                if(hash){
                    console.log(hash);
                    res.status(200).send({message:true});
                }                
            })
        }else{
            res.status(200).send({message:'no hay una contraseña',data:undefined});            
        }

    }else{
        res.status(200).send({message:'El correo ya fue registrado',data:undefined});
    }}

   
module.exports = {
    registro_cliente
}