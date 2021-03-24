import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../styles/form.css';
import api_service from '../services/api_service';
import { useEffect } from 'react';

const clueStyle =  window.innerWidth > 1000
? {width:"90%", textAlign: "start", marginTop: "1.5vw", fontSize:"2vh"} 
: {width:"90%", textAlign: "start", marginTop: "1.5vw", fontSize:"2vh"};

const textInputStyle = window.innerWidth > 1000
? {outline:"none", border:"none", width:"33%", textAlign: "start", height:"5vh", marginTop: "1vw", fontSize:"2vh"} 
: {outline:"none", border:"none", width:"66%", textAlign: "start", height:"5vh", marginTop: "3vw"};


const formStyle = window.innerWidth > 1000
? {display: "grid", gridTemplateColumns: "3fr 6fr", margin: "2.5vw"}
: {display: "grid", gridTemplateColumns: "3fr 6fr", margin: "6vw"};


function ContentForm({isComputer, clue}){

  const [values, setValues] = useState({haiku: "", url: "", clue: "", secret: ""});
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
      if(res.status === 200) {
        history.push("/");
      }
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={formStyle}>
        <h1>😀</h1>
        <input type="text" name="emoji" placeholder="write a haiku" style={textInputStyle} value={values.haiku} onChange={handleChange} />
        <h1>🌐</h1>
        <input type="text" name="emoji" placeholder="add url" style={textInputStyle} value={values.url} onChange={handleChange} />
        
        <h1>🕵</h1>
        <p style={clueStyle}><strong>{clue}</strong></p>
        
        <h1 style={{marginBottom:".1vh"}}>㊙</h1>
        <input type="text" name="secret" placeholder="secret answer" style={textInputStyle} value={values.secret} onChange={handleChange} />
      </div>    
      <div style={isComputer ? {marginBottom: "2.5vw"} : {marginBottom: "6vw"}}>
        <button style={{backgroundColor:"transparent", outline:"none", border: "none", fontSize:"4vh"}} onClick={handleSubmit}>🆗</button>
      </div>
    </form>
  );
}
  export default ContentForm;
