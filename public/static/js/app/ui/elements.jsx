var Element = require('./element.jsx');

var ElementsList = React.createClass({
  getInitialState: function(){
    return this.props;
  },
  componentDidMount: function(){

  },

  add : function(){
    var nelems = this.state.elems;
    nelems.push({
      id: 'New',
      rules: []
    });    
    this.setState({ elems : nelems});
  },

  render: function(){
    //= include ../../templates/Element.jsx

    var elems = this.state.elems.map(function(elem){
      return <Element id={elem.id} rules={elem.rules} />;
    });

    return (
        <div class="b-controls--elements">
          {elems}
          <span onClick={this.add}> Add new </span>
        </div>
    );
  }
});

module.exports = ElementsList;
