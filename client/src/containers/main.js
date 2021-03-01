import React from "react"
import axios from "axios";
import DatePicker from "react-datepicker"
import "../styles/styles.css"
import { BrowserRouter as Router, Route, Link} from "react-router-dom" 
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
            
            selectedDate: "", 
            selectedDescription: "", 
            selectedTitle: "",

            permDate: "", 
            permDescription: "",
            permTitle: "",
            permID: ""
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
                //console.log(JSON.stringify(this.state.posts))
            })
            .catch(() => {
                alert("error retreving data!!")
            }); 
    }


   handleSelectItem = (e) => {
     //console.log(e.target.dataset.description)
     //console.log(e.target.dataset.title)
     console.log(e.target.dataset.date)
    this.setState({
        selectedDescription: e.target.dataset.description, 
        selectedTitle: e.target.dataset.title,
        selectedDate: e.target.dataset.date
    })
   }

    onChangeDate(date) {
        this.setState({
          date: date
        })
      }
      
    handlePerm = (e) => {
        if (this.state.permTitle != "" && e.target.dataset.id == this.state.permID) {
            this.setState({
                permDescription: "", 
                permTitle: "",
                permID: "",
                permDate: ""
            })
        }
        else {
            this.setState({
                permDescription: e.target.dataset.description, 
                permTitle: e.target.dataset.title,
                permID: e.target.dataset.id,
                permDate: e.target.dataset.date
            })
        }
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
            selectedTitle: "",
            selectedDate: ""
        })
    }
    handleCategoryCount = (e) => {
        // console.log(this.state.category); 
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
                   // console.log(this.state.category);
                });
            }
        }
        else {
            this.setState({categoryCount: this.state.categoryCount - 1})
            this.setState({category: this.state.category.filter(item => item !== e.target.dataset.name)}, function() {
                // console.log(this.state.category); 
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
        // console.log(this.state.category)
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
       // console.log(message); 
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
            <h1 className="dod-heading-1 dod-stack-4"><Link to="/"><i>BACC</i></Link></h1>
            <p className="dod-heading-3 dod-stack-16">A platform for higher learning</p>
          </div>
          <Link to="/login" className="dod-button">Login</Link>

                  
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
        {/* <h2 className="dod-heading-2 dod-stack-24">Upcoming events!</h2> */}
           
            { this.state.showMessage ? (
                <>
                    <div className="dod-media-grid dod-stack-15" >
                    {this.state.posts.slice(0).reverse().map(post => {
                            return(
                                <>
                             <div href="/dogs/frieda/" style={{ borderStyle: this.state.permID == post._id ? 'solid': '', borderWidth: this.state.permID == post._id ? '2px': '', borderColor: this.state.permID == post._id ? 'black': ''}} key={post._id} data-date={post.date} data-id={post._id} data-description={post.description}  data-title={post.title} className="dod-card" id={`${post.category}`} onMouseLeave={this.handleDiscardItem} onMouseEnter={this.handleSelectItem} onClick={this.handlePerm}>
                                    <p className="dod-heading-3 dod-stack-16" data-description={post.description} data-date={post.date} data-id={post._id} data-title={post.title}>{post.title}</p>
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
                            <div href="/dogs/frieda/" style={{ borderStyle: this.state.permID == post._id ? 'solid': '', borderWidth: this.state.permID == post._id ? '2px': '', borderColor: this.state.permID == post._id ? 'black': ''}} key={post._id} data-date={post.date} data-id={post._id} data-description={post.description}  data-title={post.title} className="dod-card" id={`${post.category}`} onMouseLeave={this.handleDiscardItem} onMouseEnter={this.handleSelectItem} onClick={this.handlePerm}>
                                    <p className="dod-heading-3 dod-stack-16" data-description={post.description} data-date={post.date}  data-id={post._id} data-title={post.title}>{post.title}</p>
                            </div>
                            
                            </>
                            )
                    })}
                    </div>
                </>
            )}
            <br/><a style={{cursor: "pointer"}} onClick={this._showMessage.bind(null, ! this.state.showMessage)}>{this.state.message}</a>
        </main>


        <main data-grid-area="main" style={{marginTop: "15px", display: "inline-block", wordBreak: "break-word", height: "200px"}}>
           
           {this.state.permTitle != "" ? (
               <>
               <b><p style={{fontSize: "2rem", fontWeight: "900", lineHeight: "40px"}}>{this.state.permTitle}</p></b>
               <br></br><p>{this.state.permDate}</p>
                <br></br><p>{this.state.permDescription}</p> 
               </>
           ) : (
               <>
                  <b><p style={{fontSize: "2rem", fontWeight: "900", lineHeight: "40px"}}>{this.state.selectedTitle}</p></b>
                  <br></br><p>{this.state.selectedDate}</p>
            <br></br><p>{this.state.selectedDescription}</p>
               </> 
           )}
                    
          
          
          {/* 
                {this.state.posts.map(post => {
                    return post.id == this.state.selectedID ?
                        <p key={post.id}>{post.description}</p>
                        :
                        <p></p>
                })}   
                */}
        </main>  
        <footer data-grid-area="footer">
        </footer>
        </section>
      </div>
    
            </> 
        )
        
    }
}

