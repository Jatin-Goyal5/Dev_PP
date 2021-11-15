
// import './App.css';
import React from 'react';
import { Switch } from 'react-router-dom';
import Header from './components/Presentation/header'
import {BrowserRouter as Router} from 'react-router-dom';
function App() {
  return (
    <Router>
        <div className="App">
        <Header></Header>
        </div>
        <Switch>

        </Switch>
    </Router>
   
  );
}

export default App;
