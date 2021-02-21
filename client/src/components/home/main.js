import React from "react"
import axios from "axios";
import DatePicker from "react-datepicker"
import "../../styles/styles.css"
export default class HomeMainComponent extends React.Component {
    constructor() {
        super();
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
        
        this.state = { 
            date: new Date(),
            titleLimit: 40,
            descriptionLimit: 500,
            titleText: "",
            dateText: "", 
            zoomLink: "", 
            chkbox: true,
            description: "", 
            categoryCount: 0,
            category: [],  
            disabled: false,
            alert: false, 
            posts: [] 
        }
    }

    componentDidMount = () => {
        this.getPost() 
    }

    getPost = () => {
        axios.get('/api/getMessage')
            .then((response) => {
                const data = response.data;
                this.setState({ posts: data});
                console.log("data has been received"); 
                console.log(JSON.stringify(this.state.posts))
            })
            .catch(() => {
                alert("error retreving data!!")
            }); 
    }




    onChangeDate(date) {
        this.setState({
          date: date
        })
      }

    handleTitleLimit = (e) => {
        this.setState({
            titleLimit: 40 - e.target.value.length,
            titleText: e.target.value 
         })
    }
    handleDescriptionLimit = (e) => {
        this.setState({descriptionLimit: 500 - e.target.value.length, 
            description: e.target.value})
    }

    handleStartTime = (e) => {
        this.setState({startTime: e.target.value}); 
    }
    handleEndTime = (e) => {
        this.setState({endTime: e.target.value}); 
    }

    handleZoomLink = (e) => {
        this.setState({zoomLink: e.target.value})
    }

    handleEst = (e) => {
        if (e.target.value == 'on') {
            this.setState({chkbox: false, timeZone: "EST"})
        }
        else {
            this.setState({chkbox: true, timeZone: "EST" })
        }
    }
    handlePst = (e) => {
        if (e.target.value == 'on') {
            this.setState({chkbox: true, timeZone: "PST"})
        }
        else {
            this.setState({chkbox: false, timeZone: "PST"})
        }
    }
    handleCategoryCount = (e) => {
        console.log(this.state.category); 
        if (this.state.categoryCount == 3) {
           this.setState({alert: false}) 
        }
        if (e.target.checked) {
            if (this.state.categoryCount > 2) {
                e.preventDefault(); 
                this.setState({alert: true}) 
            }
            else {
                this.setState({categoryCount: this.state.categoryCount + 1})
                this.setState({ category: [...this.state.category, e.target.id] }, function () {
                    console.log(this.state.category);
                });
            }
        }
        else {
            this.setState({categoryCount: this.state.categoryCount - 1})
            this.setState({category: this.state.category.filter(item => item !== e.target.id)}, function() {
                console.log(this.state.category); 
            })

        }
    }


    

