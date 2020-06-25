'Use Strict'
var Empresa = require('../Modelos/empresas');
var Centro = require('../Modelos/centros');
var moment = require('moment');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
var momentz = require('moment-timezone');

var controller = { //Inicio Del Controlador 
    guardar: async(req, res) => {//guardar centro  
            let idEmpresa = req.params.idEmpresa;
            const empresa = new Empresa();
            var params = req.body;
            const centro = new Centro();
            let fecha = new Date();
            let fechaMX = moment(fecha).tz("America/Mexico_City");
            let centro_existe = await Centro.findOne({ 'nombre': params.nombre});
            if (centro_existe){ 

                
            return res.status(400).send('El Centro Ya Existe....')}
            if (!centro_existe){
            centro.nombre = params.nombre;
            centro.telefono = params.telefono;
            centro.calle = params.calle;
            centro.colonia = params.colonia;
            centro.cp = params.cp;       
            centro.estatus = true;   
            centro.timestamp = fechaMX._d;    
          
            let empresa_existe = await Empresa.findOne({_id: idEmpresa});
            if (!empresa_existe){ 
            return res.status(400).send('No Existe La Empresa O Empresa Para Asignar Centro De Trabajo....')}
            if (empresa_existe){
                
                Empresa.find({_id: idEmpresa}, (err, empresa) => {
                    var arrayCentro = empresa[0].idCentro;
                    arrayCentro.push(centro._id); 
                    Empresa.findOneAndUpdate({_id: idEmpresa}, {idCentro: arrayCentro}, (err, transferenciaUpdated) => {});
                    centro.save((err, centroStored) => {
                        if (err || !centroStored) {}})
                         return res.status(200).send({});
                        });
        }
   }

}, //fin de guardar centro

    listarCA: async(req, res) => {//listar centros activas  
        var query = Centro.find({ "estatus": true }, );
        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(5);
        }
        query.sort('-_id').exec((err, centros) => {
            if (err) {
                return res.status(500).send({});
            }
            if (!centros) {
                return res.status(404).send({});
            }
            return res.status(200).send({ centros });
        });
    },//fin de listar centros activas

    listarCI: async(req, res) => {//listar centros inactivas
        var query = Centro.find({ "estatus": false }, );
        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(5);
        }
        query.sort('-_id').exec((err, centros) => {
            if (err) {
                return res.status(500).send({});
            }
            if (!centros) {
                return res.status(404).send({});
            }
            return res.status(200).send({ centros });
        });
    }, //fin de listar empresas inactivas

    desactivar: async(req, res) => {//Metodo Guardar  
        var centID = req.params.id;
        var params = req.body;
        Centro.findOneAndUpdate({_id: centID}, {estatus: false}, (err, centroHide) => {
            return res.status(200).send("Centro Desactivado.");  
        });
    },

    buscar: async(req, res) => {//Metodo Guardar  
        var buscar = req.params.buscar;
        Centro.find({
                "$or": [
                    { "nombre": { "$regex": buscar, "$options": "i" } }
                ]
            })
            .sort([
                ['date', 'descending']
            ])
            .exec((err, centroSearch) => {
                if (err) {
                    return res.status(500).send({});
                }
                if (!centroSearch || centroSearch.length <= 0) {
                    return res.status(404).send({});
                }
                return res.status(200).send({ centroSearch });
            });
    },












    
    importar: async(req, res) => {//importar varias centros a la vez
    },//fin de importar centros

};
module.exports = controller;