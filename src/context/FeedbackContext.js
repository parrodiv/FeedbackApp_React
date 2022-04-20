import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; //genera id

const FeedbackContext = createContext();

//STATE1
export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This is feedback item 1',
      rating: 10,
    },
    {
      id: 2,
      text: 'This is feedback item 2',
      rating: 9,
    },
    {
      id: 3,
      text: 'This is feedback item 3',
      rating: 7,
    },
  ]);

  //STATE2
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
    //al click del pencil settiamo il feedbackEdit con l'oggetto che contiene id, text e rating e l'inseriamo nel item che ora è un oggetto vuoto, dopo di che imposteremo edit in true
  });

  // Add feedback
  const addFeedback = (newFeedback) => {
    //aggiungo un id al nuovo object newFeedback
    newFeedback.id = uuidv4();
    //  const newArr = [newFeedback, ...feedback]
    //con lo spread operator vengono copiati gli oggetti all'interno dell'array e incorporati al nuovo array
    //sarebbe diverso da [newFeedback, feedback] darebbe [{newFeedback}, [feedback Array(n oggetti es (3))]]
    setFeedback([newFeedback, ...feedback]);
  };

  // Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      //la funzione setFeedback va a modificare il contenuto di feedback
      setFeedback(
        //ritornami gli item che hanno un id diverso dall'id che viene passato al paramtero
        feedback.filter((item) => item.id !== id)
      );
    }
  };

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item: item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback, //feedback: feedback
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit //object
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext
