import React from "react"
import axios from "axios" 
import { BrowserRouter as Router, Route} from "react-router-dom" 
import { HomeMainComponent, NavBar } from "./components/index" 
 // import "bootstrap/dist/css/bootstrap.min.css";
 // comment
function App() {
  return (
    <Router>
      <Route path='/' exact component={HomeMainComponent}/> 
    </Router>
  )
}

export default App 
