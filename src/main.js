$ = jQuery = require('jquery');//defining jquery globally because bootstrap expects it to be there.
var React = require('react');
var Home = require('./components/homePage');
React.render(<Home/>, document.getElementById('app'));
