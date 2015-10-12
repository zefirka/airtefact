var ElementsList = require('./elements.jsx');

var Controls = React.createClass({
  getInitialState: function(){
    return {
      elements : [{
        id: 'Initial ID',
        rules: []
      }]
   };
  },
  render: function(){
    return (
      <div className='controls'>
        <div>
          <div> Общая консоль </div>
          <textarea id='controls'></textarea>
        </div>
        <div>
          <ElementsList elems={this.state.elements} />
        </div>
      </div>
    );
  }
});

module.exports = Controls;
