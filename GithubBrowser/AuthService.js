'use strict';

import buffer from 'buffer';
import { AsyncStorage } from 'react-native';

const AuthKey = 'auth';
const UserKey = 'user';

class AuthService {
  getAuthInfo(cb){
    AsyncStorage.multiGet([AuthKey, UserKey], (err, val) => {
      if(err){
        return cb(err);
      }

      if(!val){
        return cb();
      }

      if(val){
        return cb(val)
      }
    })
  }

  login(creds, cb){
    var b = new buffer.Buffer(creds.username + ':' + creds.password);
    var encodedAuth = b.toString('base64');

    fetch('https://api.github.com/user', {
      headers: {
        Authorization: 'Basic ' + encodedAuth
      }
    })
    .then((response) => {
      if(response.status>=200 && response.status<=400){
        return response
      }

      throw {
        badCredentials: response.status == 401,
        unknownError: response.status != 401
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((results) => {
      AsyncStorage.multiSet([
         [AuthKey, encodedAuth],
         [UserKey, JSON.stringify(results)]
      ], (err) => {
        if(err){
          throw err;
        }

        return cb({success: true});
      });
    })
    .catch((err) => {
      return cb(err);
    });
  }
}

export default new AuthService();
