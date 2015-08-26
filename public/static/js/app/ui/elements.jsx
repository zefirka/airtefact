var Element = require('./element.jsx');

var ElementsList = React.createClass({
  componentDidMount: function(){

  },
  render: function(){
    var elems = this.props.elems.map(function(elem){
      return <Element id={elem.id} rules={elem.rules} />;
    });

    return (
        <div>
          {elems}
        </div>
    );
  }
});

module.exports = ElementsList;
