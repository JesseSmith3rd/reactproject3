"use strict";

var React = require('react');

var Home = React.createClass({
  render: function() {
    return (
      <div id="app">
      <div className="jumbotron">
        <h1>Jesses Smith Demonstration</h1>
        <p>React, React Router, and Flux for duper ultra lightning fast, warp nine website.</p>
      </div>
      </div>
    );
  }
});

module.exports = Home;
