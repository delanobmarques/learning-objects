import axios from 'axios';

class DataService{

    constructor(){
        this.apiURL = process.env.REACT_APP_API_URL;
    }

    getData(callback){
        axios.get(`${this.apiURL}/lObjects`)
            .then(response => {
                callback(null, response.data)           
        })
        .catch(error => {
            console.log(error)
            callback(error,null)
        })
    }

    getRecord(id, callback){        
        axios.get(`${this.apiURL}/lObjects/${id}`)
        .then(response => {
            callback(null, response.data)
        })
        .catch(error => {
            callback(error,null)
        })
    }

    searchRecord(searchFor, callback){        
        axios.get(`${this.apiURL}/lObjects/search/${searchFor}`)
        .then(response => {
            console.log(`...got response from api searching for: ${searchFor}`)
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
            callback(error)
        })
    }

    
    deleteRecord(id, token, callback){
        axios.delete(`${this.apiURL}/lObjects/${id}`, 
        {
            headers:
            {
                'x-auth-token': token
            }
        })
            .then(response => {
                console.log('Record deleted...dataService')
                callback(null, response)
            })
            .catch(err => {
                console.log('ERROR...dataService')
                console.log(err)
                callback(err, null)
            })        
    }

    login(credentials, callback){
        axios.post(`${this.apiURL}/users/login`, credentials)
            .then(response => callback(null, response.headers['x-auth-token']))
            .catch(err => callback(err, null))
    }
    
    register(data, token, callback){
        axios.post(`${this.apiURL}/users/register`, data,
        {
            headers:
            {
                'x-auth-token': token
            }
        })
            .then(response => callback(null, response.headers['x-auth-token']))
            .catch(err => callback(err, null))        
    }

    createNewRecord(data, token, callback){
        axios.post(`${this.apiURL}/lObjects`, data,
        {
            headers:
            {
                'x-auth-token': token
            }
        })
            .then(response => callback(null, response.data))
            .catch(err => callback(err, null))        
    }

    editRecord(data, token, callback){
        axios.patch(`${this.apiURL}/lObjects/${data.id}`, data,
        {
            headers:
            {
                'x-auth-token': token
            }
        })
            .then(response => {
                console.log('Record updated...dataService')
                callback(null, response.data)
            })
            .catch(err => {
                console.log('ERROR...dataService')
                console.log(err)
                callback(err, null)
            })        
    }
    
}

export default new DataService();