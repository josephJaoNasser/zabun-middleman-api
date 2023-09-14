module.exports = function AuthenticationMiddleware(req, res, next) {
  const { client_id, server_id, api_key } = req.headers;
  const bedrijf = req.headers["x-client-id"];

  if (!bedrijf) {
    return res
      .status(400)
      .json(failed("Please provide the 'x-client-id' in your headers"));
  }

  if (!client_id) {
    return res
      .status(400)
      .json(failed("Please provide the 'client_id' in your headers"));
  }

  if (!server_id) {
    return res
      .status(400)
      .json(failed("Please provide the 'server_id' in your headers"));
  }

  if (!api_key) {
    return res
      .status(400)
      .json(failed("Please provide the 'api_key' in your headers"));
  }

  res.locals.credentials = {
    client_id,
    server_id,
    api_key,
    "x-client-id": bedrijf,
  };

  next();
};
