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
            posts: [],
            showMessage: false,
            message: "View all events",
            
            
            selectedDescription: "", 
            selectedTitle: ""
        }
    }


    _showMessage = (bool, e) => {
        this.setState({
          showMessage: bool,
        
        });
        if (bool) {
            this.setState({
                message: "Collapse all events" 
              
              });
        }
        else {
            this.setState({
                message: "View all events" 
              
              });
        }
      }



    componentDidMount = () => {
        this.getPost() 
    }

    getPost = () => {

		// https://bianbackend.herokuapp.com/api/getMessage
        axios.get('https://server-r8ug5ernl-bianlee.vercel.app/api/getMessage')
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


   handleSelectItem = (e) => {
     console.log(e.target.dataset.description)
     console.log(e.target.dataset.title)
    this.setState({
        selectedDescription: e.target.dataset.description, 
        selectedTitle: e.target.dataset.title
    })
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
    handleDiscardItem = (e) => {
        this.setState({
            selectedDescription: "", 
            selectedTitle: ""
        })
    }
    handleCategoryCount = (e) => {
        console.log(this.state.category); 
        if (this.state.categoryCount == 2) {
           this.setState({alert: false}) 
        }
        if (e.target.checked) {
            if (this.state.categoryCount > 1) {
                e.preventDefault(); 
                this.setState({alert: true}) 
            }
            else {
                this.setState({categoryCount: this.state.categoryCount + 1})
                this.setState({ category: [...this.state.category, e.target.dataset.name] }, function () {
                    console.log(this.state.category);
                });
            }
        }
        else {
            this.setState({categoryCount: this.state.categoryCount - 1})
            this.setState({category: this.state.category.filter(item => item !== e.target.dataset.name)}, function() {
                console.log(this.state.category); 
            })

        }


        {/*
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
        */}
    }


    

    onSubmit(e) {
        

       e.preventDefault(); 
        console.log(this.state.category)
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
        // https://bianbackend.herokuapp.com/api/postMessage
         axios.post('https://server-r8ug5ernl-bianlee.vercel.app/api/postMessage', message)
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
        <h2 className="dod-heading-2 dod-stack-24">Upcoming events!</h2>
           
            { this.state.showMessage ? (
                <>
                    <div className="dod-media-grid dod-stack-15" >
                    {this.state.posts.slice(0).reverse().map(post => {
                            return(
                                <>
                            <div href="/dogs/frieda/" key={post._id} data-description={post.description}  data-title={post.title} className="dod-card" id={`${post.category}`} onMouseLeave={this.handleDiscardItem} onMouseEnter={this.handleSelectItem}> 
                                    <p className="dod-heading-3 dod-stack-16" data-description={post.description}  data-title={post.title}>{post.title}</p>
                            </div>
                            
                            </>
                            )
                    })}
                    </div>
                </> 
            ) : (
                <>
                    <div className="dod-media-grid dod-stack-15" >
                    {this.state.posts.slice(0, 8).reverse().map(post => {
                            return(
                                <>
                            <div href="/dogs/frieda/" key={post._id} data-description={post.description}  data-title={post.title} className="dod-card" id={`${post.category}`} onMouseLeave={this.handleDiscardItem} onMouseEnter={this.handleSelectItem}> 
                                    <p className="dod-heading-3 dod-stack-16" data-description={post.description}  data-title={post.title}>{post.title}</p>
                            </div>
                            
                            </>
                            )
                    })}
                    </div>
                </>
            )}
            <br/><a onClick={this._showMessage.bind(null, ! this.state.showMessage)}>{this.state.message}</a>
        </main>


        <main data-grid-area="main" style={{marginTop: "15px", display: "inline-block", wordBreak: "break-word", height: "200px"}}>
            <b><p style={{fontSize: "2rem", fontWeight: "900", lineHeight: "40px"}}>{this.state.selectedTitle}</p></b>
            <br></br><p>{this.state.selectedDescription}</p>
          
          {/* 
                {this.state.posts.map(post => {
                    return post.id == this.state.selectedID ?
                        <p key={post.id}>{post.description}</p>
                        :
                        <p></p>
                })}   
                */}
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
                <label htmlFor="name" className="dod-label dod-stack-4" >Event Title (40 characters max)</label>
                
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
                <label htmlFor="bio" className="dod-label  dod-stack-4">Event Description (500 characters max)</label>
                <textarea maxLength={500} name="bio" placeholder="Briefly describe the event!" className="dod-input dod-stack-4" onChange={this.handleDescriptionLimit}  defaultValue={""} />
            {this.state.descriptionLimit > 0 ? (
                 <label>Characters left: {this.state.descriptionLimit}</label>
            ) : (
                <label>Characters left: {this.state.descriptionLimit} - No more characters allowed!</label>
            )}
              </div>
              <label htmlFor="bio" className="dod-label  dod-stack-4">Event Categorization</label>
            <input type="checkbox" disabled={this.state.disabled} id="mathsButton" data-name="math" onClick={this.handleCategoryCount}autoFocus/>
            <label htmlFor="mathsButton">Math</label>{'\u00A0'}{'\u00A0'}

             <input type="checkbox" id="physicssButton" data-name="physics" disabled={this.state.disabled} onClick={this.handleCategoryCount} autoFocus/>
            <label htmlFor="physicssButton">Physics</label>{'\u00A0'}{'\u00A0'}

            <input type="checkbox" id="chemistrysButton" data-name="chemistry" disabled={this.state.disabled} onClick={this.handleCategoryCount} autoFocus/>
            <label htmlFor="chemistrysButton">Chemistry</label>{'\u00A0'}{'\u00A0'}

            <input type="checkbox" id="biologyButton" data-name="biology" disabled={this.state.disabled} onClick={this.handleCategoryCount} autoFocus/>
            <label htmlFor="biologyButton">Biology</label>{'\u00A0'}{'\u00A0'}
            <input  type="checkbox" disabled={this.state.disabled} id="computerscienceButton" data-name="computerscience" onClick={this.handleCategoryCount} autoFocus/>
            <label htmlFor="computerscienceButton">Computer Science</label>{'\u00A0'}{'\u00A0'}
            <input  type="checkbox" disabled={this.state.disabled} id="engineeringButton" data-name="engineering" onClick={this.handleCategoryCount}autoFocus/>
            <label htmlFor="engineeringButton">Engineering</label>{'\u00A0'}{'\u00A0'}
            <input type="checkbox" disabled={this.state.disabled}  id="humanitiesButton" data-name="humanities" onClick={this.handleCategoryCount} autoFocus/>
            <label htmlFor="humanitiesButton">Humanities</label>{'\u00A0'}{'\u00A0'}
            <input type="checkbox" disabled={this.state.disabled}  id="musicsButton" data-name="musics" onClick={this.handleCategoryCount} autoFocus/>
            <label htmlFor="musicsButton">Music</label>{'\u00A0'}{'\u00A0'}
            <input type="checkbox"  disabled={this.state.disabled} id="otherButton" data-name="other" onClick={this.handleCategoryCount} autoFocus/>
            <label htmlFor="otherButton">Other</label>
           { this.state.alert == true ? (
              <label htmlFor="name"><b><br></br>You can only select up to two categories</b></label>
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

