import React from 'react';
import PropTypes from 'prop-types';

function Timer(props) {
  const { handleAnswer } = props;
  const TIMER = 30;
  const [counter, setCounter] = React.useState(TIMER);

  React.useEffect(() => {
    const ONE_SECOND = 1000;
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), ONE_SECOND);
    }

    if (counter === 0) {
      handleAnswer();
    }
  }, [counter, handleAnswer]);

  return (
    <div id="timer">
      {counter}
    </div>
  );
}

Timer.propTypes = {
  handleAnswer: PropTypes.func.isRequired,
};

export default Timer;
