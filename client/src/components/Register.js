import React from 'react';
import '../css/signin.css';
import Joi from 'joi-browser';
import authService from '../services/authService';
// import bcrypt from 'bcrypt';

class Register extends React.Component{
    state = {//state is exactly how the API is expecting data
                userData:{
                    firstName:'',
                    lastName:'',
                    email:'',
                    password:''
                },
                errors:[
                    {}
                ]                
    }

    schema = {
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
    
    handleSubmit = (e) => {    
        e.preventDefault();

        const result = Joi.validate(this.state.userData, this.schema, { abortEarly: false });

        if(result.error){
            const errors = []
            result.error.details.forEach(detail => {
                //build the object for erros array 
                const error = {}
                error.message = detail.message
                error.field = detail.path[0]

                //add the error to the errors array 
                errors.push(error)
            });            
            this.setState({ errors })

            return; //don't continue - there are errors  
        }             

        authService.register(this.state.userData, success => {
            if(success) { this.props.history.push('/')}//user regitsered -> redirect to main page
            else { this.props.history.push('/signin')}//something went worg -> redirect to login
        })
    }    

    handleChange = (e) => {
            //updating state with the change in the form field
            const { name, value } = e.target //destructuring

            const userData = { ...this.state.userData}

            userData[name] = value;

            // if(name==='password'){
            //     bcrypt.genSalt(10,(err, salt) => {//generating Salt to hash password
            //         bcrypt.hash(value, 10, (error, hash) => { //hashing password       
                      
            //           value = hash; //changing sent password for the hashed one
            //         })
            //     })
            // }
            this.setState({ userData })
    }

    render(){

        return ( 
            <form className="form-signin" onSubmit={ this.handleSubmit }>

                <h1 className="h3 mb-3 font-weight-normal text-center">Register New User</h1>

                <label htmlFor="firstName" className="sr-only">First Name</label>
                <input onChange={ this.handleChange } 
                        name="firstName"
                        type="text" 
                        id="firstName" 
                        className="form-control" 
                        placeholder="First Name" autoFocus 
                />
                {
                            this.state.errors.filter(error => error.field === "firstName").length > 0
                            &&
                            <div className="alert alert-danger mt-2">
                                <p className="mb-0">
                                    {
                                        this.state.errors
                                            .filter(error => error.field === "firstName")
                                            .map((error, i) => {
                                                return <small key={i}>{ error.message }</small>
                                            })
                                    }
                                </p>
                            </div>                             
                        }

                <label htmlFor="lastName" className="sr-only">Last Name</label>
                <input onChange={ this.handleChange } 
                        name="lastName"
                        type="text" 
                        id="lastName" 
                        className="form-control" 
                        placeholder="Last Name"  
                />
                {
                            this.state.errors.filter(error => error.field === "lastName").length > 0
                            &&
                            <div className="alert alert-danger mt-2">
                                <p className="mb-0">
                                    {
                                        this.state.errors
                                            .filter(error => error.field === "lastName")
                                            .map((error, i) => {
                                                return <small key={i}>{ error.message }</small>
                                            })
                                    }
                                </p>
                            </div>                             
                        }

                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input onChange={ this.handleChange } 
                        name="email"
                        type="email" 
                        id="inputEmail" 
                        className="form-control" 
                        placeholder="Email address"   
                />
                {
                            this.state.errors.filter(error => error.field === "email").length > 0
                            &&
                            <div className="alert alert-danger mt-2">
                                <p className="mb-0">
                                    {
                                        this.state.errors
                                            .filter(error => error.field === "email")
                                            .map((error, i) => {
                                                return <small key={i}>{ error.message }</small>
                                            })
                                    }
                                </p>
                            </div>                             
                        }
                
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input onChange={ this.handleChange } 
                        name="password"
                        type="password" 
                        id="inputPassword" 
                        className="form-control" 
                        placeholder="Password"  
                />
                {
                            this.state.errors.filter(error => error.field === "password").length > 0
                            &&
                            <div className="alert alert-danger mt-2">
                                <p className="mb-0">
                                    {
                                        this.state.errors
                                            .filter(error => error.field === "password")
                                            .map((error, i) => {
                                                return <small key={i}>{ error.message }</small>
                                            })
                                    }
                                </p>
                            </div>                             
                        }
                
                <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
            </form>
     );
    }    
}
 
export default Register;