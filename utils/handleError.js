const handleHttpError = (res, message = "Something wrong", code = 403) => {
  res.status(code);
  res.send({ error: message });
};

module.exports = { handleHttpError };
