import React from 'react';
import '../css/signin.css';
import Joi from 'joi-browser';
import authService from '../services/authService';

class SignIn extends React.Component{
    
    state = {//fields exactly as the API would expect
        credentials: {
            email:'',
            password:''
        },
        errors: [
            {}
        ]            
    }

    schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
    
    handleSubmit = (e) => {    
        e.preventDefault();

        const result = Joi.validate(this.state.credentials, this.schema, { abortEarly: false });

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

        authService.login(this.state.credentials, success =>{
            if(success) {this.props.history.push('/')}//redirecting the user to the homepage
            else {//show unsuccessful login message            
            }
        })
    }    

    handleChange = e => {
            //updating state with the change in the form field
            const { name, value } = e.target; //destructuring

            const credentials = { ...this.state.credentials}
            // credentials.email = this.state.credentials.email;
            // credentials.password = this.state.credentials.password;

            credentials[name] = value;

            this.setState({ credentials })
            // this.setState({ credentials: credentials })
    }

    render(){

        return (
            <form className="form-signin" onSubmit={ this.handleSubmit }>
                <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input onChange={ this.handleChange } 
                        name="email"
                        type="text" 
                        id="inputEmail" 
                        className="form-control" 
                        placeholder="Email address" autoFocus />

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
                        placeholder="Password" />
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
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>                
            </form>                
     );
    }    
}
 
export default SignIn;