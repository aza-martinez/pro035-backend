'Use Strict'
var Encuesta = require('../Modelos/encuestas');
var moment = require('moment');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
var momentz = require('moment-timezone');

var controller = { //Inicio Del Controlador 

    listarE: async(req, res) => {
        var idEncuesta = req.params.idEncuesta;
        Encuesta.find({_id:idEncuesta})
        .populate({ 
            path: 'idCategoria',
            populate: {
                path: 'idDominio',
                model: 'Dominios',

                    populate: {
                        path: 'idDimension',
                        model: 'Dimensiones',

                            populate: {
                                path: 'idPreguntas',
                                model: 'Preguntas',

                                    populate: [{
                                        path: 'idMensaje',
                                        model: 'Mensajes',
                                    },{
                                        path: 'idRespuestas',
                                        model: 'Respuestas',
                            }] 
                            }
                    }
            }
    })
        .sort([['date', 'descending']])                   
        .exec((err, registros) => {        
                if (err) {
                    console.log(err);
                    return res.status(500).send({err});
                }
                if (!registros || registros.length <= 0) {}  
     
                console.log(registros);
                return res.status(200).send(registros)
        });
    },

listarT: async(req, res) => {
    var nombre = req.params.nombre;
    Encuesta.find({})
    .populate({ 
        path: 'idCategoria',
            populate: {
                path: 'idDominio',
                model: 'Dominios',

                    populate: {
                        path: 'idDimension',
                        model: 'Dimensiones',                     

                            populate: {
                                path: 'idPreguntas',
                                model: 'Preguntas',  

                                    populate: [{
                                        path: 'idMensaje',
                                        model: 'Mensajes',
                                    },{
                                        path: 'idRespuestas',
                                        model: 'Respuestas',                             
                                    
                            }]
                                         
                            }
                    }         
            }  
    })  
    .sort([['date', 'descending']])                   
    .exec((err, registros) => {            
            if (err) {
                return res.status(500).send({err});
            }
            if (!registros || registros.length <= 0) {}  
 
            console.log(registros);
            return res.status(200).send(registros)
    });
}











};
module.exports = controller;