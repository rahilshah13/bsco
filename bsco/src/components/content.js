import '../styles/app.css';



function Content({isComputer}) {
   const containerStyle = isComputer 
   ? {backgroundColor:"burlywood", padding:"1%", height: "75vh"}
   : {backgroundColor:"burlywood", padding:"1%", height: "75vh"};

   const linkContainer = isComputer
   ? {position:"absolute", bottom: "30%", left: "15%"}
   : {position:"absolute", bottom: "30%", left: "25%"};

  return (
    <div style={containerStyle}>
        <a style={linkContainer} href="https://www.youtube.com/embed/tgbNymZ7vqY">epic video</a>
    </div>
  );
}

export default Content;
