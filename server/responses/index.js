const debug = require('debug')('api');

module.exports = [
  /* eslint-disable global-require*/
  require('./badRequest'),
  require('./created'),
  require('./forbidden'),
  require('./notFound'),
  require('./ok'),
  require('./serverError'),
  require('./unauthorized'),
  require('./tokenExpired'),
  require('./notActiveUser'),
  require('./conflict'),
  /* eslint-enable global-require*/
].map(desc => function(req, res, next) {
  res[desc.name] = function(data, code, message) {
    let d = data;
    if (d instanceof Error) {
                // log error
      debug(d);

                // clear data variable, do not send it to client
      d = undefined;
    }

    const response = {
      code: code || desc.code,
      message: message || desc.message,
      data: d || desc.data,
    };

    return res.status(desc.status).json(response);
  };

  next();
});
