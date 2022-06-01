import React from 'react';
import { Link } from "react-router-dom";

const Card = (props) =>{
    return <>
    
            <div key = {props.index} className="col-md-4">
                <div className="card mb-4 box-shadow">
                <div className="card-header">
                { props.data.category }
                </div>
                <img 
                    className="card-img-top" 
                    data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" 
                    alt="Thumbnail [100%x225]" 
                    style={{height: 225, width: '100%', display: 'block'}}                    
                    src={ props.data.mediaFormat.icon }  // displaying image
                    data-holder-rendered="true" 
                />
                
                <div className="card-body">
                    {/* diplaying tiltle field */}
                    <p className="card-text">{ props.data.title }</p>
                    
                    <div className="d-flex justify-content-between align-items-center">
                    
                    <div className="btn-group">
                        <a type="button" href={ props.data.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-secondary">View</a>
                        <Link to={`/editForm/${ props.data._id}`} type="button" className="btn btn-sm btn-outline-secondary">Edit</Link>                        
                        <a type="button" onClick={ props.handleClick.bind(this,props.data._id)} href="#" className="btn btn-sm btn-outline-secondary">Delete</a>
                        
                    </div>
                    {/* diplaying author name */}
                    <small className="text-muted">{ `by ${props.data.authors[0].firstName} ${props.data.authors[0].lastName}` }</small>
                    </div>
                </div>  
                </div>
            </div>   
        </>
  }

export default Card;