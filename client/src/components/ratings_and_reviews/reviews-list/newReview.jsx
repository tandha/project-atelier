import React from 'react';
import axios from 'axios';

const NewReview = (props) => {

  const onUpload = (event) => {
    event.preventDefault();
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onClose = () => {
    event.preventDefault();
    props.hideModal();
  };

  let chars = Object.keys(props.chars);

  return (
    <div id='new-review-modal'>
      <div id='new-review-content'>
        <span id='new-review-heading'>Write Your Review</span><br></br>
        <span>about the {props.product.name}</span><br></br>
        <br></br>

        <form>
          <div>
            <input type='radio' id='1star' name='star-rating'></input>
            <label> 1 star - "Poor"</label>
            <br></br>
            <input type='radio' id='2star' name='star-rating'></input>
            <label> 2 star - "Fair"</label>
            <br></br>
            <input type='radio' id='3star' name='star-rating'></input>
            <label> 3 star - "Average"</label>
            <br></br>
            <input type='radio' id='4star' name='star-rating'></input>
            <label> 4 star - "Good"</label>
            <br></br>
            <input type='radio' id='5star' name='star-rating'></input>
            <label> 5 star - "Great"</label>
            <br></br>
          </div>

          <p>Do you recommend this product?</p>
          <input type='radio' id='recommended' name='recommend'></input>
          <label>Yes</label>
          <input type='radio' id='not-recommended' name='recommend'></input>
          <label>No</label>
          <br></br><br></br>

          {
            chars.map((char, index) => {
              return (
                <div key={index}>
                  <span>{char}</span><br></br>
                  <input type='radio' id={`${char}1`} name={char}></input>
                  <input type='radio' id={`${char}2`} name={char}></input>
                  <input type='radio' id={`${char}3`} name={char}></input>
                  <input type='radio' id={`${char}4`} name={char}></input>
                  <input type='radio' id={`${char}5`} name={char}></input>
                  <br></br>
                  &nbsp;<label>1</label>
                  &nbsp;&nbsp;<label>2</label>
                  &nbsp;&nbsp;<label>3</label>
                  &nbsp;&nbsp;<label>4</label>
                  &nbsp;&nbsp;<label>5</label>
                  <br></br><br></br>
                </div>
              );
            })
          }

          <label>Review summary</label>
          <input type='text' id='summary' required maxlength='60' size='60' placeholder='Example: Best purchase ever!'></input>
          <br></br><br></br>

          <label>Review body</label>
          <textarea id='body' rows='10' cols='51' placeholder='Why did you like the product or not?'></textarea>
          <br></br><br></br>

          <label>Nickname</label>
          <input type='text' id='nickname' required maxlength='60' size='60' placeholder='Example: jackson11!'></input>
          <br></br><br></br>

          <label>Email</label>
          <br></br>
          <input type='text' id='email' required maxlength='60' size='60' placeholder='Example: jackson11@email.com'></input>
          <br></br>
          <label id='note'>For authentication reasons, you will not be emailed</label>
          <br></br><br></br>

          <button onClick={onSubmit}>Submit</button>
          <button onClick={onClose}>Close</button>

        </form>
      </div>
    </div>
  );
};

export default NewReview;