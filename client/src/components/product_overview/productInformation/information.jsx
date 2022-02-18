import React from 'react';
import QuestionsAndAnswers from '../../questions_and_answers/q&a.jsx';
import Feature from './featureInformation.jsx';

const Information = (props) => {
  return (
    <div id='product-information'>
      <a href="#ratings-and-reviews">Read All Reviews</a><br />
      <div id='star-rating'>{props.starRating}</div>
      <div id='product-category'>{props.product.category}</div>
      <div id='product-name'>{props.product.name}</div>
      <div id='product-slogan'>{props.product.slogan}</div>
      <div id='product-description'>{props.product.description}</div>
      <Feature features={props.product.features}/>
      <div id='original-price'>{props.selectedStyle.original_price}</div>
      <div id='sale-price'>{props.selectedStyle.sale_price}</div>
    </div>
  );
};

export default Information;

// import React from 'react';
// import { Link } from 'react-router';

// class List extends React.Component {
//     render() {
//         return (
//             <div>
//                 <p>Please choose a repository from the list below.</p>
//                 <ul>
//                     <li><Link to="/react">React</Link></li>
//                 </ul>
//             </div>
//         );
//     }
// }

// export default List;