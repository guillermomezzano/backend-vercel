import { model, Schema } from "mongoose";
import { skillSchema } from "./model.skill.js";
import bcrypt from "bcrypt";

const personaSchema = new Schema({
  nombre: {
    type: String,
    minLength: [3, "debe tener mínimo 3 caracteres"],
    required: [true, "campo obligatorio"],
    maxLength: [10, "debe tener máximo 10 caracteres"],
  },
  edad: {
    type: String,
    // min: 18,
    // max: 80,
  },
  email: {
    type: String,
    required: [true, "campo obligatorio"],
    unique: true,
    validate: {
      validator: (value) =>
        /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(value),
      message: "email no es valido",
    },
  },

  password: {
    type: String,
    required: [true, "campo obligatorio"],
    minLength: [6, "debe tener mínimo 6 caracteres"],
  },

  // media: {
  //   type: String,
  // },

  skill: [skillSchema],
});

//crea le capo viertual
personaSchema
  .virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (valor) {
    this._confirmPassword = valor;
  });

//middleware que se ejecuta antes de guardar compara las contraseñas
personaSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Las password secretas deben coincidir");
  }
  next();
});

// Gancho de pre-guardado para hashear la clave secreta
personaSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

const Person = model("persona", personaSchema);
export default Person;
