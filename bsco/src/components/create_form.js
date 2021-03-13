import React, { Component } from 'react';
import '../styles/form.css';

const labelStyle = { textAlign:"start"};
const formStyle = {display: "grid", gridTemplateColumns: "3fr 6fr", margin: "3vw"};
const textInputStyle = { outline:"none", border:"none", width:"33%", textAlign: "start", height:"5vh", marginTop: "1vw"};

class EmojiForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {emoji: '', xCoord: '', yCoord: '', link: '', question: '', secret: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.emoji);
      event.preventDefault();
    }
    

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <div style={formStyle}>
                <h1>😀</h1>
                <input type="text" placeholder="pick an emoji" style={textInputStyle} value={this.state.emoji} onChange={this.handleChange} />
                <h1>📍</h1>
                <div style={labelStyle}>
                    <input type="text" placeholder="0 - 100" style={{width:"3vw", height:"5vh", outline: "none", border:"none", marginTop: "1vw"}} value={this.state.xCoord} onChange={this.handleChange} />,
                    <input type="text" placeholder="0 - 100" style={{width:"3vw", height:"5vh", outline:"none", border:"none"}} value={this.state.yCoord} onChange={this.handleChange} />
                </div>
                <h1>❓</h1>
                <input type="text" placeholder="who is joe?" style={textInputStyle} value={this.state.question} onChange={this.handleChange} />
                <h1 style={{marginBottom:"3vh"}}>㊙</h1>
                <input type="text" placeholder="joe mama!" style={textInputStyle} value={this.state.answer} onChange={this.handleChange} />

            </div>    
        </form>
      );
    }
  }
  export default EmojiForm;