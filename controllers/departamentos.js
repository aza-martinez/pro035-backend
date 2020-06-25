'Use Strict'
var Departamento = require('../Modelos/departamentos');
var Area = require('../Modelos/areas');
var moment = require('moment');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
var momentz = require('moment-timezone');


// dispersion.idTransferencia.push(transferencia._id);


var controller = { //Inicio Del Controlador 
    guardar: async(req, res) => {//guardar area  
        let idArea = req.params.idArea;
        const departamento = new Departamento();
        var params = req.body;
        const area = new Area();
        let fecha = new Date();
        let fechaMX = moment(fecha).tz("America/Mexico_City");
        let departamento_existe = await Departamento.findOne({ 'nombre': params.nombre});
        if (departamento_existe){ 
        
        console.log(departamento_existe);
        console.log(departamento_existe._id);
        Area.find({_id: idArea}, (err, area) => {
            
        console.log(area);
        var arrayDepartamento = area[0].idDepartamento;
        console.log(area);
        arrayDepartamento.push(departamento_existe._id); 
        Area.findOneAndUpdate({_id: idArea}, {idDepartamento: arrayDepartamento}, (err, transferenciaUpdated) => {});
        return res.status(400).send('El Departamento Ya Existe, Se Descartara Guardarlo Pero Se Vinculara Al Área De Trabajo Ó Centro....')});
        }

        if (!departamento_existe){
        departamento.nombre = params.nombre;
        departamento.estatus = true;   
        departamento.timestamp = fechaMX._d;    
      
        let area_existe = await Area.findOne({_id: idArea});
        if (!area_existe){ 
        return res.status(400).send('No Existe Área De Trabajo....')}

        if (area_existe){
            Area.find({_id: idArea}, (err, centro) => {
                var arrayDepartamento = centro[0].idDepartamento;
                arrayDepartamento.push(departamento._id); 
                Area.findOneAndUpdate({_id: idArea}, {idDepartamento: arrayDepartamento}, (err, transferenciaUpdated) => {});
                departamento.save((err, areaStored) => {
                    if (err || !areaStored) {}})
                     return res.status(200).send({});
                    });

    }
}

    }, //fin de guardar area

    listarDA: async(req, res) => {//listar areas activas  
        var query = Departamento.find({ "estatus": true }, );
        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(5);
        }
        query.sort('-_id').exec((err, departamentos) => {
            if (err) {
                return res.status(500).send({});
            }
            if (!departamentos) {
                return res.status(404).send({});
            }
            return res.status(200).send({ departamentos });
        });
    },//fin de listar areas activas

    listarDI: async(req, res) => {//listar areas inactivas
        var query = Departamento.find({ "estatus": false }, );
        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(5);
        }
        query.sort('-_id').exec((err, departamentos) => {
            if (err) {
                return res.status(500).send({});
            }
            if (!departamentos) {
                return res.status(404).send({});
            }
            return res.status(200).send({ departamentos });
        });
    }, //fin de listar areas inactivas

    desactivar: async(req, res) => {//desactivar areas  
        var depaID = req.params.id;
        var params = req.body;
        Departamento.findOneAndUpdate({_id: depaID}, {estatus: false}, (err, departamentoHide) => {
            return res.status(200).send("Departamento Desactivado.");  
        });
    },

    buscar: async(req, res) => {//buscar area  
        var buscar = req.params.buscar;
        Departamento.find({
                "$or": [
                    { "nombre": { "$regex": buscar, "$options": "i" } }
                ]
            })
            .sort([
                ['date', 'descending']
            ])
            .exec((err, departamentoSearch) => {
                if (err) {
                    return res.status(500).send({});
                }
                if (!departamentoSearch || departamentoSearch.length <= 0) {
                    return res.status(404).send({});
                }
                return res.status(200).send({ departamentoSearch });
            });
    },












    
    importar: async(req, res) => {//importar varias centros a la vez
    },//fin de importar centros

};
module.exports = controller;