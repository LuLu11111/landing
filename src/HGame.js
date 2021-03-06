import React, { Component } from 'react';
import mySocket from "socket.io-client";
import './Hgame.css';

class HGame extends Component {
    constructor(props){
        super(props);
        this.state = {
            stage:0,
            host:null,
            qobj:{q:null, o1:null, o2:null, a:null}
       
        }
       //this.handleStage = this.state.handleStage.bind(this); 
       
    }
    
    componentDidMount(){
        this.socket = mySocket("https://hgamesocket.herokuapp.com/");
        
        
        this.socket.on("newq", (data)=>{
            this.setState({
                qobj:data
            })
            
            
        });
        
        this.socket.on("result", (data)=>{
            alert(data);
        })
    }
    
    handleStage =(num, roomStr)=>{
        this.setState({
            stage:num
            
        });   
        
        this.socket.emit("joinroom", roomStr);
    }
    
    handlePlayers=(isHost)=>{
        this.setState({
            host:isHost,
            stage:2
        })
        
    }
    
    handleQuestion=()=>{
        var obj ={
            q:this.refs.q.value,
            o1:this.refs.o1.value,
            o2:this.refs.o2.value,
            a:this.refs.a.value
            
        }
        
        this.socket.emit("qsubmit", obj);
        
        this.refs.q.value ="";
        this.refs.o1.value ="";
        this.refs.o2.value ="";
    }
    
    handleAnswer=(num)=>{
        this.socket.emit("answer", num)
    }
    
    render() {
        
        var comp = null;
        
        //if stage is at 0, choose a room. Room component
        if(this.state.stage ===0){
              comp = (
                <div className="bkg1">
                    <button id="but3" onClick={this.handleStage.bind(this, 1, "room1")}>Room 1</button>
                    <button id="but4" onClick={this.handleStage.bind(this, 1, "room2")}>Room 2</button>
                </div>

            );  
            
        } else if (this.state.stage  === 1){
            //select to be either host / player
                comp = (
                <div className="bkg2">
                    <button id="but1" onClick={this.handlePlayers.bind(this, true)}>Make your Qustion</button>
                    <button id="but2" onClick={this.handlePlayers.bind(this, false)}>Play</button>
            
                </div>

            );  
            
            
        } else if (this.state.stage  === 2){
            if(this.state.host ===true){
                comp = (
                    <div className="bkg3">
                    
                        <input ref="q" className="qustion" type="text" placeholder="Type your question here" />
                        <input ref="o1"
                    className="an1"
                    type="text" placeholder="option1" />
                        
                    
                    
                    <input ref="o2"
                    className="an2"
                    type="text" placeholder="option2" />
                    
                    
                    
                        <select ref="a" className="op">
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                        </select>
                        <button className="btn6"
                    onClick={this.handleQuestion}> Submit Question</button>
                    </div>
                );
                
            } 
            
            else if(this.state.host ===false){
                comp = (
                    <div className="bkg4">
                        <div id="qus">{this.state.qobj.q}</div>
                        <button className="btn7" onClick={this.handleAnswer.bind(this, "1")}>{this.state.qobj.o1}</button>
                
                        <button className="btn8"
                        onClick={this.handleAnswer.bind(this, "2")}>{this.state.qobj.o2}</button>
                      
                    </div>
                );
                
            }

        }

        return (
            <div className="bkg3">
                {comp}
            </div>
        )
    }
}

export default HGame;
