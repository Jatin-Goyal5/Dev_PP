import React from 'react'
import { Switch , Route, Redirect } from 'react-router-dom'; 
import Login from '../Routes/Login'
import Products from '../Routes/Products'
import About from '../Routes/About'
// import  {BrowserRouter as Router} from 'react-router-dom';

const Home = () => {
    return (
        <Switch>
            <PrivateRoute path ="/product" component={Products}></PrivateRoute>
            <Route path ="/login" component={Login}></Route>
            <Route path ="/About" component={About}></Route>
            {/* <Route path ="/" component={Home}></Route> */}
        </Switch>
    );
}

let isAuthenticate = true;

function PrivateRoute({component: Component, ...rest}){
    console.log(rest);
    return(
        <Route {...rest} render = {
            (props)=>{
                return (
                    isAuthenticate == true? <Component {...props} ></Component>:
                    <Redirect {...props} to ="/login"></Redirect>
                );
            } 

        }> </Route>
        // <Product></Product>
    );
}

function PrivateRoute({ component: Component, ...rest }) {
    // let Component = props.component;
    // delete prop.component;
    // let rest={...props};
    console.log(rest);
    // render function allows conditional rendering
  
    return (
      <Route {...rest} render={(props) => {
  
        return (isAuthenticate == true ? 
        <Component {...props}></Component> : 
        <Redirect {...props} 
        to="/login"></Redirect>)
        // /check -> auth -> allow access
      }}></Route>
    )
    // x -> rerroute login page
  }
 
export default Home;