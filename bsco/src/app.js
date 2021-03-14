import './styles/app.css';
import SearchBar from "./components/search_bar";
import Content from "./components/content";
import { useMediaQuery } from 'react-responsive';
import React, { Component } from 'react';
import Modal from './components/modal';
import EmojiForm from './components/create_form';

// const headerStyle = isDesktopOrLaptop ? {}: ;

const isComputer=true;
const headerStyle = isComputer
? {fontSize: "2vw", padding: "1%"} 
: {fontSize: "6vw", padding: "1%"};


class App extends Component{

constructor() {
  super();
  this.state = {show: false, mode: 'connect', matches: window.matchMedia("(min-width: 1224px)").matches};

  this.onChangeMode = this.onChangeMode.bind(this);
  this.showModal = this.showModal.bind(this);
  this.hideModal = this.hideModal.bind(this);
}

showModal = () => {
  this.setState({ show: true });
  this.setState({mode: "connect"});
  console.log(this.state.mode);
};

hideModal = () => {
  this.setState({ show: false });
};

onChangeMode = (newMode) => {
  this.setState({mode: newMode});
  console.log(this.state.mode);
};

// componentDidMount() {
//   // const isComputer = useMediaQuery({
//   //   query: '(min-device-width: 1224px)'
//   // });
//   const mql = window.matchMedia("(min-width: 1224px)");
//   mql.addEventListener("change", () => {
//     this.checkNative();
//   });
//   console.log(mql)
// }

render() {
    return (
      <div style={{"textAlign": "center"}}>
        <header style={headerStyle}>
          <button class="titleChars" onClick={()=>this.onChangeMode("breate")}>{this.state.mode === "breate" ? "🅱️" : "b"}</button>
          <button class="titleChars" onClick={()=>this.onChangeMode("search")}>{this.state.mode === "search" ? "🔎" : "s"}</button>
          <button class="titleChars" onClick={this.showModal}>{this.state.mode === "connect" ? "🔗" : "c"}</button>
          <button class="titleChars" onClick={()=>this.onChangeMode("open")}>{this.state.mode === "open" ? "📖": "o"}</button> 
        </header>
          <Content isComputer={window.innerWidth > 1000} route={true}/>

          <Modal show={this.state.show} handleClose={this.hideModal} isComputer={window.innerWidth > 1000}>
            <p style={{marginTop:""}}>connect a point</p>
            <EmojiForm isComputer={window.innerWidth > 1000}/>
          </Modal>
      </div>
    );
  }
}

export default App;
