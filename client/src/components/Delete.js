import React from 'react';
import '../css/signin.css';
import authService from '../services/authService';
import { Redirect, withRouter } from 'react-router-dom';

class Delete extends React.Component{    

    componentDidMount(){        
        const confirmDelete = window.confirm("Do you really want to delete this item?"); 
        if(confirmDelete === true){ 
            authService.deleteRecord(this.props.match.params.id, success => {
                if(success) { 
                    console.log(`record deleted...`)
                    this.props.history.push('/');
                }
                else { console.log('Something went wrong...could not delete...')}//something went worg -> redirect to login
            })
        }        
      }  
    
    render(){
        return ( 
            <>
                <Redirect to='/signin'/>      
            </>             
        );
    }    
}
 
export default withRouter(Delete);