import React, { Component } from 'react';
import logo from './2.png';
import logo2 from './5.png';
import './App.css';
import Chat from "./Chat.js";
import Sticker from "./Sticker.js";
import Game from "./Game.js";
import HGame from "./HGame.js";



class Landing extends Component {
    constructor(props){
        super(props);
        this.state={
            clicked:false,
            Sclicked:false,
            Gclicked:false,
            Ghclicked:false
            
        };
    
      this.changePages= this.changePages.bind(this);
        this.showchat = this.showchat.bind(this);
        this.changetoSticker= this.changetoSticker.bind(this);
        this.changetoGame = this.changetoGame.bind(this);
        
        this.changetoHGame = this.changetoHGame.bind(this);
        this.showSticker = this.showSticker.bind(this);
        this.showGame = this.showGame.bind(this);
        this.showhGame = this.showhGame.bind(this);
    }

    
    changePages(){
        var page = "Chat";
       this.props.changepage(page);
    }
    
    
    
    changetoSticker(){
        var page = "sticker";
        this.props.changepage(page);
        
       
    }
    
    changetoGame(){
        var page = "game";
        this.props.changepage(page);

    }
    
    
    
     changetoHGame(){
        var page = "game2";
        this.props.changepage(page);
        

    }
    
    
    
    
    
    
    showchat(){
        this.setState({
            clicked:!this.state.clicked
        });
    }
      
    showSticker(){
        this.setState({
            Sclicked:!this.state.Sclicked
        });
        
    }
      
    showGame(){
       this.setState({
            Gclicked:!this.state.Gclicked
        });
    }
      
    showhGame(){
        this.setState({
            Ghclicked:!this.state.Ghclicked
        });
    }
    
  render() {
      
    return (
        
      <div className="App">
    
          <img src={logo2} className="logo" alt="logo" />
        
     
        <img src={logo} className="App-logo" alt="logo" />
        
        
      
        
        <div className="App-intro">
        
        
        <p>Lu Lin</p>
        
        
        <p>
        Lu Lin graduated from shandong college of art in china, and she also has experiences about the art marketing. Since 2016, She has study Digital Design and Development at BCIT, and she has strong skills to use Adobe Suite to create digital or print production. 

        </p>
        
        </div>
        
        
        <div className="App-intro2">
        
        
        <p>Likang Lu</p>
        <p>
     Likang graduated from BCIT with a diploma in digital design and development. She has extensive graphic design knowledge and technical skills. She can effectively utilize Adobe Illustrator, Photoshop, and InDesign to create and alter her work. 
 </p>

        </div>
        
        
        
        
       <div>
        {this.state.clicked ?
        
        <Chat 
        closePopup={this.showchat.bind(this)}
    />

    
    :null
}
         
    
    
    <button className="but1" onClick = {this.showchat.bind(this)}>Chat Now</button>
          
           
          
          {this.state.Sclicked ?
        
        <Sticker 
        closePopup={this.showSticker.bind(this)}
    />
    :null
          }

          <button className="but2" onClick = {this.showSticker.bind(this)}>Sticker Page</button>
          
          
          
          
          {this.state.Gclicked ?
        
        <Game 
        closePopup={this.showGame.bind(this)}
    />
    :null
} 
          
          
          <button className="but3" onClick = {this.showGame.bind(this)}> Game</button>
          
           {this.state.Ghclicked ?
        
        <HGame 
        closePopup={this.showhGame.bind(this)}
    />
    :null
} 
          
           <button className="but4" onClick = {this.showhGame.bind(this)}> Qustion Game</button>
           
        </div>
        
      </div>
    );
  }
}

export default Landing;
