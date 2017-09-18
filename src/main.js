'use strict';
$ = jQuery = require('jQuery');//defining jquery globally because bootstrap expects it to be there.
var React = require('react');
var Home = require('./components/homePage');
var About = require('./components/about/aboutPage');

var App = React.createClass({
  render: function() {
    var Child; //This variable will keep track of which child we want to render

    switch(this.props.route) { //This switch statement looks at the properties and route for this app
      case 'about': Child = About; break;// This is saying if this route is about them render this About.
      default: Child = Home; //Otherwise this will default to the homepage.
    }
    return (
      <div>
          <Child/>
      </div>
    );
  }
});

//This render function will do two things. First it will get the route. This is getting the route by taking a peice of the URL. Then call react.render
//we created an abstraction that sits above the homepage.
function render() {
  var route = window.location.hash.substr(1);
  React.render(<App route={route} />, document.getElementsById('app')); //We call our app and pass in route as a property.
}
window.addEventListener('hashchange', render); //When the application renders, we need to watch for hashchange, So we added an EventListener.
//hashchange is an event that occurs when there's an hashchange in the URL.
render(); //Then we need to call a render function. Which needs to be defined on line 23.

// React.render(<Home />, document.getElementById('app')); No longer need
