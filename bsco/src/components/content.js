import '../styles/app.css';
const haiku_formatter = require('haiku-detect');

const loadingMessage = <span style={{position: "absolute", fontSize: "30vh", top: "27%", left: "43%",textAlign:"center"}}>⌛</span>;
const colors = ["#fff599", "white", "#d6fbff", "#ffd6f1", "#dcd6ff", "#d6ffdb", "#dedede"];

function Content({isComputer, isLoading, haikus, match}) {
   const containerStyle = isComputer 
   ? { padding:"1%", height: "75vh"}
   : { padding:"1%", height: "75vh"};

  const haikuLines = {marginBottom: "1%"};


  return (
    isLoading
    ? loadingMessage
    :<div style={containerStyle}>
        { 
        haikus.map((value, index) => {
          const haikuContainer = isComputer
          ? {backgroundColor: colors[index%7], marginBottom: "5vh", left: "33%", right: "33%", fontSize: "3vh"}
          : {backgroundColor: colors[index%7], marginBottom: "2vh", fontSize: "3vh"};

          const style = {textDecoration: "none", backgroundColor: "green"};
          const hl = haiku_formatter.format(value.content);
          return (
            <div style={haikuContainer}>
              <a key={value.id} style={style} href={value.url}>
                <p style={haikuLines}>{hl[0]}</p>
                <p style={haikuLines}>{hl[1]}</p>
                <p style={haikuLines}>{hl[2]}</p>
              </a> 
            </div>
        )})
        }
    </div>
  );
}

export default Content;
