import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../styles/form.css';
import api_service from '../services/api_service';
import ReactTooltip from "react-tooltip";

const isComp = window.innerWidth > 1000;
const labelStyle = { textAlign:"start"};
const textInputStyle = {outline:"none", border:"none", width:"66%", textAlign: "start", height:"5vh", marginTop: isComp ? "1.25vh" : "3vw"};
const coordInputStyle = {width: isComp ? "3.5vw" : "10vw", height:"5vh", outline: "none", border:"none", marginTop: isComp ? "1.5vh" : "1vh", 
marginRight: isComp ? ".05vw" : "1vw"};
const yCoordStyle = {...coordInputStyle, marginLeft: isComp ? ".5vw" : "2vw"}
const formStyle = {display: "grid", gridTemplateColumns: "3fr 6fr", margin: isComp ? "2.5vw" : "6vw"};


function EmojiForm({isComp}){

  const [values, setValues] = useState({emoji: "", x: "", y: "", clue: "", secret: ""});
  const {emojiPath} = useParams();
  const history = useHistory();


  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }      

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(emojiPath);
    try {
      let res = await api_service.post(emojiPath, values);
      console.log(res);
      console.log(res.status);
      if(res.status === 200) {
        alert("point added successfully!");
        history.go(0);
      }

    } catch(e) {
      console.log(e);
      alert("error. check form or url.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={formStyle}>
        <h1>😀</h1>
        <input type="text" name="emoji" placeholder="pick an emoji" style={textInputStyle} value={values.emoji} onChange={handleChange} />
        <h1>📍</h1>
          <div style={labelStyle}>
            <input type="text" name="x" placeholder="0 - 100" style={coordInputStyle} value={values.x} onChange={handleChange} />,
            <input type="text" name="y" placeholder="0 - 100" style={yCoordStyle} value={values.y} onChange={handleChange} />
          </div>
        <h1 data-tip data-for="clueTip">❓</h1>
        <ReactTooltip id="clueTip">7 - 21 characters</ReactTooltip>

        <input type="text" name="clue" placeholder="provide a clue" style={textInputStyle} value={values.clue} onChange={handleChange} />
        <h1 data-tip data-for="clueTip" style={{marginBottom:".1vh"}}>㊙</h1>
        <input type="text" name="secret" placeholder="secret answer" style={textInputStyle} value={values.secret} onChange={handleChange} />
      </div>    
      <div style={{marginBottom: isComp ? "2.5vw" : "6vw"}}>
        <button style={{backgroundColor:"transparent", outline:"none", border: "none", fontSize:"4vh"}} onClick={handleSubmit}>🆗</button>
      </div>
    </form>
  );
}
  export default EmojiForm;
