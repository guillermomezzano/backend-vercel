import Person from "../model/model.person.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET_KEY = "secretKey123";

const personas = [
  { id: 1, nombre: "cecilia", edad: 23, email: "cecilia@gmail.com" },
  { id: 2, nombre: "karen", edad: 21, email: "karen@gmail.com" },
  { id: 3, nombre: "cinthia", edad: 20, email: "cinthia@gmail.com" },
];

export const getPersonas = async (_req, res) => {
  try {
    const persons = await Person.find();
    return res.status(200).json(persons);
  } catch (error) {
    next(error);
  }
};

export const getFindPersona = async (req, res) => {
  console.log(req.params.id);
  try {
    const foundPerson = await Person.findById(req.params.id);
    return res.status(200).json(foundPerson);
  } catch (error) {
    next(error);
  }
};

export const postAddPersonas = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const personData = req.body;
    // personData.skill = JSON.parse(personData.skill);
    // if (req.file) {
    //   console.log("se guardo en", req.file.filename);
    //   const mediaUrl = `${req.protocol}://${req.get("host")}/uploads/${
    //     req.file.filename
    //   }`;
    //   console.log("mediaUrl", mediaUrl);
    //   personData.media = mediaUrl;
    // }
    const newPerson = await Person.create(personData);
    return res.status(200).json(newPerson);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export const putUpdatePersona = async (req, res, next) => {
  try {
    console.log(req.body);
    const updatePerson = await Person.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.status(200).json(updatePerson);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export const addPersonSkill = async (req, res, next) => {
  try {
    console.log(req.body);
    const updatePerson = await Person.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { skill: req.body } },
      { new: true }
    );
    return res.status(200).json(updatePerson);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export const deletePersona = async (req, res) => {
  try {
    console.log(req.body);
    const updatePerson = await Person.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json(updatePerson);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({
      message: "falta email o password",
    });
  }
  try {
    const user = await Person.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "usuario no encontrado",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "las contraseñas no coinciden",
      });
    }

    const payload = { id: user._id, email: user.email };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    return res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};
