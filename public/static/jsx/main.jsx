var elements = require('./elements.jsx')

var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var Link = window.ReactRouter.Link;

var socket =  io.connect(location.host);

  function render() {
      ReactDOM.render(
      <div>
          <Router>
            <Route path="/" component={Container}>
            </Route>
          </Router>
      </div>      ,
            document.getElementById('container')
  )}
