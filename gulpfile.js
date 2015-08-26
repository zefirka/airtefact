/* GULP modules */
var gulp      = require('gulp'),
    less      = require('gulp-less'),
    bfy       = require('browserify'),
    bower     = require('gulp-bower'),
    jsdoc     = require('gulp-jsdoc'),
    reactify  = require('reactify'),
    babelify  = require('babelify'),
    source    = require('vinyl-source-stream'),
    jasmine   = require('gulp-jasmine-phantom');

var color   = require('colors'),
    pkg     = require('./package.json');

var _static = 'public/static/',
    _server = 'node/';

function task(name, fn){
  return function(){
    console.log('Apply task: '.green + name.green);
    console.log('___________________________________________'.green);
    return fn.apply(null, arguments);
  };
}

gulp.

task('less:main', task('less:main', function () {

  var src   = _static + 'less/main.less',
      dest  = _static + 'css/';

  try{
    gulp.src(src)
        .pipe(less())
        .pipe(gulp.dest(dest));
  }catch(err){
    console.log('Error: ', err);
  }
})).

task('bower', function(){
  return bower({
    directory : _static + 'lib'
  });
}).

task('less', ['less:main']).
task('styles', ['less']).

task('scripts:build', task('Building scripts', function() {
  /* browserify */
  var enter = _static + 'js/app/app.js';
  var b = bfy();

  b .transform(babelify) // use babelify transform
    .transform(reactify) // use reactify transform
    .add(enter)
    .on('error', function(err) {console.error(err.message); });

  return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(_static + '/js/bundle'));
})).

task('scripts', ['scripts:build']).

task('build', ['bower', 'build:static', 'docs']).

task('build:static', ['scripts', 'styles']).

task('docs', task('Generation documentation', function () {
  gulp.src(['./node/*.js', './node/**/*.js'])
      .pipe(jsdoc.parser())
      .pipe(jsdoc.generator('./docs'));
})).

task('default', function() {
  gulp.watch(_static + 'less/*.less', ['less']);
  gulp.watch(_static + 'less/**/*.less', ['less']);
  gulp.watch(_static + 'js/app/**/*.js', ['scripts:build']);
  gulp.watch(_static + 'js/app/**/*.jsx', ['scripts:build']);
  gulp.watch(_static + 'js/app/modules/**/*.js', ['scripts:build']);
});
