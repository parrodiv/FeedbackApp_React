import PropTypes from 'prop-types';

function Header({ bgColor, textColor }) {
  const headerStyle = {
    backgroundColor: bgColor,
    color: textColor,
  };
  return (
    <header style={headerStyle}>
      <div className="container">
        <h2>Fedback UI </h2>
      </div>
    </header>
  );
}

Header.defaultProps = {
  text: 'Hello World',
  bgColor: 'rgba(0,0,0,0.4)',
  textColor:
    'yellow' /* è rosso perchè gli passiamo la props rosso dal App.js */,
};

Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Header;
