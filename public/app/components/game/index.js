import { connect } from 'react-redux';
import React, { Component } from 'react';

export default class Game extends Component {
  start() {
    const { dispatch} = this.props;

    dispatch({ type: 'START', user: { id: 'mock' }});
  }

  render() {
    const { objects } = this.props;

    return (
      <div className='b-game'>
        <canvas id='game' />
        <div className='b-game--controls'>
          <button className='btn btn-primary' onClick={this.start.bind(this)} > Start </button>
        </div>
      </div>
    );
  }
}
