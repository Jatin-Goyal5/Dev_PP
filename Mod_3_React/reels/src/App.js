import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Feed from "./Components/Feed";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import React, {useContext}from 'react';
import { AuthContext, AuthProvider } from "./Context/AuthProvider";
import '../src/App.css';
function App (){
  return (
    <AuthProvider>
      <Router>
      <div className="app">
      <Header></Header>
      <Switch>
      <Route path ="/signup" component = {Signup} exact></Route>
        <Route  path="/login" component = {Login} exact></Route>
        
        <PrivateRoute path ="/" comp = {Feed}></PrivateRoute>
        <PrivateRoute path ="/profile" comp = {Profile} exact></PrivateRoute>        
      </Switch>
      </div>
    </Router>
    </AuthProvider>
    );
}


function PrivateRoute(props){

  let { comp: Component ,path} = props;

  let {currentUser} = useContext(AuthContext);
  return currentUser?
  (<Route path={path} component={Component}></Route>):(
  <Redirect to="/login"></Redirect>);


}
export default App;



