import React from 'react';
import PropTypes from 'prop-types';

function Timer(props) {
  const { handleAnswer, reset } = props;
  const TIMER = 30;
  const [counter, setCounter] = React.useState(TIMER);

  React.useEffect(() => {
    const ONE_SECOND = 1000;
    const RESET_TIMER = 30;
    if (counter > 0 && !reset) {
      setTimeout(() => setCounter(counter - 1), ONE_SECOND);
    } else {
      setCounter(RESET_TIMER);
    }

    if (counter === 0) {
      handleAnswer();
    }
  }, [counter, handleAnswer, reset]);

  return (
    <div id="timer">
      {counter}
    </div>
  );
}

Timer.propTypes = {
  handleAnswer: PropTypes.func.isRequired,
  reset: PropTypes.bool.isRequired,
};

export default Timer;
