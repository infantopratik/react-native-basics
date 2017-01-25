'use strict';

import buffer from 'buffer';
import { AsyncStorage } from 'react-native';
import lodash from 'lodash';

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

      var zippedObj = lodash.fromPairs(val);

      if(!zippedObj[AuthKey]){
        return cb();
      }

      var authInfo = {
        header : {
          Authorization: 'Basic '+zippedObj[AuthKey]
        },
        user : JSON.parse(zippedObj[UserKey])
      }
      
      return cb(null, authInfo);
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
        return response;
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
