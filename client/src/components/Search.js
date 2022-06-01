import React from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
import Card from './Card';
import dataService from '../services/dataService';
import { Link } from 'react-router-dom';

class Search extends React.Component {

  state = {
    lObjects:[],
    categorySearch:''
  }

  componentDidMount(){
    console.log(`Search componentDidMount!!! -> ${this.props.match.params.title}`);
    dataService.searchByTitle(this.props.match.params.title, (err,data) => {
      if(err){
        console.log(err);
        return;
      }
      this.setState({lObjects: data});
      // if(Object.keys(this.setState.lObjects.length == 0))
      // {
      //   console.log('No records found')
      //   dataService.getData((err,data) => {
      //     if(err) return err
          
      //     this.setState({
      //       lObjects: data,
      //       searchTitle: document.getElementById('titleSearch').value
      //     });
      //   })
      // }
    })
  }

  handleDelete = (e, id, name) => {
    var retVal = window.confirm(`Delete ${name}?`);
    if(retVal){

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
                    <option defaultValue> Select a category to search for a Learning Object ...</option>
                    <option value="tutorial">Tutorial</option>
                    <option value="workshop">Worshop</option>
                    <option value="article">Article</option>
                    <option value="video">Video</option>
                    <option value="other">Other</option>
                </select>

                <div className="input-group-append">
                  <Link to={`/search/${ JSON.stringify(this.state.categorySearch) }`} className="btn btn-secondary" type="button">                  
                    <i className="fa fa-search"></i>
                  </Link>
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
                      <Card data = { lObj } index = { index } />              
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
 
export default Search;