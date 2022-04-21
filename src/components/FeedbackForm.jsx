import RatingSelect from './RatingSelect';
import Card from './shared/Card';
import { useState, useContext, useEffect } from 'react';
import Button from './shared/Button';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [isDisabled, setBtnDisable] = useState(true);
  const [message, setMessage] = useState('');

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisable(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);
  // se all'interno delle parentesi quadre non c'è niente le funzioni all'interno si avvieranno al loading della pagina

  // se invece inseriamo un dato ad es un object, esso diventa una dipendenza e nel momento in cui quel dato viene modificato (ad es al click del pencil) le funzioni si avviano oltre che ad avviarsi anche al loading

  const handleText = (e) => {
    //destructuring object prendo il value dall'event object perchè se utilizzassi text come elemento di verifica avremmo che al primo input il text state sarebbe ancora vuoto essendo che l'assegnazione avviene al successivo render del component
    const { value } = e.target; //estraggo value da e.target.value

    if (value === '') {
      setBtnDisable(true);
      setMessage(null);
      //null indica che il message non esiste
    } else if (value.trim().length < 10) {
      setMessage('Text must be at least 10 characters');
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
      setMessage(null);
    }

    setText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length >= 10) {
      const newFeedback = {
        text, //text: text
        rating,
      };

      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback); //edit false
      }

      setText('');
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleText}
            value={text} //viene settato da setText
            type="text"
            placeholder="Write a review"
          />
          <Button version="secondary" isDisabled={isDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
        {/* se message c'è allora..*/}
      </form>
    </Card>
  );
}

export default FeedbackForm;
