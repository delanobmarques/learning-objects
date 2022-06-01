import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import Register from './components/Register';
import Footer from './components/Footer';
import {  BrowserRouter as Router,  Switch,  Route } from "react-router-dom";
import './css/app.css';
import NoMatch from './components/NoMatch';
import CreateForm from './components/CreateForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Component } from 'react';
import EditForm from './components/EditForm';

class App extends Component{
  
    render(){
      return(
      <>
      <Router> 
          <NavBar />            
          <div id="main-content">
              <Switch> {/* list from more explicit to general - first route that matches is shown */}               
                <Route path='/register' component={Register}/>  
                <Route path='/signin' component={SignIn}/> {/* https://getbootstrap.com/docs/4.5/examples/sign-in/ */} 
                <Route path='/editForm/:id' component={EditForm}/>      
                <Route path='/signout' component={SignOut}/>
                <ProtectedRoute path='/createform' component={CreateForm}/>  
                <Route exact path='/' component={Main}/>
                <Route path='*' render={(props) => {return <NoMatch {...props} message='wrong path' />}}/>         
              </Switch>
          </div>               
          <Footer />
        </Router> 
        </>
      );       
    }
}

export default App;
