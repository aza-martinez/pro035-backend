'Use Strict'
var Dominio = require('../Modelos/dominios');
var Dimension = require('../Modelos/dimensiones');
var moment = require('moment');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
var momentz = require('moment-timezone');

var controller = { //Inicio Del Controlador 
    guardar: async(req, res) => {        
        const dominio = new Dominio();
        var params = req.body;
        let fechaMX = moment(fecha).tz("America/Mexico_City");
        dominio.numGuia = params.numGuia;
        dominio.nombreDominio = params.nombreDominio;
        dominio.idDimension = params.idDimension;
        var fecha = new Date();     
        dominio.timestamp=fechaMX._d; ;
        dominio.save((err, dominioStored) => {
            if (err || !dominioStored) {
                console.log(err);
                return res.status(404).send({});
            }
            res.status(200).send({...dominioStored._doc})
            
          });
}, 

    listar: async(req, res) => {
    
        nombre = req.params.nombre;
        var query = Dominio.find({nombreDominio:nombre}, );
        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(5);
        }
        query.sort('-_id').exec((err, preguntas) => {
            if (err) {
                return res.status(500).send({});
            }
            if (!preguntas) {
                return res.status(404).send({});
            }
            return res.status(200).send({ preguntas });
        });
},


listar2: (req, res) => {
    var nombre = req.params.nombre;
    Dominio.find({nombreDominio:nombre})
    .populate({ 
        path: 'idDimension',
        populate: {
          path: 'idPreguntas',
          model: 'Preguntas'
        }}) 
        .sort([
            ['date', 'descending']
        ])
        .exec((err, registros) => {
            if (err) {
                return res.status(500).send({err});
            }
            if (!registros || registros.length <= 0) {}

            return res.status(200).send(registros)
        });
},


listar3: (req, res) => {
    var nombre = req.params.nombre;
    Dominio.find({})
    .populate({ 
        path: 'idDimension',
        populate: {
          path: 'idPreguntas',
          model: 'Preguntas'
        }}) 
        .sort([
            ['date', 'descending']
        ])
        .exec((err, registros) => {
            if (err) {
                return res.status(500).send({err});
            }
            if (!registros || registros.length <= 0) {}

            return res.status(200).send(registros)
        });
}










};
module.exports = controller;