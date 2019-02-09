import React, { Component } from 'react';
import './App.css';
import Staff from './Staff.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { staffs: [
      { isChecked: true,
        id: 1,
        name: "Kevin Anthony Sison",
        teams: ["Board of Directors"],
        tags: ["Flexi-time"]
      }
    ] };
  }

  handleClick(staff, value, id2) {
    id2 = parseInt(id2, 10);
    console.log(staff);
    console.log(id2, value);
    console.log(typeof id2);
    this.setState((state, props) => (
      console.log(props)
    ))

    // this.setState({staffs: [
    //   { isChecked: false,
    //     id: 1,
    //     name: "Kevin Anthony Sison",
    //     teams: ["Board of Directors"],
    //     tags: ["Flexi-time"]
    //   }
    // ]});
  }

  render() {
    return (
      <div className="App">
        <Staff staffs = {this.state.staffs} onClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
