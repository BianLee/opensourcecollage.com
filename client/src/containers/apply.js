import React from "react"
import "../styles/styles.css"
import { BrowserRouter as Router, Route, Link} from "react-router-dom" 
export default class ApplyComponent extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <>
            <div>
              <meta charSet="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Bian</title>
              <link rel="alternate icon" href="/favicon.ico" />
              <link rel="stylesheet" href="styles.css" />
              <section className="dod-layout-default">
              <header data-grid-area="header" className="dod-space-between-responsive">
              <div>
                  <h1 className="dod-heading-1 dod-stack-4 logo" style={{justifyContent: "trie"}}><Link to="/">ecw+</Link></h1>
                  <p className="dod-heading-3 dod-stack-16 logoDesc">High school events, conferences, and workshops</p>
                </div>
                <p></p>
                <Link to="/about" style={{marginLeft: "18px"}}>About</Link>
                <Link to="/apply"  style={{marginLeft: "10px"}}>Apply</Link>
                <Link to="/post" className="dod-button" style={{marginLeft: "10px"}}>Post</Link>
              </header>
              <main data-grid-area="main">
                 
              </main>
              <footer data-grid-area="footer">
              </footer>
              </section>
            </div>
          
                  </> 
        )
    }
}