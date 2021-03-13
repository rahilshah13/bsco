import '../styles/app.css';

function SearchBar({isComputer}) {

    const containerStyle = isComputer 
    ? {paddingTop: "1vw"}
    : {paddingTop: "4vw"};


    const searchBarStyle = isComputer 
    ? {borderColor: "none", border: "none", outline:"none", fontSize: "4vw", 
    boxShadow:"none", textAlign: "center", maxWidth:"33%", marginLeft:"33%", marginRight:"33%", size:"15"}

    : {borderColor: "none", border: "none", outline:"none", fontSize: "8vw", 
    boxShadow:"none", textAlign: "center", maxWidth:"33%", marginLeft:"33%", marginRight:"33%"};


    return (
        <div style={containerStyle}>
            <form>
                <input type="text" style={searchBarStyle} placeholder="origin" />
            </form>
        </div>    
    );
}

export default SearchBar;
