import { connect } from 'react-redux';
import React, { Component } from 'react';
import Control from '../control';

const Element = connect()(Control);

export default class Controls extends Component {
  add() {
    const { dispatch, uniq, elements = [] } = this.props;

    dispatch({type: 'ADD', id : elements.length})
  }

  render() {
    const { elements } = this.props;

    return (
      <section className="b-controls--elements">
        <div className=''>
          {
            elements.map((element, i) =>
            <Element key={ i } uniq={ i } id={ element.id } rules={ element.rules } />, this)
          }
        </div>
        <div class='b-controls--buttons'>
          <button onClick={ this.add.bind(this) } > Add new </button>
        </div>
      </section>

    );
  }
}
