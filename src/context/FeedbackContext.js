import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; //genera id

const FeedbackContext = createContext();


export const FeedbackProvider = ({ children }) => {
  //STATE1
  const [feedback, setFeedback] = useState([]);
  //STATE2
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
    //al click del pencil settiamo il feedbackEdit con l'oggetto che contiene id, text e rating e l'inseriamo nel item che ora è un oggetto vuoto, dopo di che imposteremo edit in true
  });
  //STATE3
  const [isLoading, setIsLoading] = useState(true);

  //al reload avvia la funzione all'interno
  useEffect(() => {
    fetchFeedback();
  }, []);

  //Fetch data from json-server
  const fetchFeedback = async () => {
    const response = await fetch(
      '/feedback?_sort=id&_order=desc'
      //ordine decrescente in base al id
    );
    const data = await response.json();

    //setto la variabile feedback dello state
    setFeedback(data);
    //setto isLoading in false, era settato su true e finche non viene chiamata questa funzione rimane su true e viene chiamata proprio al reload della pagina, quindi il loader appare solo nella fase di transizione tra il caricamento e il fetch del feedback
    setIsLoading(false);
  };

  // Add feedback
  const addFeedback = async (newFeedback) => {
      const response = await fetch('/feedback',{
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newFeedback)
      })
      // console.log(newFeedback); //no id

      const data = await response.json()

      // console.log(data); // yes id, automatically added from json-server

    //  const newArr = [newFeedback, ...feedback]
    //con lo spread operator vengono copiati gli oggetti all'interno dell'array e incorporati al nuovo array [{...},{...},{...}]
    //sarebbe diverso da [newFeedback, feedback] darebbe [{newFeedback}, [feedback Array(n oggetti es (3))]]
    setFeedback([data, ...feedback]);
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      const response = await fetch(`/feedback/${id}`, { method: 'DELETE'})

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
  //Clicking on the pencil icon calls editFeedback which updates context state, after which React re renders the Context Provider and all of it's descendants.
  // So yes state is changed.
  // Whenever React renders a function component it calls/invokes that function component again with new state available on this new render. So anything you declare or run inside your function will run again, just like a normal function. Function components are just functions.

  const updateFeedback = async (id, updItem) => { 
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updItem)
    })
    const data = await response.json() 
    console.log(updItem) //id no quindi prima {...item, ...updItem} perchè serve id
    console.log(data) // id si

    setFeedback(
      feedback.map((item) => (item.id === id ? data : item))
    );
    // This ES6 syntax allows you to take two objects and make a single object out of them. Like a "merge".So spreading both item and updateItem, merges the two objects into one new object with any duplicate key value pairs from the second object overwriting the key value pairs in the first object.

    //ALTERNATIVE
    //feedback.map((item) => (item.id === id ? { ...updItem, id } : item)

    //reset feedbackEdit
    setFeedbackEdit({
      item: {},
      edit: false,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback, //feedback: feedback
        feedbackEdit, //object
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
