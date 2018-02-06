import React, { Component } from 'react';

import './App.css';
import mySocket from "socket.io-client";




class Chat extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            mode:0,
            username:"",
            users:[],
            allChats:[],
            myMsg:""
        }
            this.joinChat = this.joinChat.bind(this);
            this.handelUsename = this.handelUsename.bind(this);
        this.handleMyMsg = this.handleMyMsg.bind(this);
        this.sendChat =this.sendChat.bind(this);
        
    }
    
    componentDidMount(){
        //this.socket = mySocket("http://localhost:10001")
    }
                      
    joinChat(){
        this.setState({
            mode:1
        })
        
        this.socket = mySocket("http://localhost:10001");
        this.socket.emit("username", this.state.username);
        this.socket.on("usersJoined",(data) =>{
            this.setState({
                users:data
            })
            
            
        })
        this.socket.on("mdsgent",(data) =>{
            this.setState({
                allChats:data
                
            
        })
        })
    }
        
    handelUsename(evt){
        this.setState({
            username:evt.target.value
        })
    }
    handleMyMsg(evt){
        this.setState({
            myMsg:evt.target.value
        })
    }                 
    sendChat(){
        var msg = this.state.username +":"+ this.state.myMsg;
        this.socket.emit("sendChat",msg);
    }
    
  render() {
      
      var config =null;
      if(this.state.mode === 0){
      config = (
      <div className="inp1"> <input className="input1" type="text" placeholder="type your username" onChange={
          this.handelUsename}/>
          
          <button onClick = {this.joinChat} className="send">Join Chat</button></div>
      )}
      else if(this.state.mode === 1){
          
          
          var allChats = this.state.allChats.map((obj,i)=>{
              return(
              <div key= {i} className="chatd">
              {obj}
              </div>
                  )
          })
          
          config  = (
          <div className="inp1">
              <div id="chatDisplay"> {allChats}</div>
              <div className="inptinfo">
              <input className="input2" type="text" placeholder="type you msg"
              onChange={this.handleMyMsg}
             
              />
              
              <button className="btn2" onClick={this.sendChat}>
              Send
              </button>
              </div>
              
              </div>
          )
      }
      
      
      var allUsers = this.state.users.map((obj,i)=>{
          return (
          <div key= {i}>
              {obj}
              </div>
          )
      })
      
    return (
        
      <div className="chat">
        
        <div id="topbar">
        <p > chart </p>
        
        </div>
        
    <br/><br/><br/>
         
        <div id="sentence">
      {config}
        </div>
      
        <div id="allUsers">
        <div className="users">
         <p className="usersP"> Members </p>
        {allUsers}
        </div>
        </div>
        
      </div>
    );
  }
}

export default Chat;
