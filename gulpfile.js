/* GULP modules */
var gulp    = require('gulp'),
    less    = require('gulp-less'),
    bfy     = require('gulp-browserify'),
    bower   = require('gulp-bower'),
    jsdoc   = require('gulp-jsdoc');

var color   = require('colors'),
    pkg     = require('./package.json');

var _static = 'public/static/',
    _server = 'node/';

function task(name, fn){
  return function(){
    console.log('Apply task: '.green + name.green);
    console.log('___________________________________________'.green);
    fn.apply(null, arguments);
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
  gulp.src(_static + 'js/app/app.js')
      .pipe(bfy({
        insertGlobals : false,
        debug : false
      }))
      .pipe( gulp.dest(_static + '/js'));
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
  gulp.watch(_static + 'js/app/modules/**/*.js', ['scripts:build']);
});
