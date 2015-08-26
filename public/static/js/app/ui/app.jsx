var Game = require('./game.jsx');
var Controls = require('./controls.jsx');

var App = React.createClass({
  render: function(){
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 col-lg-8 col-sm-12 col-xs-12'>
            <Game />
          </div>
          <div className='col-md-4 col-lg-4 col-sm-12 col-xs-12'>
            <h2> Моя команда </h2>
            <Controls />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
