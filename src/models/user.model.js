const mongoose = require("mongoose");
const { Schema } = mongoose;
const { hashSync, genSaltSync } = require("bcryptjs");

const UserSchema = new Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    apellidoPaterno: {
      type: String,
      trim: true,
      required: true,
    },
    apellidoMaterno: {
      type: String,
      trim: true,
      required: true,
    },
    genero: {
      type: String,
      trim: true,
    },
    rangoEdad: {
      type: String,
      trim: true,
    },
    estadoCivil: {
      type: String,
      trim: true,
    },
    nivelEstudios: {
      type: String,
      trim: true,
    },
    tipoPuesto: {
      type: String,
      trim: true,
    },
    tipoContratacion: {
      type: String,
      trim: true,
    },
    tipoPersonal: {
      type: String,
      trim: true,
    },
    tipoJornada: {
      type: String,
      trim: true,
    },
    rolarTurnos: {
      type: String,
      trim: true,
      maxlength: 2,
    },
    experienciaPuestoActual: {
      type: String,
      trim: true,
    },
    tiempoExperienciaLaboral: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    perfil: {
      type: String,
      trim: true,
      enum: ["Administrador", "Empleado"],
      required: true,
    },
    usuario: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    firstLogin: {
      type: Boolean,
      default: true,
    },
    cliente: {
      type: mongoose.Schema.ObjectId,
      ref: "Cliente",
      required: true,
    },
    centroTrabajo: { type: mongoose.Schema.ObjectId, ref: "CentrosTrabajo" },
    empresa: { type: mongoose.Schema.ObjectId, ref: "Empresa" },
    puesto: { type: mongoose.Schema.ObjectId, ref: "Puesto" },
    estatus: {
      type: Boolean,
      default: true,
    },
    areaTrabajo: {
      type: mongoose.Schema.ObjectId,
      ref: "AreasTrabajo",
    },
    fechaBaja: {
      type: Date,
    },
  },
  { versionKey: false, timestamps: true }
);

UserSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.password;
  return user;
};

UserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = genSaltSync(11);
  const hashedPassword = hashSync(user.password, salt);
  user.password = hashedPassword;
  next();
});

module.exports = mongoose.model("Usuario", UserSchema);
