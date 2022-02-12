import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }



  render() {
    return (
      <div>

        <div>
          Q: {this.props.question.question_body}
          Helpful?
          <button> Yes </button> | <button> Add Anaswer </button>
        </div>

        <div>
          A: Some anser needs to be rendered
          <br></br>
          by 'user_name', date | Helpful?
          <button> Yes </button> | <button> Report </button>
        </div>

      </div>
    );
  }
}

export default Question;