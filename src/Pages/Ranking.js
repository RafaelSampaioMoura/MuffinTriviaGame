import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { submitPlayerInfo, submitPlayerScore } from '../redux/actions';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theRankings: [],
    };
  }

  componentDidMount() {
    const { ranking, dispatch } = this.props;
    dispatch(submitPlayerInfo({
      name: '',
      gravatarEmail: '',
    }));
    dispatch(submitPlayerScore(0));
    localStorage.setItem('ranking', JSON.stringify(ranking));
    const rankings = JSON.parse(localStorage.getItem('ranking'));
    const orderedRankings = rankings.sort((a, b) => b.score - a.score);
    this.setState({
      theRankings: [...orderedRankings],
    });
  }

  handleReturnBtn = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { theRankings } = this.state;
    return (
      <div>
        Ranking:
        {theRankings.length > 0 && theRankings.map((object, index) => (
          <>
            <img src={ `https://www.gravatar.com/avatar/${md5(object.gravatarEmail).toString()}` } alt="Profile" />
            <div data-testid={ `player-name-${index}` }>{object.name}</div>
            <div data-testid={ `player-score-${index}` }>{object.score}</div>
          </>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleReturnBtn }
        >
          Back to Login
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ranking: state.rankingReducer.ranking,
});

Ranking.propTypes = {
  history: PropTypes.shape([]).isRequired,
  ranking: PropTypes.shape([]).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Ranking);
