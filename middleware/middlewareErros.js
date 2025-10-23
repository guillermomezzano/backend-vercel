export const validateSchema = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "internal server error";
  let name = err.name || "error";

  if (err.name === "ValidationError") {
    console.log("error en el middleware", err);
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  }

  const errorNormalizado = {
    name,
    statusCode,
    message,
  };

  res.status(errorNormalizado.statusCode).json(errorNormalizado);
};
