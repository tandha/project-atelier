import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySearchQuestions: props.displayQuestions
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.target.value.length > 2) {
      this.setState({
        displaySearchQuestions: []
      });
    }
  }

  render() {
    return (
      <div style={myStyles}>
        <input size="100" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." onChange={()=>this.handleChange()}></input>
      </div>
    );
  }
}

export default SearchBar;

var myStyles = {
  height: '50px',
  display: 'inline - grid',
  width: '90%'
};