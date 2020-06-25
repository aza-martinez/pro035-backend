'Use Strict'
var Encuesta = require('../Modelos/encuesta');
var moment = require('moment');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
var momentz = require('moment-timezone');

var controller = { //Inicio Del Controlador

listar: async(req, res) => {
    var nombre = req.params.nombre;
    Encuesta.find({},{"numeroEncuesta":1,"numeroEncuesta":2,"numeroEncuesta":3})

    .sort([['date', 'descending']])
    .exec((err, registros) => {
            if (err) {
                return res.status(500).send({err});
            }
            if (!registros || registros.length <= 0) {}

            return res.status(200).send(registros);
    });
}











};
module.exports = controller;