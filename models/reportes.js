'use strict'

const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
const { RetryPolicyFilter } = require('azure-storage');
var Schema = mongoose.Schema;

var ReportesSchema = Schema({
    numGuia: String,
    nombreDimension: String,
    timestamp: Date,
    idPreguntas:  [{ type: Schema.ObjectId, ref: "Preguntas" }],
    }, { versionKey: false });

module.exports = mongoose.model('Reportes', ReportesSchema);
