import React from 'react';
// import { withRouter } from 'react-router-dom';

const NoMatch = (props) =>{

    return <>
            <h1>No Match {props.location.pathname}</h1>
            <h2>{props.message}</h2>
        </>
  }

//   export default withRouter(NoMatch);//higer order function/component
export default NoMatch;