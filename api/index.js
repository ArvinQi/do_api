const Home = require('./handlers/home');

const UserRoutes = require('./user/routes');
exports.register = (plugin, options, next) => {

  plugin.route([
    { method: 'GET', path: '/', config: Home.hello },
    { method: 'GET', path: '/restricted', config: Home.restricted },
    // { method: 'GET', path: '/{path*}', config: Home.notFound }
  ]);

  plugin.route(UserRoutes);

  next();
};

exports.register.attributes = {
  name: 'api'
};