    onSubmit(e) {
        

       e.preventDefault(); 
        
        const message = { 
            title: this.state.titleText,
            date: this.state.date,
            startTime: this.state.startTime, 
            endTime: this.state.endTime,
            timeZone: this.state.timeZone,
            zoomLink: this.state.zoomLink,
            description: this.state.description,
            category: this.state.category
        }
        console.log(message); 
        //  const path = '/api/postMessage'; 
         axios.post('/api/postMessage', message)
           .then(res => console.log(res.data)) 
           .catch(error => {
               console.log("Error!") 
           })
        
        this.getPost()
        console.log("page update?")
    }
    render() {
        return (
            <>
           {/* 
            <section>
            <h1>Promote your virtual event!</h1>
            <form>
            <label htmlFor="name">Title</label>
            <br></br>
            <div>
            <textarea id="first" spellCheck="false" type="text" name="content" defaultValue={""} placeholder="Cybersecurity Summer Camp" onChange={this.handleTitleLimit}/> 
            {this.state.titleLimit >= 0 ? (
                 <label>{this.state.titleLimit}</label>
            ) : (
                <label>{this.state.titleLimit}</label>
            )}
            </div>

            <br></br><br></br>
                <label htmlFor="name">Date: &nbsp;&nbsp;</label>
                <div><DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
                />
                </div>
           
            <br/><br/><label htmlFor="name">Start Time & End Time (follow given format)</label>
            <br></br><textarea id="fourth" type="text"  spellCheck="false" name="content" defaultValue={""} placeholder="07:00 PM" onChange={this.handleStartTime}/> 
            <textarea id="fifth" type="text"  spellCheck="false" name="content" defaultValue={""} placeholder="10:00 PM" onChange={this.handleEndTime}/> 
            <br></br><br></br>
            <label >Time Zone:{'\u00A0'}</label>
            <input name="est" id="est" type="checkbox" onChange={this.handleEst} autoFocus checked={! this.state.chkbox}/>
            <label htmlFor="est">EST</label>
            <input name="pst" id="pst" type="checkbox" onChange={this.handlePst} autoFocus checked={this.state.chkbox}/>
            <label htmlFor="pst" >PST</label>
            

            <br/><br/><label htmlFor="name">Zoom link & password (leave it blank if there's no password): </label>
          
            <br></br><textarea id="second" type="text"  spellCheck="false" defaultValue={""} placeholder="https://us04web.zoom.us/j/0123456789" onChange={this.handleZoomLink}/> 
            
            <textarea id="third" type="text" spellCheck="false" name="content" defaultValue={""} placeholder="passw0rd" onChange={this.handleZoomPassword} /> 
            <br/><br/><label htmlFor="content">Description (include event topic / theme & contact info): </label> 
            <br></br>
            <div>
                <textarea type="text" spellCheck="false" id="content" name="content" defaultValue={""} onChange={this.handleDescriptionLimit} 
                placeholder="Summer camp for all students interested in learning the basics of cybersecurity from OS hardening, networking, cryptography, and ethical hacking!
                Guest speaker from MIT, Harvard University, and the NSA, and a fun game of jeopardy CTF! abcdefg.com for more info, and abcdefg@gmail.com for contact."/>

                {this.state.descriptionLimit >= 0 ? (
                 <label>{this.state.descriptionLimit}</label>
            ) : (
                <label>{this.state.descriptionLimit}</label>
            )}


                
            </div>
            <br></br><br></br>
            <input type="checkbox" id="science" name="science" disabled={this.state.disabled} onClick={this.handleCategoryCount} autoFocus/>
            <label htmlFor="science">Science</label>
            <input  type="checkbox" disabled={this.state.disabled} id="technology" name="technology" onClick={this.handleCategoryCount} autoFocus/>
            <label htmlFor="technology">Technology</label>
            <input  type="checkbox" disabled={this.state.disabled} id="engineering" name="engineering" onClick={this.handleCategoryCount}autoFocus/>
            <label htmlFor="engineering">Engineering</label>
            <input type="checkbox" disabled={this.state.disabled} id="math" name="math" onClick={this.handleCategoryCount}autoFocus/>
            <label htmlFor="math">Math</label>
            <input type="checkbox" disabled={this.state.disabled}  id="humanities" name="humanities" onClick={this.handleCategoryCount} autoFocus/>
            <label htmlFor="humanities">Humanities</label>
            <input type="checkbox"  disabled={this.state.disabled} id="other" name="other" onClick={this.handleCategoryCount} autoFocus/>
            <label htmlFor="other">Other</label>
           <br></br><br></br> { this.state.alert == true ? (
              <label htmlFor="name"><b>You can only select up to three categories</b></label>
            ) : (
                <label htmlFor="name"></label>
            )}
            <br /><br /><button className="submitButton" onClick={this.onSubmit}>Post</button>

            </form>
            
              
                </section> 

            <div className="hello">
                <p>Hello</p>
                {this.state.posts.slice(0).reverse().map(post => {
                    return (
                        <>
                        <p key={post.id}><b>{post.title}</b>: {post.description}</p>
                        </>
                    )
                })}
                <br></br>
                
                {this.state.posts.slice(0).reverse().map(post => {
                   return post.category.includes("science") ?
                        <p key={post.id}>science</p>
                    :
                    <p>Hello</p>
                })}
            </div> 
              */}

      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bian</title>
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="stylesheet" href="styles.css" />
        <section className="dod-layout-default">
        <header data-grid-area="header" className="dod-space-between-responsive">
          <div>
            <h1 className="dod-heading-1 dod-stack-4"><a href="/">Caga</a></h1>
            <p className="dod-heading-3 dod-stack-16">A platform for higher learning</p>
          </div>
          <a href="/submit" className="dod-button">Login</a>
        </header>
                {/* 
                {this.state.posts.slice(0).reverse().map(post => {
                   return post.category.includes("science") ?
                        <p key={post.id}>science</p>
                    :
                    <p>Hello</p>
                })}
                */}
        <main data-grid-area="main">
            <div className="dod-media-grid dod-stack-15" >
            {this.state.posts.slice(0).reverse().map(post => {
                    return (
                        <>
                      <div href="/dogs/frieda/" className="dod-card"> 
                             <p className="dod-heading-3 dod-stack-16" key={post.id}>{post.title}</p>
                         </div>
                    </>
                    )
                })}
            </div>
        </main>
        <main data-grid-area="main" style={{marginTop: "15px"}}>
        
          <h2 className="dod-heading-2 dod-stack-24">Promote your virtual event!</h2>
          <article className="dod-article dod-flow">
            <p>_____ is a platform for high school students, for sharing and browsing online events -- 
                In this community, discover the next online lecture to attend for the weekend, find a competition 
                on a subject you are passionate about, or promote your zoom meeting you have worked hard to organize!
            </p>
            <form name="Submit a Dog" action="/success" className="dod-flow" method="post"><input type="hidden" name="form-name" defaultValue="Submit a Dog" />
              <div>
                <label htmlFor="name" className="dod-label  dod-stack-4" >Event Title (40 characters max)</label>
                
                <input type="text" maxLength={40} name="name" placeholder="" className="dod-input" onChange={this.handleTitleLimit} required />  
              </div>
              <div>
                <label htmlFor="url" className="dod-label  dod-stack-4">Event Date</label>
                <div>
                <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
              required 
            />
          </div>
          </div>
              </div>
              <div>
                <label htmlFor="url" className="dod-label  dod-stack-4">Zoom Link</label>
                <input type="text" maxLength={128} name="url" placeholder="https://us00web.zoom.us/s/0123456789" onChange={this.handleZoomLink} className="dod-input" required />
              </div>
              <div>
              <input name="est" id="est" type="checkbox" onChange={this.handleEst} autoFocus checked={! this.state.chkbox}/>
            <label htmlFor="est">EST</label>
            {'\u00A0'}{'\u00A0'}
            <input name="pst" id="pst" type="checkbox" onChange={this.handlePst} autoFocus checked={this.state.chkbox}/>
            <label htmlFor="pst" >PST</label>
            <br/><br/>
                <label htmlFor="bio" className="dod-label  dod-stack-4">Event Description (500 characters max)</label>
                <textarea maxLength={500} name="bio" placeholder="Briefly describe the event!" className="dod-input dod-stack-4" onChange={this.handleDescriptionLimit}  defaultValue={""} />
            {this.state.descriptionLimit > 0 ? (
                 <label>Characters left: {this.state.descriptionLimit}</label>
            ) : (
                <label>Characters left: {this.state.descriptionLimit} - No more characters allowed!</label>
            )}
              </div>
              <label htmlFor="bio" className="dod-label  dod-stack-4">Event Categorization (3 max)</label>
              <input type="checkbox" id="science" name="science" disabled={this.state.disabled} onClick={this.handleCategoryCount} autoFocus/>
            <label htmlFor="science">Science</label>{'\u00A0'}{'\u00A0'}
            <input  type="checkbox" disabled={this.state.disabled} id="technology" name="technology" onClick={this.handleCategoryCount} autoFocus/>
            <label htmlFor="technology">Technology</label>{'\u00A0'}{'\u00A0'}
            <input  type="checkbox" disabled={this.state.disabled} id="engineering" name="engineering" onClick={this.handleCategoryCount}autoFocus/>
            <label htmlFor="engineering">Engineering</label>{'\u00A0'}{'\u00A0'}
            <input type="checkbox" disabled={this.state.disabled} id="math" name="math" onClick={this.handleCategoryCount}autoFocus/>
            <label htmlFor="math">Math</label>{'\u00A0'}{'\u00A0'}
            <input type="checkbox" disabled={this.state.disabled}  id="humanities" name="humanities" onClick={this.handleCategoryCount} autoFocus/>
            <label htmlFor="humanities">Humanities</label>{'\u00A0'}{'\u00A0'}
            <input type="checkbox"  disabled={this.state.disabled} id="other" name="other" onClick={this.handleCategoryCount} autoFocus/>
            <label htmlFor="other">Other</label>
           { this.state.alert == true ? (
              <label htmlFor="name"><b><br></br>You can only select up to three categories</b></label>
            ) : (
                <label htmlFor="name"></label>
            )}
            <br></br>
              <button type="submit" className="dod-button-secondary" onClick={this.onSubmit}>Post!</button>
            </form>
          </article>
        </main>
        <footer data-grid-area="footer">
        </footer>
        </section>
      </div>
    
            </> 
        )
        
    }
}

