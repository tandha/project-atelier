import React from 'react';
import axios from 'axios';
import { IMG_KEY } from '../../../../../server/config.js';

const NewReview = (props) => {

  const onUpload = (event) => {
    event.preventDefault();

    const container = document.querySelector('#new-review-photos-preview');
    const file = event.target.files[0];
    const reader = new FileReader();
    const img = new Image();

    reader.onload = (event) => {
      const body = event.target.result.split(',')[1];
      const bodyFormData = new FormData();
      bodyFormData.append('image', body);

      axios({
        headers: { 'content-type': 'multipart/form-data' },
        method: 'post',
        url: `https://api.imgbb.com/1/upload?key=${IMG_KEY}`,
        data: bodyFormData
      }).then((res) => {
        img.src = res.data.data.url;
      }).catch((err)=> {
        console.log('err getting img url', err);
      });
    };

    img.className = 'new-review-photo';
    img.height = 100;
    container.appendChild(img);

    if (file) {
      reader.readAsDataURL(file);
    }
    if (container.childElementCount >= 4) {
      document.querySelector('#new-review-photos').style.visibility = 'hidden';
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    let starRating = document.querySelector('input[name="star-rating"]:checked').value;
    let recommended = document.querySelector('input[name="recommend"]:checked').value;
    let summary = document.querySelector('input[name="summary"]').value;
    let body = document.querySelector('textarea[name="body"]').value;
    let nickname = document.querySelector('input[name="nickname"]').value;
    let email = document.querySelector('input[name="email"]').value;

    let images = document.querySelectorAll('#new-review-photos-preview');
    images = images[0].childNodes;
    let imageURLs = [];
    images.forEach(image => imageURLs.push(image.getAttribute('src')));

    recommended === 'true' ? recommended = true : recommended = false;

    let reviewChars = {};
    chars.forEach(char => {
      let rating = document.querySelector(`input[name=${char}]:checked`).value;
      reviewChars[props.chars[char].id] = parseInt(rating);
    });

    axios({
      method: 'post',
      url: '/reviews',
      data: {
        'product_id': 64620, //change this
        'rating': parseInt(starRating),
        'summary': summary,
        'body': body,
        'recommend': recommended,
        'name': nickname,
        'email': email,
        'photos': imageURLs,
        'characteristics': reviewChars
      }
    }).then((response) => {
      props.hideModal();
      props.getReviews();
    })
      .catch(err => console.log(err));
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

        <form onSubmit={onSubmit}>

          <input type='radio' id='new-review-1star'
            name='star-rating' value='1' required></input>

          <label> 1 star - "Poor"</label>
          <br></br>

          <input type='radio' id='new-review-2star'
            name='star-rating' value='2' required></input>

          <label> 2 star - "Fair"</label>
          <br></br>

          <input type='radio' id='new-review-3star'
            name='star-rating' value='3' required></input>

          <label> 3 star - "Average"</label>
          <br></br>

          <input type='radio' id='new-review-4star'
            name='star-rating' value='4' required></input>

          <label> 4 star - "Good"</label>
          <br></br>

          <input type='radio' id='new-review-5star'
            name='star-rating' value='5' required></input>

          <label> 5 star - "Great"</label>
          <br></br>

          <p>Do you recommend this product?</p>

          <input type='radio' value='true' name='recommend'
            id='new-review-recommended' required></input>

          <label>Yes</label>

          <input type='radio' value='false' name='recommend'
            id='new-review-not-recommended' required></input>

          <label>No</label>
          <br></br><br></br>

          {
            chars.map((char, index) => {
              return (
                <div key={index}>
                  <span>{char}</span><br></br>

                  <input type='radio' className='new-review-chars'
                    id={`new-review-${char}1`} name={char} value='1' required></input>

                  <input type='radio' className='new-review-chars'
                    id={`new-review-${char}2`} name={char} value='2' required></input>

                  <input type='radio' className='new-review-chars'
                    id={`new-review-${char}3`} name={char} value='3' required></input>

                  <input type='radio' className='new-review-chars'
                    id={`new-review-${char}4`} name={char} value='4' required></input>

                  <input type='radio' className='new-review-chars'
                    id={`new-review-${char}5`} name={char} value='5' required></input>

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

          <input type='text' id='new-review-summary' name='summary' required
            maxLength='60' size='60' placeholder='Example: Best purchase ever!'></input>
          <br></br><br></br>

          <label>Review body</label>

          <textarea id='new-review-body' name='body' rows='10'
            cols='51' minLength='51' maxLength='1000' required
            placeholder='Why did you like the product or not?'></textarea>
          <br></br><br></br>

          <label>Upload your photos</label><br></br>
          <input id='new-review-photos' type='file' accept='image/*' multiple onChange={(e) => onUpload(e)}></input>
          <div id='new-review-photos-preview'></div>
          <br></br><br></br>

          <label>Nickname</label>

          <input type='text' name='nickname' id='new-review-nickname' required
            maxLength='60' size='60' placeholder='Example: jackson11!'></input>
          <br></br><br></br>

          <label>Email</label>
          <br></br>

          <input type='email' name='email' id='new-review-email' required
            maxLength='60' size='60' placeholder='Example: jackson11@email.com'></input>
          <br></br>

          <label id='new-review-note'>
            For authentication reasons, you will not be emailed
          </label>
          <br></br><br></br>
          <div id='new-review-buttons'>
            <button>Submit</button>
            <button onClick={onClose}>Close</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default NewReview;