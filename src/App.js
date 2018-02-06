import React, { Component } from 'react';
import Landingpage from "./Landing.js";
import Chat from "./Chat.js"


class App extends Component {
    constructor(props){
        super(props);
        this.state={
            page:""
        
        }
        this.changePage=
            this.changePage.bind(this);
    }
    
    
    
    changePage(data){
        this.setState({
            page:data
        })
    }
    
    
  render() {
      
          
      var cPage = null;
          
      
      if(this.state.page === ""){
          cPage = <Landingpage changepage= {this.changePage} />
      }
      else if(this.state.page === "Chat"){
          cPage = <Chat/>
      }
    
    return (
        <div>
        
        
        {cPage}
        </div>
    );
  }
}

export default App;
