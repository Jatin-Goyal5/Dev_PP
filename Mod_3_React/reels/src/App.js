import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Feed from "./Components/Feed";
import Signup from "./Components/Signup";
import 
function App (){
  return (<div>
    <Header></Header>
    <Router>
      <Switch>
        <Route Path ="\login" component = {Login} exact></Route>
        <Route Path ="\signup" component = {Signup} exact></Route>
        <Route Path ="\feed" component = {Feed} exact></Route>
        
      </Switch>
    </Router>
  </div>);
}
export default App;
