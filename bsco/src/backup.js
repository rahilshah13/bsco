import './styles/app.css';
import Content from "./components/content";
import React, { Component, useEffect } from 'react';
import PointModal from './components/pointModal';
import CreateModal from './components/createModal';
import EmojiForm from './components/emoji_form';
import ContentForm from './components/content_form';
import { BrowserRouter as Router, Route, Switch, useParams} from 'react-router-dom';
import api_service from './services/api_service';
import axios from 'axios';

const isComputer=true;
const headerStyle = isComputer
? {fontSize: "2vw", padding: "1%"} 
: {fontSize: "6vw", padding: "1%"};

class App extends Component{

constructor() {
  super();
  this.state = {showPm: false, showCm: false, mode: 'connect', matches: window.matchMedia("(min-width: 1224px)").matches, 
                emojiList: [], emojiPath: "/", isLoading: false};

  // this.onChangeMode = this.onChangeMode.bind(this);
  // this.showModal = this.showModal.bind(this);
  // this.hideModal = this.hideModal.bind(this);
}
/////////////////////////////

/////////////////////////
showModal = (newMode) => {
  if (newMode === 'connect') {
    this.setState({ showPm: true });
    this.setState({mode: "connect"});
  }

  if (newMode === 'breate') {
    this.setState({ showCm: true });
    this.setState({mode: "breate"});
  }

  console.log(this.state.mode);
};

hideModal = () => {
  this.setState({ showPm: false });
  this.setState({ showCm: false });
};

onChangeMode = (newMode) => {
  this.setState({mode: newMode});
  console.log(this.state.mode);
};


render() {

  return (
    <Router>
      <div style={{"textAlign": "center"}}>
        <header style={headerStyle}>
          <button className="titleChars" onClick={()=>this.showModal("breate")}>{this.state.mode === "breate" ? "🅱️" : "b"}</button>
          <button className="titleChars" onClick={()=>this.onChangeMode("search")}>{this.state.mode === "search" ? "🔎" : "s"}</button>
          <button className="titleChars" onClick={()=>this.showModal("connect")}>{this.state.mode === "connect" ? "🔗" : "c"}</button>
          <button className="titleChars" onClick={()=>this.onChangeMode("open")}>{this.state.mode === "open" ? "📖": "o"}</button> 
        </header>
          <Switch>
            <Route exact path="/:emojiPath?">
              { true===true
                ? <Content isComputer={window.innerWidth > 1000} route={true} isLoading={this.isLoading} emojiList={this.emojiList}/>
                : <Content isComputer={window.innerWidth > 1000} route={true} isLoading={this.isLoading} emojiList={this.emojiList}/>
              }

              <PointModal show={this.state.showPm} handleClose={this.hideModal} isComputer={window.innerWidth > 1000}>
                <p style={{marginTop:""}}>connect a point</p>
                <EmojiForm isComputer={window.innerWidth > 1000}/>
              </PointModal>

              <CreateModal show={this.state.showCm} handleClose={this.hideModal} isComputer={window.innerWidth > 1000}>
                <p style={{marginTop:""}}>breate</p>
                <ContentForm isComputer={window.innerWidth > 1000} clue={"big chungus is very big"}/>
              </CreateModal>

            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
