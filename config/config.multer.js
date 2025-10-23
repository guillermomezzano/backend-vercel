import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// ruta completa del arhcivo actual
const __fileName = fileURLToPath(import.meta.url);
// directorio donde guardar la imagen
const __dirName = path.dirname(__fileName);

//ubicacion del archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirName, "../uploads"));
  },
  //nombre del archivo
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default upload;
