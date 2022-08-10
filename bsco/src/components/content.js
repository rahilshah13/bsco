import '../styles/app.css';

const loadingMessage = <span style={{position: "absolute", fontSize: "30vh", top: "27%", left: "43%",textAlign:"center"}}>⌛</span>;
const noContentStyle = {opacity: "0.5"};

function Content({isComputer, isLoading, contentList, match}) {
   const containerStyle = isComputer 
   ? { padding:".5%", height: "77vh", marginLeft: "20%", marginRight: "20%", overflowY: "auto"}
   : { padding:".5%", height: "77vh", marginLeft: "10%", marginRight: "10%", overflowY: "auto"};


  return (
    isLoading
    ? loadingMessage
    :<div style={containerStyle}>
        {
        contentList.length !== 0
	? contentList.map((value, index) => {
          const contentContainer = isComputer
          ? {marginBottom: "5vh", left: "33%", right: "33%", fontSize: "3vh"}
          : {marginBottom: "2vh", left: "33%", right: "33%", fontSize: "3vh"};

          const style = {textDecoration: "none", backgroundColor: "green"};
          return (
            <div style={contentContainer}>
              <a key={value.id} style={style} href={value.url} target="_blank">
                <p style={{color: "#000000"}}>{value.content}</p>
              </a>
            </div>
          )})
	:<span style={noContentStyle}>no content posted yet</span>
        }
    </div>
  );
}

export default Content;
