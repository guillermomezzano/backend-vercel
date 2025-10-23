import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://guillermomezzano04_db_user:WzIke4xLlOqkOaex@cluster0.dphknfg.mongodb.net/"
    );
    console.log("conexion exitosa!!!");
  } catch (error) {
    console.log("no se ha podido conectar", error);
    throw error;
  }
}

export default connectDB;
// mongodb://localhost:27017/
