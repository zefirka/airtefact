import { connect } from 'react-redux';
import React, { Component } from 'react';
import Controls from '../controls';
import Game from '../game';

const Form = connect(state => state)(Controls);
const Canvas = connect(state => state)(Game);

export default class App extends Component {
  render() {
    return (
      <div className='row'>
        <div className='col-md-8 col-lg-8 col-sm-12 col-xs-12'>
          <Canvas />
        </div>
        <div className='col-md-4 col-lg-4 col-sm-12 col-xs-12'>
          <Form />
        </div>
      </div>
    );
  }
}
