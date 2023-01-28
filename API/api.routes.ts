/**
 * Routes file to backend endpoints, always fnish routes with out slash symbol
 */

const mainUrl = '';

const bases = {
  user: `${mainUrl}/user`,
};

const user = {
  login: `${bases.user}/login`,
  getAccount: `${bases.user}/account`,
  activateAccount: `${bases.user}/activate-account`,
  updateAccount: `${bases.user}/update-account`,
  forgetPassword: `${bases.user}/forget-password`,
};

const routes = {
  user,
};

export default routes;
