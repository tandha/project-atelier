import React, { useState } from 'react';
import axios from 'axios';
import { IoIosStar} from 'react-icons/io';
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
        'product_id': props.product.id,
        'rating': star,
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

  const stars = [0, 1, 2, 3, 4];
  const ratings = [
    '1 star - "Poor"', '2 stars - "Fair"', '3 stars - "Average"',
    '4 stars - "Good"', '5 stars - "Great"'
  ];
  const [star, setStar] = useState(0);

  const renderStars = (star) => {

    let percentage = Math.round((star / 5) * 100);

    return (
      <React.Fragment>
        <div className='star-rating-container' id='new-review-stars'>
          <div id='star-block-1' onClick={() => setStar(1)}/>
          <div id='star-block-2' onClick={() => setStar(2)}/>
          <div id='star-block-3' onClick={() => setStar(3)}/>
          <div id='star-block-4' onClick={() => setStar(4)}/>
          <div id='star-block-5' onClick={() => setStar(5)}/>
          {
            stars.map((index) => {
              return <IoIosStar className='star-rating-star' key={index} />;
            })
          }
          <div className='star-rating-overlay' style={{width: `${100 - percentage}%`}} />
        </div>
        {star === 0 ? <div id='new-review-star-text'></div> : <div id='new-review-star-text'>{ratings[star - 1]}</div>}
      </React.Fragment>
    );
  };

  let initialChars = {};
  chars.forEach(char => initialChars[char] = 'None selected');

  const [selectedChars, setChars] = useState(initialChars);

  const updateChars = (char, num) => {
    let newChars = Object.assign({}, selectedChars);
    newChars[char] = charsScale[char][num - 1];
    setChars(newChars);
  };

  const renderChars = (selectChars) => {
    return (
      <React.Fragment>
        {
          chars.map((char, index) => {
            return (
              <div className='new-review-chars-container' key={index}>
                <span><strong>{char}:</strong>&nbsp;&nbsp;{selectChars[char]}</span>

                <div className='new-review-char-radios'>
                  <input onClick={updateChars.bind(this, char, 1)} type='radio' className='new-review-chars'
                    id={`new-review-${char}1`} name={char} value='1' required></input>

                  <input onClick={updateChars.bind(this, char, 2)} type='radio' className='new-review-chars'
                    id={`new-review-${char}2`} name={char} value='2' required></input>

                  <input onClick={updateChars.bind(this, char, 3)} type='radio' className='new-review-chars'
                    id={`new-review-${char}3`} name={char} value='3' required></input>

                  <input onClick={updateChars.bind(this, char, 4)} type='radio' className='new-review-chars'
                    id={`new-review-${char}4`} name={char} value='4' required></input>

                  <input onClick={updateChars.bind(this, char, 5)} type='radio' className='new-review-chars'
                    id={`new-review-${char}5`} name={char} value='5' required></input>
                </div>

                <div className='new-review-char-nums'>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>

                <div className='new-review-char-meanings'>
                  <span>{charsScale[char][0]}</span>
                  <span>{charsScale[char][4]}</span>
                </div>

                <br></br>
              </div>
            );
          })
        }
      </React.Fragment>
    );

  };

  let charsScale = {
    Size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Quality', 'Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
  };

  const renderTextArea = () => {
    const [characterCount, setCharacterCount] = useState(0);
    return (
      <React.Fragment>
        <textarea onChange={(e) => setCharacterCount(e.target.value.length)}
          id='new-review-body' name='body' rows='5'
          cols='51' minLength='50' maxLength='1000' required
          placeholder='Why did you like the product or not?'>
        </textarea>
        <br></br>
        {characterCount >= 50
          ? <span>Minimum reached</span>
          : <span>Minimum required characters left: {50 - characterCount}</span>
        }
      </React.Fragment>
    );
  };


  return (
    <div id='new-review-modal'>
      <div id='new-review-content'>

        <span id='new-review-heading'>Write Your Review</span><br></br>
        <span>&nbsp;about the {props.product.name}</span><br></br>
        <br></br>

        <form onSubmit={onSubmit}>

          <label><strong>Overall rating</strong></label><br></br>
          {renderStars(star)}

          <p><strong>Do you recommend this product?</strong></p>

          <input type='radio' value='true' name='recommend'
            id='new-review-recommended' required></input>
          <label>Yes</label>

          &nbsp;&nbsp;

          <input type='radio' value='false' name='recommend'
            id='new-review-not-recommended' required></input>
          <label>No</label>

          <br></br><br></br>

          {renderChars(selectedChars)}

          <label><strong>Review summary</strong></label>

          <input type='text' id='new-review-summary' name='summary' required
            maxLength='60' size='60' placeholder='Example: Best purchase ever!'></input>
          <br></br><br></br>

          <label><strong>Review body</strong></label>

          {renderTextArea()}

          <br></br><br></br>

          <label><strong>Upload your photos</strong></label><br></br>
          <input id='new-review-photos' type='file' accept='image/*' multiple onChange={(e) => onUpload(e)}></input>
          <div id='new-review-photos-preview'></div>
          <br></br><br></br>

          <label><strong>Nickname</strong></label>

          <input type='text' name='nickname' id='new-review-nickname' required
            maxLength='60' size='60' placeholder='Example: jackson11!'></input>
          <br></br><br></br>

          <label><strong>Email</strong></label>
          <br></br>

          <input type='email' name='email' id='new-review-email' required
            maxLength='60' size='60' placeholder='Example: jackson11@email.com'></input>
          <br></br>

          <label id='new-review-note'>
            For authentication reasons, you will not be emailed
          </label>
          <br></br><br></br>
          <div id='new-review-buttons'>
            <button className='review-button'>Submit</button>
            <button className='review-button' onClick={onClose}>Close</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default NewReview;