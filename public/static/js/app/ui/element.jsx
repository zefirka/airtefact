var Element =  React.createClass({
  componentDidMount: function(){

  },
  render: function(){
    return (
        <span>
          <input className='form-control' id={this.props.id} value={this.props.id}/>
        </span>
    );
  }
});

module.exports = Element;
