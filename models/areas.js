'use strict'

const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AreasSchema = Schema({
    nombre: String,
    descripcion: String,
    estatus: Boolean,
    timestamp: Date,
    idDepartamento:  [{ type: Schema.ObjectId, ref: "Departamentos" }],
    idEmpleados:  [{ type: Schema.ObjectId, ref: "Empleados" }],
    }, { versionKey: false });

module.exports = mongoose.model('Area', AreasSchema);
