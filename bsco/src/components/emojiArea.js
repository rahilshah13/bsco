import '../styles/app.css';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';

const loadingMessage = <span style={{position: "absolute", fontSize: "30vh", top: "27%", left: "43%",textAlign:"center"}}>⌛</span>;

function EmojiArea({isComputer, isLoading, emojiList, match}) {
   const containerStyle = isComputer 
   ? {backgroundColor:"AliceBlue", padding:"1%", height: "75vh", marginLeft: "5%", marginRight: "5%", marginTop: "1%"}
   : {backgroundColor:"AliceBlue", padding:"1%", height: "75vh"};

   const {emojiPath} = window.location.pathname;
   console.log(emojiPath);

  return (
    isLoading
    ? loadingMessage
    :<div style={containerStyle}>
        {emojiList.map((value, index) => {
            const style = {position: "absolute", left: `${value.location.x}%`, bottom: `${value.location.y}%`, textDecoration: "none"}; 
            return <a key={index} style={style} href={`/${decodeURIComponent(value.full_path)}`}>{value.emoji} </a>
        })}
    </div>
  );
}

export default EmojiArea;
