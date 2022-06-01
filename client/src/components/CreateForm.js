import React from 'react';
import '../css/signin.css';
import Joi from 'joi-browser';
import authService from '../services/authService';
// import bcrypt from 'bcrypt';

class CreateForm extends React.Component{
    state = {//state is exactly how the API is expecting data
                newData:{
                    title:'',
                    description:'',
                    url:'',
                    authors:{
                        firstName:'',
                        lastName:'',
                        email:'',
                        picture:''
                    },
                    category:'', //'tutorial', 'workshop', 'article', 'video', 'other',
                    mediaFormat:
                    {
                        format:'',
                        icon:''
                    }
                },
                errors:[
                    {}
                ]                
    }

    schema = {
        title:Joi.string().min(2).max(80).required(),
        description:Joi.string().min(5).max(200).required(),
        url: Joi.string().required(),
        authors:{
            firstName:Joi.string().required(),
            lastName:Joi.string().required(),
            email: Joi.string().email().required(),
            picture:Joi.string().required()
        },
        category:Joi.string().required(), //'tutorial', 'workshop', 'article', 'video', 'other',
        mediaFormat:
        {
            format:Joi.string().required(),
            icon:Joi.string().required()
        }        
    }
    
    handleSubmit = (e) => {    
        e.preventDefault();

        const result = Joi.validate(this.state.newData, this.schema, { abortEarly: false });

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

        authService.createNewRecord(this.state.newData, success => {
            if(success) { this.props.history.push('/')}//user regitsered -> redirect to main page
            else { this.props.history.push('/signin')}//something went worg -> redirect to login
        })
    }    

    handleChange = (e) => {
            //updating state with the change in the form field
            const { name, value } = e.target //destructuring
            const newData = { ...this.state.newData}
            newData[name] = value;
            
            this.setState({ newData })
    }

    handleAuhtorChange = (e) => {
        let { authors } = { ...this.state.newData };
        let newData = authors;
        let { name, value } = e.target;
        newData[name] = value;
        
        this.setState({ authors: newData });            
    }

    handleMediaChange = (e) => {
        let { mediaFormat } = { ...this.state.newData };
        let currentState = mediaFormat;
        let { name, value } = e.target;
        currentState[name] = value;
        
        this.setState({ mediaFormat: currentState });            
    }

    render(){

        return ( 
            <form className="form-signin" onSubmit={ this.handleSubmit }>

                <h1 className="h3 mb-3 font-weight-normal text-center">Register New Record</h1>

                <label htmlFor="title" className="sr-only">Title</label>
                <input onChange={ this.handleChange } 
                        name="title"
                        type="text" 
                        id="title" 
                        className="form-control" 
                        placeholder="Title" autoFocus 
                />
                

                <label htmlFor="description" className="sr-only">Description</label>
                <input onChange={ this.handleChange } 
                        name="description"
                        type="text" 
                        id="description" 
                        className="form-control" 
                        placeholder="Description"  
                />
                

                <label htmlFor="url" className="sr-only">URL</label>
                <input onChange={ this.handleChange } 
                        name="url"
                        type="text" 
                        id="url " 
                        className="form-control" 
                        placeholder="URL"   
                />
                

                <label htmlFor="icon" className="sr-only">Image</label>
                <input onChange={ this.handleMediaChange } 
                        name="icon"
                        type="text" 
                        id="icon" 
                        className="form-control" 
                        placeholder="Image" autoFocus 
                />
               

                <div className="input-group mt-1 ">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="format">Format</label>
                    </div>
                    <select className="custom-select" id="format" name="format" onChange={ this.handleMediaChange } >
                        <option defaultValue>Choose a format...</option>
                        <option value="audio">Audio</option>
                        <option value="downloadable doc">Downloadable Doc</option>
                        <option value="ebook">eBook</option>
                        <option value="image">Image</option>
                        <option value="online article">Online Article</option>
                        <option value="video">Video</option>
                        <option value="website">Website</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div className="input-group mt-1 mb-4">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="category">Category</label>
                    </div>
                    <select className="custom-select" id="category" name="category" onChange={ this.handleChange }>
                        <option defaultValue>Choose a category...</option>
                        <option value="tutorial">Tutorial</option>
                        <option value="workshop">Worshop</option>
                        <option value="article">Article</option>
                        <option value="video">Video</option>
                        <option value="other">Other</option>

                    </select>
                </div>

                <p><strong className="mb-2">Author</strong></p>
                
                <label htmlFor="firstName" className="sr-only">First Name</label>
                <input onChange={ this.handleAuhtorChange } 
                        name="firstName"
                        type="text" 
                        id="firstName" 
                        className="form-control" 
                        placeholder="First Name" autoFocus 
                />
                

                <label htmlFor="lastName" className="sr-only">Last Name</label>
                <input onChange={ this.handleAuhtorChange } 
                        name="lastName"
                        type="text" 
                        id="lastName" 
                        className="form-control" 
                        placeholder="Last Name"  
                />
                

                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input onChange={ this.handleAuhtorChange } 
                        name="email"
                        type="text" 
                        id="inputEmail" 
                        className="form-control" 
                        placeholder="Email address"   
                />
                

                <label htmlFor="picture" className="sr-only">Picture</label>
                <input onChange={ this.handleAuhtorChange } 
                        name="picture"
                        type="text" 
                        id="picture" 
                        className="form-control" 
                        placeholder="Picture"  
                />
                               
                <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>

                {
                    this.state.errors.length > 0
                    &&
                    <div className="alert alert-danger mt-2">
                        
                        <small className="mb-0">
                            {
                                this.state.errors                                    
                                    .map((error, i) => {
                                        return <p key={i}> { error.message }</p>
                                    })
                            }
                        </small>
                    </div>                             
                }
            </form>
     );
    }    
}
 
export default CreateForm;