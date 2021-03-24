import '../styles/app.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import api_service from '../services/api_service';
import axios from 'axios';

const loadingMessage = <span style={{position: "absolute", fontSize: "30vh", top: "27%", left: "43%",textAlign:"center"}}>⌛</span>;

function Content({isComputer, isLoading, emojiList, match}) {
   const containerStyle = isComputer 
   ? {backgroundColor:"burlywood", padding:"1%", height: "75vh"}
   : {backgroundColor:"burlywood", padding:"1%", height: "75vh"};

   const linkContainer = isComputer
   ? {position:"absolute", bottom: "30%", left: "15%"}
   : {position:"absolute", bottom: "30%", left: "25%"};

  const {emojiPath} = useParams();

  useEffect(async ()=> {
    try {
      let data = await axios.get(emojiPath);
      console.log(data);
    } catch(e) {
      console.log(emojiPath);
    }
  },[]);

  return (
    isLoading
    ? loadingMessage
    :<div style={containerStyle}>
        <a style={linkContainer} href="https://www.youtube.com/embed/tgbNymZ7vqY">{emojiPath}</a>
    </div>
  );
}

export default Content;
