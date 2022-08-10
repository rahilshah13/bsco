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
import SearchBar from './components/search_bar';


function App() {

const [values, setValues] = useState({showPm: false, showCm: false, mode: 'search', 
isLoading: false, isComputer: window.innerWidth > 1000, modalMode: ""});

const [apiData, setApiData] = useState({clue: null, points: null, content: null});
const [ep, setEp] = useState(decodeURIComponent(window.location.href.split("/").slice(-1)[0]));

const showModal = (newMode) => {
  if (newMode === 'connect') 
    setValues({...values, showPm: true, modalMode: "connect"});
  else if (newMode === 'breate') 
    setValues({...values, showCm: true, modalMode: "breate"});
  console.log(values.mode);
};

const hideModal = () => {
  setValues({...values, showPm: false, showCm: false, modalMode:""});
};

const changeMode = (value) => {
  setValues({...values, mode: value});
}


// get data
useEffect(()=> {
  async function fetchData(emojiPath) {
    try {
      let res = await api_service.get(emojiPath, { 
        params: {parentPath: emojiPath.substring(0, emojiPath.length-2)}
      });
      setApiData({clue: res.data.clue, points: res.data.points, content: res.data.content});
      //console.log(res.data);

    } catch(e) {
      console.log(e);
    }
  }
  fetchData(decodeURIComponent(window.location.href.split("/").slice(-1)[0]));
}, [ep]);

//console.log(apiData.content);

return (
  <Router>
    <div style={{ "textAlign": "center" }}>
      <header style={{padding: "1%"}}>
        {
          apiData.clue
          ? <>
              <button className="titleChars" onClick={() => showModal("breate")}>{values.modalMode === "breate" ? "🅱️" : "b"}</button>
              <button className="titleChars" onClick={() => changeMode("search")}>{values.mode === "search" ? "🔎" : "s"}</button>
              <button className="titleChars" onClick={() => showModal("connect")}>{values.modalMode === "connect" ? "🔗" : "c"}</button>
              <button className="titleChars" onClick={() => changeMode("open")}>{values.mode === "open" ? "📖" : "o"}</button>
            </>
          : <span className="titleChars">endpoint doesn't exist</span>
        }
      </header>
      <Switch>
        <Route exact path="/:emojiPath?">
          {
          values.mode === 'open' 
            ? <Content isComp={values.isComputer} route={true} isLoading={values.isLoading} contentList={apiData.content !== null ? apiData.content: []} />
            : <EmojiArea isComp={values.isComputer} route={true} isLoading={values.isLoading} emojiList={apiData.points !== null ? apiData.points: []} />
          }

          <PointModal show={values.showPm} handleClose={hideModal} isComp={values.isComputer}>
            <p style={{ marginTop: "" }}>connect a point</p>
            <EmojiForm isComp={values.isComputer} clue={apiData.clue !== null ? apiData.clue[0].clue : "deeznuts"} />
          </PointModal>

          <CreateModal show={values.showCm} handleClose={hideModal} isComp={values.isComputer}>
            <p style={{ marginTop: "2.25vh", fontSize: "2.5vh"}}>bost bontent</p>
            <ContentForm isComp={values.isComputer} clue={apiData.clue !== null ? apiData.clue[0].clue : "deeznuts"} />
          </CreateModal>
        </Route>
      </Switch>
      <SearchBar ep={ep} setEp={setEp} />
    </div>
    </Router>
  );
}
export default App;
