import React, { Component } from 'react';

export default class Control extends Component {
  remove() {
    const { dispatch, uniq } = this.props;
    dispatch({type: 'REMOVE', index: uniq});
  }

  edit() {

  }

  render() {
    const { uniq } = this.props;
    const key = `ctrl${uniq}`

    return (
      <div className='b-control'>
        <input className='form-control' id={ key } type='text' value={this.props.id} />
        <button className='btn btn-danger' onClick={ this.remove.bind(this) }>x</button>
        <button className='btn' onClick={ this.edit.bind(this) }>edit</button>
      </div>
    );
  }
}
