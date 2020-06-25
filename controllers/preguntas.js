'Use Strict'
var Pregunta = require('../Modelos/preguntas');
var moment = require('moment');
var momentz = require('moment-timezone');

var controller = { //Inicio Del Controlador 

    guardar: async(req, res) => {
        const pregunta = new Pregunta();
        var params = req.body;
        let fechaMX = moment(fecha).tz("America/Mexico_City");
        pregunta.numGuia = params.numGuia;
        pregunta.nombrePregunta = params.nombrePregunta;
        pregunta.numeroPregunta = params.numeroPregunta;
        pregunta.idRespuestas = params.idRespuestas;
        var fecha = new Date();     
        pregunta.timestamp=fechaMX._d; ;
        pregunta.save((err, preguntaStored) => {
            if (err || !preguntaStored) {
                console.log(err);
                return res.status(404).send({});
            }
            res.status(200).send({...preguntaStored._doc})
            
          });
}, 
    listar: async(req, res) => {
        numPregunta = req.params.numeroPregunta;
        var query = Pregunta.find({numeroPregunta:numPregunta}, );
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
}











};
module.exports = controller;