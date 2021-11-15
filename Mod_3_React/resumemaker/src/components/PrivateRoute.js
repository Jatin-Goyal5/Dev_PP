import React from 'react';
import { Redirect, Route } from 'react-router';

let isAuthenticate = false;

const PrivateRoute = ({component:Component,...rest}) => {
    return (
        <Route {...rest} render={(props)=>{
            return (
                isAuthenticate? <Component {...props} ></Component> :<Redirect {...props} to ="/" />
            );
        }}></Route>
        
    );
}
 
export default PrivateRoute;