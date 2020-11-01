module.exports = function bodyParser(req, res, next) {
  if (req.method === "POST") {
    const body = [];
    req
      .on("data", (chunk) => body.push(chunk))
      .on("end", () => {
        req.body = JSON.parse(Buffer.concat(body));
        next(req, res);
      });
  } else next(req, res);
};
