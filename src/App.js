import React, { Component } from 'react';
import Landingpage from "./Landing.js";
import Chat from "./Chat.js";
import Sticker from "./Sticker.js";


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
        });
    }
    
    
  render() {
      
          
      var cPage = null;
          
      
      if(this.state.page === ""){
          cPage = <Landingpage changepage= {this.changePage} />
      }
      else if(this.state.page === "Chat"){
          cPage = <Chat/>
      }
          else if(this.state.page == "sticker"){
              cPage = <Sticker/>
          }
    
    return (
        <div>
        
        
        {cPage}
        </div>
    );
  }
}

export default App;
