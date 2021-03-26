import '../styles/app.css';
import { useParams } from 'react-router-dom';
import { useDebugValue } from 'react';


const loadingMessage = <span style={{position: "absolute", fontSize: "30vh", top: "27%", left: "43%",textAlign:"center"}}>⌛</span>;

function Content({isComputer, isLoading, haikus, match}) {
   const containerStyle = isComputer 
   ? { padding:"1%", height: "75vh"}
   : { padding:"1%", height: "75vh"};

   const haikuContainer = isComputer
   ? {position:"absolute", bottom: "30%", left: "15%"}
   : {position:"absolute", bottom: "30%", left: "25%"};

  const {emojiPath} = useParams();

  return (
    isLoading
    ? loadingMessage
    :<div style={containerStyle}>
        { 
        haikus.map((value, index) => {
          const style = {left:"50%", right:"45%"};
          return <a key={value.id} style={style} href={value.url}>
            {value.content}
          </a> 
        })
        }
    </div>
  );
}

export default Content;
