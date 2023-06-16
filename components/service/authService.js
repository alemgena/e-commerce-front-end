import {
  removedCredentials,
  selectCurrentUser,
  setCredentials,
  User,
} from '@/store/auth';
export function clearTokenFromLocalStorage(dispatch) {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('token');
  localStorage.removeItem('logout');
  dispatch(removedCredentials());
}
export function runLogoutTimer(dispatch, timer, router) {
  setTimeout(() => {
    clearTokenFromLocalStorage(dispatch);
    dispatch(removedCredentials());
    router.push('/');
  }, timer);
}
export function checkAutoLogin(dispatch, router) {
    if (typeof window !== 'undefined') {
  const tokenDetailsString = localStorage.getItem('userInfo');
  let tokenDetails = '';
  console.log()
  if (!tokenDetailsString) {
    clearTokenFromLocalStorage(dispatch);
    router.push('/');
    return;
  }
  tokenDetails = JSON.parse(tokenDetailsString);
  let expireDate = new Date(tokenDetails?.tokens?.access?.expires);
  console.log(expireDate)
  let todaysDate = new Date();
  if (todaysDate > expireDate) {
    clearTokenFromLocalStorage(dispatch);
    dispatch(removedCredentials());
  router.push('/');
    return;
  }

  const timer = expireDate.getTime() - todaysDate.getTime();
  runLogoutTimer(dispatch, timer, router);
}
}
