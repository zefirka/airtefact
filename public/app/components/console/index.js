import React, { Component } from 'react';

export default class Console extends Component {
  change(e) {
    this.props.change.call(this, e.target.value);
  }

  render() {
    return (
      <div className='b-console'>
        <textarea className="form-control" onInput={this.change.bind(this)}>
# your code please
</textarea>
      </div>
    );
  }
}
