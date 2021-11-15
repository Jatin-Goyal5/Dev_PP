
// import { Provider } from "react-redux";
// import Counter from "./Component/Counter";
// import store from "./store";

import  {BrowserRouter as Router} from 'react-router-dom';
import Home from '../src/Component/Routes/Home'
function App() {
  return (
    // <Provider store ={store}>
    //    <div className="App">
    //     <Counter>

    //     </Counter>
    //   </div>
    // </Provider>
    <Router>
      <Home>
        
      </Home>
    </Router>
   
  );
}

export default App;
