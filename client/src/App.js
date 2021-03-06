import React from "react"
import axios from "axios" 

import { BrowserRouter as Router, Route} from "react-router-dom" 
import HomeMainComponent from "./containers/main" 
import LoginMainComponent from "./containers/login"
import AboutComponent from "./containers/about"
import ApplyComponent from "./containers/apply"
 // import "bootstrap/dist/css/bootstrap.min.css";
 // comment
function App() {
  return (
    <Router>
      <Route path='/' exact component={HomeMainComponent}/> 
      <Route path='/about' exact component={AboutComponent}/>
      <Route path='/apply' exact component={ApplyComponent}/>
      <Route path='/post' exact component={LoginMainComponent}/>
    </Router>
  )
}

export default App 
