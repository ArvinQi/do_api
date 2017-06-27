module.exports.hello = {
  handler: function (request, reply) {
    return reply({ result: 'Hello hapi!' });
  },
  tags: ['api']
};

module.exports.restricted = {
  auth: 'jwt',
  handler: function (request, reply) {
    return reply({ result: 'Restricted!' });
  },
  tags: ['api']
};

module.exports.notFound = {
  handler: function (request, reply) {
    return reply({ result: 'Oops, 404 Page!' }).code(404);
  },
  tags: ['api']
};