export const notFound = (req, res, next) => {
  const err = new Error("ruta no encontrada");
  err.name = "not found";
  err.statusCoude = 404;
  next(err);
};
