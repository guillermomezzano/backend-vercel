//importasmos librerai express
import express from "express";
import router from "./routes/routes.js";
import cors from "cors";
import connectDB from "./config/config.mongo.js";
import { validateSchema } from "./middleware/middlewareErros.js";
import { notFound } from "./middleware/notFound.middleware.js";
import serverless from "serverless-http";

// creamos instancia de express
const app = express();
// const port = 8080;
// hola como estan?
//me permite trabajar en un formato json desde el body
connectDB();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.get("/status", (_req, res) => {
  res.json({ status: "ok" });
});
app.use(router);
app.use(notFound);

app.use(validateSchema);

export default serverless(app);
// app.listen(port, () => {
//   console.log(`servidor levantado en el puerto ${port}`);
// });
