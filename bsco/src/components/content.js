import '../styles/app.css';

const loadingMessage = <span style={{position: "absolute", fontSize: "30vh", top: "27%", left: "43%",textAlign:"center"}}>⌛</span>;

function Content({isComputer, isLoading, contentList, match}) {
   const containerStyle = isComputer 
   ? { padding:"1%", height: "75vh", marginLeft: "20%", marginRight: "20%"}
   : { padding:"1%", height: "75vh", marginLeft: "10%", marginRight: "10%"};


  return (
    isLoading
    ? loadingMessage
    :<div style={containerStyle}>
        { 
        contentList.map((value, index) => {
          const contentContainer = isComputer
          ? {marginBottom: "5vh", left: "33%", right: "33%", fontSize: "3vh"}
          : {marginBottom: "2vh", left: "33%", right: "33%", fontSize: "3vh"};

          const style = {textDecoration: "none", backgroundColor: "green"};
          return (
            <div style={contentContainer}>
              <a key={value.id} style={style} href={value.url}>
                <p style={{color: "#000000"}}>{value.content}</p>
              </a> 
            </div>
        )})
        }
    </div>
  );
}

export default Content;
