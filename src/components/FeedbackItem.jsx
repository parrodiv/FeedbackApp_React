import { FaTimes } from 'react-icons/fa';  //FaTimes è una x e il path react-icons/fa porta a font awesome
import PropTypes from 'prop-types';
import Card from './shared/Card';

function FeedbackItem({ item, handleDelete }) {

  return (
    // possiamo passare una prop per impostare una condizione sullo stile: conditional class or conditional style, usiamo reverse che passo nel Card.jsx
    // il reverse false lo potremmo cancellare dato che l'abbiamo inserito come default in Card.jsx
    <Card reverse={false}>
      <div className="num-display">{item.rating}</div>
      {/* andiamo a prendere la prop handleDelete da FeedbackList che a sua volta gli viene passato da App.js e al parametro gli passiamo quello che ci serve. handleDelete contiene la funzione deleteFeedback  */}
      <button onClick={() => handleDelete(item.id)} className="close">
        <FaTimes color="purple" />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  );
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default FeedbackItem;
