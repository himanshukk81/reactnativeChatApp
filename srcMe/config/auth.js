import { FBLoginManager } from 'react-native-facebook-login';

const Facebook = {
  login: (permissions) => {
    return new Promise((resolve, reject) => {
      FBLoginManager.loginWithPermissions(permissions || ['email'], (error, data) => {

        if (!error) {

          // console.log("Firebase data==="+JSON.stringify(data));

          alert("Firebase data==="+data);

          resolve(data);
          // resolve(data.credentials.token);
        } else {
          alert("error 17 line==="+error);
          reject(error);
        }
      });
    });
  },
  logout: () => {
    return new Promise((resolve, reject) => {
      FBLoginManager.logout((error, data) => {
        if (!error) {
          resolve(true);
        } else {
          reject(error);
        }
      });
    });
  }
}

const Auth = { Facebook };

export default Auth;
