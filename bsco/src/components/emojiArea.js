import '../styles/app.css';


const loadingMessage = <span style={{position: "absolute", fontSize: "30vh", top: "27%", left: "43%",textAlign:"center"}}>⌛</span>;
const colors = ["#fff599", "#d6fbff", "#ffd6f1", "#dcd6ff", "#d6ffdb", "#dedede"];
const cn = Math.floor(Math.random() * 6); 


function EmojiArea({isComp, isLoading, emojiList, match}) {
    
  const containerStyle = {backgroundColor: colors[cn], height: "77vh", marginLeft: "10%", 
                          marginTop: "2%", width: "80%"};

  return (
    isLoading
    ? loadingMessage
    :<div style={containerStyle}>
        {emojiList.map((value, index) => {
            const style = {position: "absolute", left: `${parseInt(value.location.x)*.787+10.2}%`, 
            bottom: `${parseInt(value.location.y)*.74+9}%`, textDecoration: "none"}; 

            return <a key={value.full_path} style={style} href={`/${decodeURIComponent(value.full_path)}`}>{value.emoji} </a>
        })}
    </div>
  );
}

export default EmojiArea;
