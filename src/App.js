import { v4 as uuidv4} from 'uuid' //genera id 
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import FeedbackForm from './components/FeedbackForm';
import FeedbackStats from './components/FeedbackStats';
import FeedbackList from './components/FeedbackList';
import FeedbackData from './data/FeedbackData';
import { FeedbackProvider } from './context/FeedbackContext';
import AboutIconLink from './components/AboutIconLink';
import AboutPage from './pages/AboutPage';

function App() {
  //FeedbackData contiene il l'array di oggetti e viene passato alla variabile feedback
  const [feedback, setFeedback] = useState(FeedbackData);

   const addFeedback = (newFeedback) => {
     //aggiungo un id al nuovo object newFeedback
     newFeedback.id = uuidv4();
     //  const newArr = [newFeedback, ...feedback]
     //con lo spread operator vengono copiati gli oggetti all'interno dell'array e incorporati al nuovo array
     //sarebbe diverso da [newFeedback, feedback] darebbe [{newFeedback}, [feedback Array(n oggetti es (3))]]
     setFeedback([newFeedback, ...feedback])
   };
   
  const deleteFeedback = (id) => {
    if(window.confirm("Are you sure you want to delete?")){
      //la funzione setFeedback va a modificare il contenuto di feedback
      setFeedback(
        //ritornami gli item che hanno un id diverso dall'id che viene passato al parametro da FeedbackItem.jsx
        feedback.filter( (item) => item.id !== id )
      )
    }
  };

  return (
    <FeedbackProvider>
      <Router>
        {/* Router wrappa tutto  */}
        <Header textColor="#ff6a95" />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <FeedbackForm handleAdd={addFeedback} />
                  <FeedbackStats />
                  <FeedbackList
                    handleDelete={deleteFeedback}
                  />
                </>
              }
            ></Route>

            <Route path="/about" element={<AboutPage />} />
          </Routes>

          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
