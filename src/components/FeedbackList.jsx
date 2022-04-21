import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from 'react'
import FeedbackItem from './FeedbackItem';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackList() {

  const { feedback } = useContext(FeedbackContext)

  //l'array feedback incrementa al submit del form, dopo di che verrà fatto un map through al return di questa funzione, cosi che vedremo aggiungere il nuovo feedback nel ui

  if (!feedback || feedback.length === 0) {
    return <p>No feedback yet</p>;
  }
  //WITH ANIMATION
  return (
    <div className="feedback-list">
      <AnimatePresence>
          {feedback.map((item) => (
            <motion.div
              key={item.id}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
            >
              <FeedbackItem key={item.id} item={item} />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );

  //NO ANIMATION
  // return (
  //   <div className="feedback-list">
  //     {feedback.map((item) => (
  //       <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
  //     ))}
  //   </div>
  // );
}



export default FeedbackList;
