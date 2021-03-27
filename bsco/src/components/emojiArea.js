import '../styles/app.css';


const loadingMessage = <span style={{position: "absolute", fontSize: "30vh", top: "27%", left: "43%",textAlign:"center"}}>⌛</span>;
const colors = ["#fff599", "white", "#d6fbff", "#ffd6f1", "#dcd6ff", "#d6ffdb", "#dedede"];
const cn = Math.floor(Math.random() * 7); 


function EmojiArea({isComp, isLoading, emojiList, match}) {
    
  const containerStyle = {backgroundColor: colors[cn], padding:"1%", height: "75vh", marginLeft: "5%", marginRight: "5%", marginTop: isComp ? "1%" : "2%"};
  const {emojiPath} = window.location.pathname;

  console.log(emojiPath);
  //TODO: first haiku getting lost

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
