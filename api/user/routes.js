const AuthController = require('./controller/auth.controller');

module.exports = [{
  path: '/auth/signup',
  method: 'POST',
  config: AuthController.signup
},
{
  path: '/auth/confirmation',
  method: 'GET',
  config: AuthController.emailConfirmationHandle
},
{
  path: '/auth/signin',
  method: 'POST',
  config: AuthController.signin
},
{
  path: '/auth/resendverification',
  method: 'POST',
  config: AuthController.resendVerification
}
];