import React from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
import Card from './Card';
import dataService from '../services/dataService';
import authService from '../services/authService';

class Main extends React.Component {

  state = {
    lObjects:[]
  }

  getData(){//method to retrieve all data from api
    dataService.getData((err,data) => {
      if(err){
        console.log(err);
        return;
      }
      this.setState({
        lObjects: data
      });
    }) 
  }

  componentDidMount(){
    console.log('componentDidMount!!!');
    this.getData();  //call method to load all data from api
  }

  deleteRecord = (id) => {//method to delete a record
    //message dialog so user can confirm delete operation
    const confirmDelete = window.confirm("Do you really want to delete this item?"); 
        
    if(confirmDelete === true){                                   
      authService.deleteRecord(id, success => {
          if(success) { 
            console.log('record deleted...')
            this.getData();//call method to (update) set state without the deleted record
          }
          else { console.log('Could not delete record...')}//something went worg 
      })
    }  
  }

  handleChange = (e) => {//search records by category
    
    const searchValue = e.target.value; // grabs the select value from dropbox 

    if((!searchValue)||(searchValue==="all")){
      this.getData()
    }
    else{
      dataService.searchRecord(searchValue, (data) => {
        if(data){
          console.log(data)
          this.setState({ lObjects: data });          
        }else{
          console.log('no results')
        }
        
      })
    }
}

    render(){
      return ( 
        <>
        <div>             
          <section className="jumbotron text-center">
            <div className="container">
              <div className="input-group">               
                
                <select className="custom-select" id="categorySearch" name="categorySearch" onChange={ this.handleChange }>
                    <option value="all" defaultValue> Select a category to search for a Learning Object ...</option>
                    <option value="all">All</option>
                    <option value="article">Article</option> 
                    <option value="tutorial">Tutorial</option>
                    <option value="workshop">Worshop</option>
                              
                    <option value="other">Other</option>
                    
                </select>

                <div className="input-group-append">
                  <div to={`/`} className="btn btn-secondary" type="button"> 
                    <i className="fa fa-search"></i>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="album py-5 bg-light">
            <div className="container">
              <div className="row">

                {
                  this.state.lObjects.map((lObj, index) => {

                    return (
                      //card component to display api data
                      <Card data = { lObj } index = { index } handleClick = { this.deleteRecord} />              
                    )
                  })
                }                        

              </div>
            </div>
          </div>
        </div>
        </>
      );
    }
}
 
export default Main;