import './styles/app.css';
import SearchBar from "./components/search_bar";
import Content from "./components/content";
import { useMediaQuery } from 'react-responsive';
import React, { Component } from 'react';
import Modal from './components/modal';
import EmojiForm from './components/create_form';

// const headerStyle = isDesktopOrLaptop ? {}: ;
// const isComputer = useMediaQuery({
//   query: '(min-device-width: 1224px)'
// });
const isComputer=true;
const headerStyle = isComputer
? {fontSize: "2vw", padding: "1%"} 
: {fontSize: "6vw", padding: "1%"};


class App extends Component{

constructor() {
  super();
  this.state = {show: false};
  this.showModal = this.showModal.bind(this);
  this.hideModal = this.hideModal.bind(this);
}

showModal = () => {
  this.setState({ show: true });
};

hideModal = () => {
  this.setState({ show: false });
};

render() {
    return (
      <div style={{"textAlign": "center"}}>
        <header style={headerStyle}>
          <button class="titleChars">🅱️</button>
          <button class="titleChars">s</button>
          <button class="titleChars" onClick={this.showModal}>c</button>
          <button class="titleO">⊕</button> 
        </header>
          <Modal show={this.state.show} handleClose={this.hideModal}>
            <p style={{marginTop:""}}>connect a point</p>
            <EmojiForm />
          </Modal>
          <Content isComputer={isComputer} />
      </div>
    );
  }
}

export default App;
