import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../styles/form.css';
import api_service from '../services/api_service';
import ReactTooltip from "react-tooltip";


const isComp = window.innerWidth > 1000;

const clueStyle =  {width:"90%", textAlign: "start", marginTop: isComp ? "3vh" : "5vw", fontSize: isComp ? "2vh" : "4.5vw"} 

const textInputStyle = {outline:"none", border:"none", width:"90%", textAlign: "start", height: isComp ? "4vh" : "5vh", 
                        marginTop:  isComp ? "1vw" : "3vw", fontSize:"2vh"}; 

const formStyle = {display: "grid", gridTemplateColumns: "3fr 6fr", margin: isComp ? "2.5vw" : "5vw"};


function ContentForm({isComp, clue}){

  const [values, setValues] = useState({content: "", url: "", clue: "", secret: ""});
  const {emojiPath} = useParams();
  const history = useHistory();

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }      

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = !emojiPath 
      ? await api_service.post("new/content", values) 
      : await api_service.post("new/content/"+emojiPath, values);

      console.log(res);

      if(res.status === 200) {
        history.go(0);
        alert("content added successfully!");
      }
    } catch(e) {
      console.log(e);
      alert("error. check form or url.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={formStyle}>
        <h1>✍</h1>
        <textarea type="text" name="content" placeholder="say something" style={textInputStyle} value={values.content} onChange={handleChange} maxLength="140"/>

        <h1>🌐</h1>
        <input type="text" name="url" placeholder="add url" style={textInputStyle} value={values.url} onChange={handleChange} />

        <h1 data-tip data-for="myClueTip">🕵</h1>
        <ReactTooltip id="myClueTip">my clue</ReactTooltip>
        <p style={clueStyle}><strong>{clue}</strong></p>

        <h1 data-tip data-for="secretTip" style={{}}>㊙</h1>
        <ReactTooltip id="secretTip">use clue to guess answer</ReactTooltip>
        <input type="password" name="secret" placeholder="secret answer" style={textInputStyle} value={values.secret} onChange={handleChange} />
      </div>
      <div style={{marginBottom: isComp ? "2.5vw" : "6vw"}}>
        <button style={{backgroundColor:"transparent", outline:"none", border: "none", fontSize:"4vh"}} onClick={handleSubmit}>🆗</button>
      </div>
    </form>
  );
}
  export default ContentForm;
