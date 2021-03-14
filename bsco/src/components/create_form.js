import React, { Component } from 'react';
import '../styles/form.css';
import '../services/api_service';

const labelStyle = { textAlign:"start"};


class EmojiForm extends React.Component {

    constructor({props}) {
      super(props);
      this.state = {emoji: '', xCoord: '', yCoord: '', question: '', secret: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }
  
    handleChange(event) {
        console.log(event);
        this.setState({
          [event.target.name]: event.target.value
        });
    }
  
    handleSubmit(event) {
      alert('A point was submitted: ' + this.state.emoji + this.state.xCoord + this.state.yCoord + this.state.question + this.state.secret);
      event.preventDefault();
    }
    

    render() {
        const textInputStyle = this.props.isComputer 
            ? {outline:"none", border:"none", width:"33%", textAlign: "start", height:"5vh", marginTop: "1vw"} 
            : {outline:"none", border:"none", width:"66%", textAlign: "start", height:"5vh", marginTop: "3vw"};

        const coordInputStyle = this.props.isComputer
            ? {width: "3vw", height:"5vh", outline: "none", border:"none", marginTop: "1vw"}
            : {width: "10vw", height:"5vh", outline: "none", border:"none", marginTop: "1vw"};
        
        const formStyle = this.props.isComputer
            ? {display: "grid", gridTemplateColumns: "3fr 6fr", margin: "2.5vw"}
            : {display: "grid", gridTemplateColumns: "3fr 6fr", margin: "6vw"};

      return (
        <form onSubmit={this.handleSubmit}>
            <div style={formStyle}>
                <h1>😀</h1>
                <input type="text" name="emoji" placeholder="pick an emoji" style={textInputStyle} value={this.state.emoji} onChange={this.handleChange} />
                <h1>📍</h1>
                <div style={labelStyle}>
                    <input type="text" name="xCoord" placeholder="0 - 100" style={coordInputStyle} value={this.state.xCoord} onChange={this.handleChange} />,
                    <input type="text" name="yCoord" placeholder="0 - 100" style={coordInputStyle} value={this.state.yCoord} onChange={this.handleChange} />
                </div>
                <h1>❓</h1>
                <input type="text" name="question" placeholder="who is joe?" style={textInputStyle} value={this.state.question} onChange={this.handleChange} />
                <h1 style={{marginBottom:".1vh"}}>㊙</h1>
                <input type="text" name="secret" placeholder="joe mama!" style={textInputStyle} value={this.state.secret} onChange={this.handleChange} />
            </div>    
            <div style={this.props.isComputer ? {marginBottom: "2.5vw"} : {marginBottom: "6vw"}}>
                <button style={{backgroundColor:"transparent", outline:"none", border: "none", fontSize:"4vh"}} onClick={this.handleSubmit}>🆗</button>
            </div>
        </form>
      );
    }
  }
  export default EmojiForm;