import '../styles/app.css';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';

const loadingMessage = <span style={{position: "absolute", fontSize: "30vh", top: "27%", left: "43%",textAlign:"center"}}>⌛</span>;

function EmojiArea({isComputer, isLoading, emojiList, match}) {
   const containerStyle = isComputer 
   ? {backgroundColor:"AliceBlue", padding:"1%", height: "75vh", marginLeft: "5%", marginRight: "5%", marginTop: "1%"}
   : {backgroundColor:"AliceBlue", padding:"1%", height: "75vh"};

   const linkContainer = isComputer
   ? {position:"absolute", bottom: "30%", left: "15%"}
   : {position:"absolute", bottom: "30%", left: "25%"};

   const {emojiPath} = window.location.pathname;
   console.log(emojiPath);
   console.log(emojiList);


  return (
    isLoading
    ? loadingMessage
    :<div style={containerStyle}>
        {emojiList.map((value, index) => {
            let [x, y] = [value.location.x, value.location.y];
            const style = {position: "absolute", left: `${x}%`, bottom: `${y}%`}; 
            console.log(x, y)
            //console.log(emojiPath+emojiList[index].emoji);
            return <Link to={`/${decodeURIComponent(value.full_path)}`} style={style} key={index} > 
                         {value.emoji} 
                    </Link>
        })}
    </div>
  );
}

export default EmojiArea;
