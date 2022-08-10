import { useHistory } from 'react-router-dom';
import { useState } from "react";
import { EMOJI_SET } from './emojiSet';

function SearchBar({ep, setEp}) {

  let history = useHistory();
  let path = history.location.pathname.slice(1);
   
  return( 
    <div style={{marginTop: "1%"}}>
      <input style={{border: "0", outline: "0", borderBottom: "2px solid"}} 
        type="search"
        autoFocus
        value={ep}
        onChange={(e) => {
          if(EMOJI_SET.has(e.target.value.slice(path.length)) || e.target.value.length < path.length) {
            history.push(e.target.value);
            setEp(e.target.value);
          }
        }}
      />
  </div>);
}

export default SearchBar;
