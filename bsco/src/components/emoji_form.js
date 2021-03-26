import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../styles/form.css';
import api_service from '../services/api_service';


const labelStyle = { textAlign:"start"};

const textInputStyle = window.innerWidth > 1000
? {outline:"none", border:"none", width:"33%", textAlign: "start", height:"5vh", marginTop: "1vw"} 
: {outline:"none", border:"none", width:"66%", textAlign: "start", height:"5vh", marginTop: "3vw"};

const coordInputStyle = window.innerWidth > 1000
? {width: "3vw", height:"5vh", outline: "none", border:"none", marginTop: "2vh"}
: {width: "10vw", height:"5vh", outline: "none", border:"none", marginTop: "1vh"};

const formStyle = window.innerWidth > 1000
? {display: "grid", gridTemplateColumns: "3fr 6fr", margin: "2.5vw"}
: {display: "grid", gridTemplateColumns: "3fr 6fr", margin: "6vw"};


function EmojiForm({isComputer}){

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
            <input type="text" name="y" placeholder="0 - 100" style={coordInputStyle} value={values.y} onChange={handleChange} />
          </div>
        <h1>❓</h1>
        <input type="text" name="clue" placeholder="provide a clue" style={textInputStyle} value={values.clue} onChange={handleChange} />
        <h1 style={{marginBottom:".1vh"}}>㊙</h1>
        <input type="text" name="secret" placeholder="secret answer" style={textInputStyle} value={values.secret} onChange={handleChange} />
      </div>    
      <div style={isComputer ? {marginBottom: "2.5vw"} : {marginBottom: "6vw"}}>
        <button style={{backgroundColor:"transparent", outline:"none", border: "none", fontSize:"4vh"}} onClick={handleSubmit}>🆗</button>
      </div>
    </form>
  );
}
  export default EmojiForm;
