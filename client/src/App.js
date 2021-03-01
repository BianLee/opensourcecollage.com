import React from "react"
import axios from "axios" 

import { BrowserRouter as Router, Route} from "react-router-dom" 
import HomeMainComponent from "./containers/main" 
import LoginMainComponent from "./containers/login"
 // import "bootstrap/dist/css/bootstrap.min.css";
 // comment
function App() {
  return (
    <Router>
      <Route path='/' exact component={HomeMainComponent}/> 
      <Route path='/post' exact component={LoginMainComponent}/>
    </Router>
  )
}

export default App 
