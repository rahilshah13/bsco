import './styles/app.css';
import Content from "./components/content";
import React, { useState, useEffect } from 'react';
import PointModal from './components/pointModal';
import CreateModal from './components/createModal';
import EmojiForm from './components/emoji_form';
import ContentForm from './components/content_form';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import api_service from './services/api_service';


function App() {

const [values, setValues] = useState({showPm: false, showCm: false, mode: 'connect', emojiList: [], 
emojiPath: "/", isLoading: false, isComputer: window.innerWidth > 1000});

const showModal = (newMode) => {
  if (newMode === 'connect') 
    setValues({...values, showPm: true, mode: "connect"});
  else if (newMode === 'breate') 
    setValues({...values, showCm: true, mode: "breate"});
  console.log(values.mode);
};

const hideModal = () => {
  setValues({...values, showPm: false, showCm: false});
};

const changeMode = (value) => {
  setValues({...values, mode: value});
}   

const headerStyle = values.isComputer
? {fontSize: "2vw", padding: "1%"} 
: {fontSize: "6vw", padding: "1%"};


// get data
useEffect(()=> {
  async function fetchData(emojiPath) {
    try {
      let data = await api_service.get(emojiPath, { 
        params: {parentPath: emojiPath.substring(0, emojiPath.length-2)}
      });
      console.log(data);
    } catch(e) {
      console.log(emojiPath);
    }
  }
  fetchData(decodeURIComponent(window.location.href.split("/").slice(-1)[0]));
}, []);

return (
  <Router>
    <div style={{ "textAlign": "center" }}>
      <header style={headerStyle}>
        <button className="titleChars" onClick={() => showModal("breate")}>{values.mode === "breate" ? "🅱️" : "b"}</button>
        <button className="titleChars" onClick={() => changeMode("search")}>{values.mode === "search" ? "🔎" : "s"}</button>
        <button className="titleChars" onClick={() => showModal("connect")}>{values.mode === "connect" ? "🔗" : "c"}</button>
        <button className="titleChars" onClick={() => changeMode("open")}>{values.mode === "open" ? "📖" : "o"}</button>
      </header>
      <Switch>
        <Route exact path="/:emojiPath?">
          {4 === 2+2
            ? <Content isComputer={values.isComputer} route={true} isLoading={values.isLoading} emojiList={values.emojiList} />
            : <Content isComputer={values.isComputer} route={true} isLoading={values.isLoading} emojiList={values.emojiList} />
          }

          <PointModal show={values.showPm} handleClose={hideModal} isComputer={values.isComputer}>
            <p style={{ marginTop: "" }}>connect a point</p>
            <EmojiForm isComputer={values.isComputer} />
          </PointModal>

          <CreateModal show={values.showCm} handleClose={hideModal} isComputer={values.isComputer}>
            <p style={{ marginTop: "" }}>breate</p>
            <ContentForm isComputer={values.isComputer} clue={"big chungus is very big"} />
          </CreateModal>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}
export default App;
