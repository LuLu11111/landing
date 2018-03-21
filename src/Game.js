import React, { Component } from 'react';
import './Game.css';

import mySocket from "socket.io-client";


class Game extends Component {

    
     constructor(props){
        super(props);
        this.state = {
            mode:0,
            username:"", 
            img1:require("./mole.png"), 
            img2:require("./mole2.png"), 
            userScore:0,
            ending:false,
            users:[],
        
        }
        
        
        this.joinGame = this.joinGame.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.randomMove = this.randomMove.bind(this);
        this.end = this.end.bind(this);
      this.handleImage2 = this.handleImage2.bind(this);
    }
          
    
    
    
     randomMove() {
         
     /*this.refs["im"].style.position = "absolute";*/ 
         
  this.refs["im"].style.top = Math.floor(Math.random() * window.innerHeight) + "px";
    
   this.refs["im"].style.left = Math.floor(Math.random() * window.innerWidth) + "px";
         
   
}
    
    
    handleImage(){
        

        
       this.refs["im"].src = this.state.img2;
        
        
        
       this.setState({
            userScore:this.state.userScore +1
        });
        
    }
    
    handleImage2(){
        

        
       this.refs["im"].src = this.state.img1;
        
        
    }
    
    handleUsername(evt){
        this.setState({
            username:evt.target.value
        })
    }
    
    
    joinGame(){
        this.setState({
            mode:1
        })
        this.socket = mySocket("http://localhost:10008/");
    
        
        this.socket.emit("username", this.state.username);
        
        this.socket.on("usersjoined", (data)=>{
            console.log(data);
            this.setState({
                users:data
            })
            
            
            
            
        });
        
setInterval(this.randomMove,1000);
        
    }
    
    

     end(){
         
        this.setState({
            ending:true
        });
         
        alert(this.state.username+ " Your Score is:"+this.state.userScore);    
    }
    
  render() {
      
         var allUsers = this.state.users.map((obj,i)=>{
        return(
            <div key={i}>
                {obj}
            </div>
        
        )    
        });
      
      var comp = null;
         if(this.state.mode === 0){
            comp = (
            <div id="userTname">
                
                <input className="nameText" type = "text" placeholder = "Please type your name" onChange={this.handleUsername} />
                
                <button className="joinGame" onClick = {this.joinGame}>Start</button>
                
            </div>
        )}
      
      
      
      else if(this.state.mode === 1){
                
            comp = (
                <div id="gameContainer">
                        <div>                 
                           <div id="username">
                                Your Name: {this.state.username}  
                            </div>
                            <div id="alluser"> All User:{allUsers}</div>

                            <div id="score">
                Your Score: {this.state.userScore} </div>  

                
                            <button onClick={this.end} id="end">END GAME</button>
                
                         
                        </div>

                            <img ref="im" className="image1" src={this.state.img1} onMouseDown= {this.handleImage} onMouseUp= {this.handleImage2} 
                
                height={150} />
                


                 </div>
        );   
            
            
        }
      

    
    return (
        <div>
        
        {comp}

        </div>
    );
  }
}

export default Game;
