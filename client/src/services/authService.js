import { Redirect } from 'react-router-dom';
import dataService  from './dataService';

class AuthService {  

    //TOKEN related Methods
    getToken(){
      //retrieve from storage...
      return localStorage.getItem('x-auth-token');
    }

    setToken(token){
      //token can be set in a cookie, in localstorage, etc...
      localStorage.setItem('x-auth-token', token);
    }

    register(data, callback){
      //api call        
      dataService.register(data, this.getToken(), (err, token) => {
        if(err){
          //handle error
          callback(false);
          return;
        }
        //set the token
        this.setToken(token);
        callback(true);          
      });
    }

    createNewRecord(data, callback){
      //api call        
      dataService.createNewRecord(data, this.getToken(), (err, data) => {
        if(err){
          //handle error
          callback(false);
          return;
        }        
        callback(true);          
      });
    }

    editRecord(data, callback){
      //api call        
      dataService.editRecord(data, this.getToken(), (err, data) => {
        if(err){
          //handle error
          console.log('ERROR...authService')
          callback(false);
          return;
        }
        console.log('Record updated...authService')
        callback(true);          
      });
    }

    deleteRecord(id, callback){
      //api call        
      dataService.deleteRecord(id, this.getToken(), (err, response) => {
        if(err){
          //handle error
          console.log('ERROR...authService')
          callback(false);
          return;
        }
        console.log('Record deleted...authService')
        callback(true);          
      });
    }

    getRecord(id, callback){
      //api call        
      
      dataService.getRecord(id, (err, data) => {
        if(err){
          callback(err, null);
          return;
        }        
        // console.log('authService -> Get Record')
        // console.log(data)
        callback(null, data);          
      });
    }
  
    login(credentials, callback) {
      dataService.login(credentials, (err, token) => {
        if(err){
          //handle error
          callback(false);
          return;
        }
        //set the token
        this.setToken(token);
        callback(true);        
      });
    }
  
    logout() {
        //delete Token
        localStorage.removeItem('x-auth-token');
        <Redirect to='/signin'/>      
    }
  
    isAuthenticated() {
      return this.getToken() !== null;
    }

  }
  
  export default new AuthService();
  