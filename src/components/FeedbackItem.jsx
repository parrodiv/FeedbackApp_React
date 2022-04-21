import { FaTimes, FaEdit } from 'react-icons/fa';  //FaTimes è una x e il path react-icons/fa porta a font awesome
import PropTypes from 'prop-types';
import Card from './shared/Card';
import {useContext} from 'react'
import  FeedbackContext  from '../context/FeedbackContext';

function FeedbackItem({ item }) {
  const {deleteFeedback, editFeedback} = useContext(FeedbackContext)

  return (
    // possiamo passare una prop per impostare una condizione sullo stile: conditional class or conditional style, usiamo reverse che passo nel Card.jsx
    // il reverse false lo potremmo cancellare dato che l'abbiamo inserito come props default in Card.jsx
    <Card reverse={false}>
      <div className="num-display">{item.rating}</div>
      {/* andiamo a prendere la prop handleDelete da FeedbackList che a sua volta gli viene passato da App.js e al parametro gli passiamo quello che ci serve. handleDelete contiene la funzione deleteFeedback  */}
      <button onClick={() => deleteFeedback(item.id)} className="close">
        <FaTimes color="purple" />
      </button>
      <button className="edit">
        <FaEdit onClick={() => editFeedback(item)} color="purple"/>
        {/*passo come parametro l'item contenente id, text e rating del item su cui ho cliccato */}
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  );
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default FeedbackItem;
