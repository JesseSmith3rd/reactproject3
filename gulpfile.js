'use strict';

var gulp    = require('gulp');
var shell   = require('gulp-shell');
var connect = require('gulp-connect'); //This will run a local dev server
var open    = require('gulp-open'); //this will open a URL in a web browser

var config = {
  port: 3000,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html', //This says, go into the source directory and find any match for html
    dist: './dist'
  }
}
//Start a local development server
gulp.task('connect', function() {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
});

//This task says, go get .html and open it in the browser at this URL, so it will use our devBaseUrl on line 9
gulp.task('open', ['connect'], function() {
  gulp.src('dist/index.html')
  .pipe(open({ url: config.devBaseUrl + ':' + config.port + '/'}));
})

//this is saying, go get html file and put it in the dist folder, and when its done reload.
gulp.task('html', function() {
  gulp.src(config.paths.html)
  .pipe(gulp.dest(config.paths.dist))
  .pipe(connect.reload());
 });
//This task will watch a file and everytime we make a change, gulp knows about it and reloads the browser
gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
});

 //This is the default task. What this is saying is if I go to the commandline and type it will run the html task, and open task.
 gulp.task('default', ['html', 'open'])
