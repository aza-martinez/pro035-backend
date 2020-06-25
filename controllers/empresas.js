'Use Strict'

var validator = require('validator');
var Empresa = require('../Modelos/empresas');
var Centro = require('../Modelos/centros');
var Area = require('../Modelos/areas');
var moment = require('moment');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
var momentz = require('moment-timezone');

var controller = { //Inicio Del Controlador 
    guardar: async(req, res) => {//guardar empresa  
                var params = req.body;
                let fecha = new Date();
                let fechaMX = moment(fecha).tz("America/Mexico_City");

                try{
                    //VALIDACION DE DATOS DE EMPRESA
                    var val_empresa_razonSocial = !validator.isEmpty(params.empresaRazonSocial);
                    var val_empresa_alias = !validator.isEmpty(params.empresaAlias);
                    var val_empresa_calle = !validator.isEmpty(params.empresaCalle);
                    var val_empresa_colonia = !validator.isEmpty(params.empresaColonia);
                    var val_empresa_cp = !validator.isEmpty(params.empresaCP);
                    var val_empresa_rfc = !validator.isEmpty(params.empresaRFC);

                    //VALIDACION DE DATOS DE CENTRO DE TRABAJO
                    var val_centro_nombre = !validator.isEmpty(params.centroNombre);
                    var val_centro_telefono = !validator.isEmpty(params.centroTelefono);
                    var val_centro_calle = !validator.isEmpty(params.centroCalle);
                    var val_centro_colonia = !validator.isEmpty(params.centroColonia);
                    var val_centro_cp = !validator.isEmpty(params.centroCP);
                    
                }catch(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Faltan datos por enviarse !!!'
                    });
                }
        
              
                var val_area_nombre = !validator.isEmpty(params.areaNombre);
                var val_area_descripcion = !validator.isEmpty(params.areaDescripcion);

                if(val_empresa_razonSocial && val_empresa_alias && val_empresa_calle && val_empresa_colonia && val_empresa_cp && val_empresa_rfc && val_centro_nombre && val_centro_telefono && val_centro_calle && val_centro_colonia && val_centro_cp){// SI NO VIENEN VACIOS
                    //CREAMOS EL OBJETO
                    const empresa = new Empresa();
                    const centro = new Centro();   
                    const area = new Area();        

                    // Asignar valores
                    area.nombre = params.areaNombre;
                    area.descripcion = params.areaDescripcion;
                    area.estatus = true;   
                    area.timestamp = fechaMX._d; 

                    centro.nombre = params.centroNombre;
                    centro.telefono = params.centroTelefono;
                    centro.calle = params.centroCalle;
                    centro.colonia = params.centroColonia;
                    centro.cp = params.centroCP;
                    centro.estatus = true;   
                    centro.timestamp = fechaMX._d; 

                    empresa.razonSocial = params.empresaRazonSocial;
                    empresa.alias = params.empresaAlias;
                    empresa.calle = params.empresaCalle;
                    empresa.colonia = params.empresaColonia;
                    empresa.rfc = params.empresaRFC;
                    empresa.cp = params.empresaCP;
                    empresa.estatus = true;   
                    empresa.timestamp = fechaMX._d; 
                    empresa.idCentro.push(centro._id);

                    if(val_area_descripcion && val_area_nombre){
                        let area_existe = await Area.findOne({ 'nombre': params.areaNombre});
                        if (area_existe){ 
                        return res.status(400).send('El Area Ya Existe.... Se Omitira El Área')}
                        if (!area_existe){
                        //empresa.idArea.push(area._id);
                        centro.idArea.push(area._id);
                        area.save((err, areaStored) => {
                            if (err || !areaStored) {
                                return res.status(400).send(err)
                        }})
                    }
                    }else{      
                    }
                    
                    let centro_existe = await Centro.findOne({ 'nombre': params.centroNombre});
                    let empresa_existe = await Empresa.findOne({ 'rfc': params.empresaRFC});
                    if (empresa_existe || centro_existe){ 
                   return res.status(400).send('La Empresa O Centro Ya Existe.... Se Omitira El Centro O La Empresa')}
                    if (!empresa_existe && !centro_existe){
                    empresa.save((err, empresaStored) => {
                            if (err || !empresaStored) {
                                return res.status(400).send(err)
                    }
                    centro.save((err, centroStored) => {
                        if (err || !centroStored) {
                            return res.status(400).send(err)
                    }})  
                    })
                    }             
                return res.status(200).send('OK')
                }else{
                    return res.status(500).send({
                        status: 'error',
                        message: 'Los datos no son válidos !!!'
                    });
                }//FIN DE LA VALIDACION DE DATOS DE CENTRO Y EMPRESA

}, //fin de guardar empresa

    listarEA: async(req, res) => {
            var nombre = req.params.nombre;
            Empresa.find({"estatus": true })
            .populate({
                path: 'idCentro',
                populate: {
                path: 'idPeriodo',
                model: 'Periodos',
                }
            })
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

    listarEI: async(req, res) => {//listar empresas inactivas
        var query = Empresa.find({ "estatus": false }, );
        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(5);
        }
        query.sort('-_id').exec((err, empresas) => {
            if (err) {
                return res.status(500).send({});
            }
            if (!empresas) {
                return res.status(404).send({});
            }
            return res.status(200).send({ empresas });
        });
    }, //fin de listar empresas inactivas

    desactivar: async(req, res) => {//Metodo Guardar
        var empID = req.params.id;
        var params = req.body;
        Empresa.findOneAndUpdate({_id: empID}, {estatus: false}, (err, empresaHide) => {
            return res.status(200).send("Empresa Desactivada.");
        });
    },

    buscar: async(req, res) => {//Metodo Guardar
        var buscar = req.params.buscar;
        Empresa.find({
                "$or": [
                    { "alias": { "$regex": buscar, "$options": "i" } },
                    { "rfc": { "$regex": buscar, "$options": "i" } },
                    { "razonSocial": { "$regex": buscar, "$options": "i" } }
                ]
            })
            .sort([
                ['date', 'descending']
            ])
            .exec((err, empresaSearch) => {
                if (err) {
                    return res.status(500).send({});
                }
                if (!empresaSearch || empresaSearch.length <= 0) {
                    return res.status(404).send({});
                }
                return res.status(200).send({ empresaSearch });
            });
    },












    
    importar: async(req, res) => {//importar varias empresas a la vez
    },//fin de importar empresas

};
module.exports = controller;