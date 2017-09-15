'use strict';

var gulp    = require('gulp');
var shell   = require('gulp-shell');
var connect = require('gulp-connect'); //This will run a local dev server
var open    = require('gulp-open'); //this will open a URL in a web browser
var browserify = require('browserify'); //bundles js
var reactify   = require('reactify'); //transforms react JXS to JS
var source     = require('vinyl-source-stream'); //Use conventional text streams with gulp
var concat  = require('gulp-concat');  //this concatenates files

var config = {
  port: 3000,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html', //This says, go into the source directory and find any match for html
    js:   './src/**/*.js', //this will direct our path to javascript and look into any subdirectories for any js that we can find.
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    ],
    dist: './dist',
    mainJs: './src/main.js'
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
 gulp.task('js', function() {
   browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle() //this will bundle and put anything we get and put in all in one file
    .on('error', console.error.bind(console)) //if any errors happen we will see them on the console
    .pipe(source('bundle.js')) //this defines the bundle name which is bundle.js
    .pipe(gulp.dest(config.paths.dist + '/scripts')) //this will place the bundle under scripts
    .pipe(connect.reload());
 });

 gulp.task('css', function() {
   gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'))
});
//This task will watch a file and everytime we make a change, gulp knows about it and reloads the browser
gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']); //This is a watch for html and as it changes out html is run automatically
  gulp.watch(config.paths.js, ['js']); //This is a watch for js and as it changes out js is run automatically
});

 //This is the default task. What this is saying is if I go to the commandline and type it will run the html task, and open task.
 gulp.task('default', ['html', 'js','css','open', 'watch'])
