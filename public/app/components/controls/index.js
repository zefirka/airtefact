import { connect } from 'react-redux';
import React, { Component } from 'react';
import Control from '../control';
import Console from '../console';

const Element = connect()(Control);

export default class Controls extends Component {
  add() {
    const { dispatch, uniq, elements = [] } = this.props;

    dispatch({type: 'ADD', id : elements.length})
  }

  change(value) {
    debugger
  }

  render() {
    const { elements } = this.props

    return (
      <section className="b-controls--elements">
        <div>
          <h2>My team</h2>
        </div>

        <Console change={this.change}/>

        <div className=''>
          {
            elements.map((element, i) =>
            <Element key={ i } uniq={ i } id={ element.id } rules={ element.rules } />, this)
          }
        </div>
        <div className='b-controls--buttons'>
          <button className='btn btn-success' onClick={ this.add.bind(this) } > Add new </button>
        </div>
      </section>

    );
  }
}
