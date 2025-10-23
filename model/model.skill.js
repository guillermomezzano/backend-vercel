import { model, Schema } from "mongoose";

const skillSchema = new Schema({
  nombre: {
    type: String,
  },
  nivel: {
    type: String,
  },
});

const Skill = model("skill", skillSchema);
export { Skill, skillSchema };
