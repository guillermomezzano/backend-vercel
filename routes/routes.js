import {
  getPersonas,
  getFindPersona,
  postAddPersonas,
  putUpdatePersona,
  deletePersona,
  addPersonSkill,
  login,
} from "../controllers/controllers.js";
import { Router } from "express";
import upload from "../config/config.multer.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.get("/personas", verifyToken, getPersonas);
router.get("/persona/:id", verifyToken, getFindPersona);
router.post(
  "/personas/add",
  // upload.single("media"),
  // verifyToken,
  postAddPersonas
);
router.patch("/persona/skill/:id", verifyToken, addPersonSkill);
router.put("/persona/:id", verifyToken, putUpdatePersona);
router.delete("/persona/:id", verifyToken, deletePersona);
router.post("/login", login);

export default router;
