import { connect } from 'react-redux';
import React, { Component } from 'react';
import Controls from '../controls';
import Game from '../game';

const Form = connect(state => state)(Controls)

export default class App extends Component {
  getInitialState() {
    return {
      elements : [{
        id: 0,
        rules: []
      }]
    };
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-8 col-lg-8 col-sm-12 col-xs-12'>
          <Game />
        </div>
        <div className='col-md-4 col-lg-4 col-sm-12 col-xs-12'>
          <Form elements={[ {id: 0, rules: []}]}/>
        </div>
      </div>
    );
  }
}
