'Use Strict'
var Periodo = require('../Modelos/periodos');
var moment = require('moment');
var momentz = require('moment-timezone');

var controller = { //Inicio Del Controlador 

    guardar: async(req, res) => {
        const periodo = new Periodo();
        var params = req.body;
        let fechaMX = moment(fecha).tz("America/Mexico_City");
        periodo.nombre = params.nombre;
        periodo.rango = params.rango;        
        periodo.idEmpleado = params.idEmpleado;
        var fecha = new Date();     
        periodo.timestamp=fechaMX._d; 
        periodo.save((err, periodoSave) => {
            if (err || !periodoSave) {
                console.log(err);
                return res.status(404).send({});
            }
            res.status(200).send({...periodoSave._doc})
            
          });
}, 
    listar: async(req, res) => {
       var query = Periodo.find({});
        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(5);
        }
        query.sort('-_id')
        .populate({ path: 'idEmpleado', model: 'Empleado' })
        .exec((err, periodos) => {
            if (err) {
                console.log(err);
                return res.status(500).send({});
            }
            if (!periodos) {
                return res.status(404).send({});
            }
            return res.status(200).send({ periodos });
        });
}











};
module.exports = controller;