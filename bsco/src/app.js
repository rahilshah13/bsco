import './styles/app.css';
import Content from "./components/content";
import React, { useState, useEffect } from 'react';
import PointModal from './components/pointModal';
import CreateModal from './components/createModal';
import EmojiForm from './components/emoji_form';
import ContentForm from './components/content_form';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import api_service from './services/api_service';
import EmojiArea from './components/emojiArea';


function App() {

const [values, setValues] = useState({showPm: false, showCm: false, mode: 'connect', 
emojiPath: "/", isLoading: false, isComputer: window.innerWidth > 1000});

const [apiData, setApiData] = useState({clue: null, points: null, content: null});

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
      let res = await api_service.get(emojiPath, { 
        params: {parentPath: emojiPath.substring(0, emojiPath.length-2)}
      });
      setApiData({clue: res.data.clue, points: res.data.points, content: res.data.content});
      console.log(res.data);

    } catch(e) {
      console.log(values.emojiPath);
    }
  }
  fetchData(decodeURIComponent(window.location.href.split("/").slice(-1)[0]));
}, []);

console.log(apiData.points);

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
          {
          values.mode === 'open' || values.mode === 'breate'
            ? <Content isComputer={values.isComputer} route={true} isLoading={values.isLoading} emojiList={apiData.points !== null ? apiData.content: []} />
            : <EmojiArea isComputer={values.isComputer} route={true} isLoading={values.isLoading} emojiList={apiData.points !== null ? apiData.points: []} />
          }

          <PointModal show={values.showPm} handleClose={hideModal} isComputer={values.isComputer}>
            <p style={{ marginTop: "" }}>connect a point</p>
            <EmojiForm isComputer={values.isComputer} />
          </PointModal>

          <CreateModal show={values.showCm} handleClose={hideModal} isComputer={values.isComputer}>
            <p style={{ marginTop: "" }}>breate</p>
            <ContentForm isComputer={values.isComputer} clue={apiData.clue !== null ? apiData.clue[0].clue : "deeznuts"} />
          </CreateModal>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}
export default App;
