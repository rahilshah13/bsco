import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../styles/form.css';
import api_service from '../services/api_service';


const isComp = window.innerWidth > 1000;

const clueStyle =  {width:"90%", textAlign: "start", marginTop: isComp ? "4vh" : "5vw", fontSize: isComp ? "2vh" : "4.5vw"} 

const textInputStyle = {outline:"none", border:"none", width:"90%", textAlign: "start", height: isComp ? "5vh" : "5vh", 
                        marginTop:  isComp ? "1vw" : "3vw", fontSize:"2vh"}; 

const formStyle = {display: "grid", gridTemplateColumns: "3fr 6fr", margin: isComp ? "2.5vw" : "5vw"};


function ContentForm({isComp, clue}){

  const [values, setValues] = useState({haiku: "", url: "", clue: "", secret: ""});
  const {emojiPath} = useParams();
  const history = useHistory();

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }      

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("PLSSSS");
      const res = !emojiPath 
      ? await api_service.post("new/content", values) 
      : await api_service.post(emojiPath+"/new", values);
      
      console.log(res);

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
        <h1>😀</h1>
        <input type="text" name="haiku" placeholder="write a haiku" style={textInputStyle} value={values.haiku} onChange={handleChange} />

        <h1>🌐</h1>
        <input type="text" name="url" placeholder="add url" style={textInputStyle} value={values.url} onChange={handleChange} />
        
        <h1>🕵</h1>
        <p style={clueStyle}><strong>{clue}</strong></p>
        
        <h1 style={{}}>㊙</h1>
        <input type="text" name="secret" placeholder="secret answer" style={textInputStyle} value={values.secret} onChange={handleChange} />
      </div>    
      <div style={{marginBottom: isComp ? "2.5vw" : "6vw"}}>
        <button style={{backgroundColor:"transparent", outline:"none", border: "none", fontSize:"4vh"}} onClick={handleSubmit}>🆗</button>
      </div>
    </form>
  );
}
  export default ContentForm;
