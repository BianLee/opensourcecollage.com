import React from "react"
import axios from "axios" 

import { BrowserRouter as Router, Route} from "react-router-dom" 
import { HomeMainComponent, LoginComponent } from "./components" 
 // import "bootstrap/dist/css/bootstrap.min.css";
 // comment
function App() {
  return (
    <Router>
      <Route path='/' exact component={HomeMainComponent}/> 
      <Route path='/submit' exact component={LoginComponent}/>
    </Router>
  )
}

export default App 
