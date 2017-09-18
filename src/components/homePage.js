"use strict";

var React = require('react');

var Home = React.createClass({
  render: function() {
    return (
        <div className="jumbotron">
          <h1>Jesse Smith React Demonstration</h1>
          <p>React, React Router, and Flux for ultra lightning fast, warp nine, engage website.</p>
        </div>
    );
  }
});

module.exports = Home;
