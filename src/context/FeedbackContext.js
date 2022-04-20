import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; //genera id

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This is text from context',
      rating: 10,
    },
  ]);

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      //la funzione setFeedback va a modificare il contenuto di feedback
      setFeedback(
        //ritornami gli item che hanno un id diverso dall'id che viene passato al paramtero
        feedback.filter((item) => item.id !== id)
      );
    }
  };

  const addFeedback = (newFeedback) => {
    //aggiungo un id al nuovo object newFeedback
    newFeedback.id = uuidv4();
    //  const newArr = [newFeedback, ...feedback]
    //con lo spread operator vengono copiati gli oggetti all'interno dell'array e incorporati al nuovo array
    //sarebbe diverso da [newFeedback, feedback] darebbe [{newFeedback}, [feedback Array(n oggetti es (3))]]
    setFeedback([newFeedback, ...feedback]);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,  //feedback: feedback
        deleteFeedback,
        addFeedback
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext
