const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key;
    if (apiKey === "api_key") {
      next();
    } else {
      res.status(403);
      res.send({ error: "Wrong API Key" });
    }
  } catch (e) {
    res.status(403);
    res.send({ error: "Something wrong in custom header" });
  }
};

module.exports = customHeader;
