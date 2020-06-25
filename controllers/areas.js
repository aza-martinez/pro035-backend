'Use Strict'
var Area = require('../Modelos/areas');
var Centro = require('../Modelos/centros');
var moment = require('moment');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
var momentz = require('moment-timezone');

var controller = { 
    guardar: async(req, res) => {  
        let idCentro = req.params.idCentro;
        const area = new Area();
        var params = req.body;
        const centro = new Centro();
        let fecha = new Date();
        let fechaMX = moment(fecha).tz("America/Mexico_City");
        let area_existe = await Area.findOne({ 'nombre': params.nombre});
        if (area_existe){ 

        console.log(area_existe);
        console.log(area_existe._id);

        Centro.find({_id: idCentro}, (err, centro) => {
        var arrayArea = centro[0].idArea;
        arrayArea.push(area_existe._id);
        Centro.findOneAndUpdate({_id: idCentro}, {idArea: arrayArea}, (err, transferenciaUpdated) => {});
        return res.status(400).send('El Área Ya Existe,Se Descartara Guardarla Pero Se Vinculara Al Centro De Trabajo....') 
            });
        }
        if (!area_existe){
        area.nombre = params.nombre;
        area.descripcion = params.descripcion;
        area.estatus = true;   
        area.timestamp = fechaMX._d;    
      
        let centro_existe = await Centro.findOne({_id: idCentro});
        if (!centro_existe){ 
        return res.status(400).send('No Existe Centro De Trabajo....')}

        if (centro_existe){
            Centro.find({_id: idCentro}, (err, centro) => {
                var arrayArea = centro[0].idArea;
                arrayArea.push(area._id); 
                Centro.findOneAndUpdate({_id: idCentro}, {idArea: arrayArea}, (err, transferenciaUpdated) => {});
                area.save((err, areaStored) => {
                    if (err || !areaStored) {}})
                     return res.status(200).send({});
                    });
    }
}

}, 

    listarAA: async(req, res) => {  
        var query = Area.find({ "estatus": true }, );
        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(5);
        }
        query.sort('-_id').exec((err, areas) => {
            if (err) {
                return res.status(500).send({});
            }
            if (!areas) {
                return res.status(404).send({});
            }
            return res.status(200).send({ areas });
        });
    },

    listarAI: async(req, res) => {
        var query = Area.find({ "estatus": false }, );
        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(5);
        }
        query.sort('-_id').exec((err, areas) => {
            if (err) {
                return res.status(500).send({});
            }
            if (!areas) {
                return res.status(404).send({});
            }
            return res.status(200).send({ areas });
        });
    }, 

    desactivar: async(req, res) => {  
        var areaID = req.params.id;
        var params = req.body;
        Area.findOneAndUpdate({_id: areaID}, {estatus: false}, (err, areaHide) => {
            return res.status(200).send("Área Desactivada.");  
        });
    },

    buscar: async(req, res) => {  
        var buscar = req.params.buscar;
        Area.find({
                "$or": [
                    { "nombre": { "$regex": buscar, "$options": "i" } }
                ]
            })
            .sort([
                ['date', 'descending']
            ])
            .exec((err, areaSearch) => {
                if (err) {
                    return res.status(500).send({});
                }
                if (!areaSearch || areaSearch.length <= 0) {
                    return res.status(404).send({});
                }
                return res.status(200).send({ areaSearch });
            });
    },

    modificar: async(req, res) => {

        var area = req.params.id;
        var params = req.body;

        
        try{
            var validarNombre = !validator.isEmpty(params.nombre);
            var validarteDescripcion = !validator.isEmpty(params.descripcion);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            }); 
        }

        if(validarNombre && validarteDescripcion){
             
             Area.findOneAndUpdate({_id: area}, params, {new:true}, (err, areaModificada) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar !!!'
                    });
                }

                if(!areaModificada){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo !!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: areaModificada
                });
             });
        }else{
             
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta !!!'
            });
        }
       
    },










    
    importar: async(req, res) => {//importar varias centros a la vez
    },//fin de importar centros

};
module.exports = controller;