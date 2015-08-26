var Element =  React.createClass({
  getInitialState : function(){
    return {
      id: this.props.id
    };
  },

  componentDidMount: function(){

  },
  remove : function(){
    debugger
  },

  change : function(e){
    this.setState({
      id: e.target.value
    });
  },

  render: function(){
    return (
        <span>
          <input className='form-control' id={this.props.id} value={this.state.id} onInput={this.change}/>
          <span onClick={this.remove}> Remove </span>
        </span>
    );
  }
});

module.exports = Element;
