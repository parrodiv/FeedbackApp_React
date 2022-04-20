import PropTypes from 'prop-types';

function Card({ children, reverse }) {
  return (
    //CONDITIONAL CLASS
    //se reverse è true aggiungi la classe reverse quindi il risultato sarebbe className='card reverse', reverse contiene lo stile diverso da card
    // <div className={`card ${reverse && 'reverse'}`}>
    //   {/* gli passiamo l'elemento figlio del <Card></Card> con children */}
    //   {children}
    // </div>

    //CONTITIONAL STYLE
    <div
      className="card"
      style = {{
        backgroundColor: reverse ? 'rgba(0,0,0,0.4)' : '#fff',
        color: reverse ? '#fff' : '#000',
      }}
    >
      {children}
      {/* ritorna l'elemento children di Card dal feedback item, quindi tutto ciò che è dentro */}
    </div>
  );
}

Card.defaultProps = {
  reverse: false, //set true to see the reverse style
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
};

export default Card;
