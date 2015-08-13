/* GULP modules */
var gulp    = require('gulp'),
    less    = require('gulp-less'),
    bfy     = require('gulp-browserify');

var color   = require('colors');


var _static = 'public/static/',
    _server = 'node/';

function task(name, fn){
  return function(){
    console.log("Apply task: ".green + name.green);
    console.log("___________________________________________".green)
    fn.apply(null, arguments)
  }
}

gulp.

task('less:main', task('less:main', function () {

  var src   = _static + 'less/main.less',
      dest  = _static + "css/"
  try{
    gulp.src(src)
        .pipe(less())
        .pipe(gulp.dest(dest));
  }catch(err){
    console.log("Error: ", err);
  }
})).

// task('less:bootstrap', function () {
//   var stat =  pkg.front + 'static/',
//       src = stat + 'styles/less/bootstrap.less',
//       dest = stat + "styles/css";
//
//   try{
//     gulp.src(src).pipe(less()).pipe(gulp.dest(dest));
//   }catch(err){
//     console.log(err);
//   }
// }).

task('less', ['less:main']).
task('styles', ['less']).

task("scripts:build", task('Building scripts', function() {
  gulp.src(_static + 'js/app/app.js')
      .pipe(bfy({
        insertGlobals : false,
        debug : false
      }))
      .pipe( gulp.dest(_static + '/js'))
})).

task('scripts', ["scripts:build"]).

task('build:static', ['scripts', 'styles']).

task('default', function() {
  gulp.watch(_static + 'less/*.less', ['less']);
  gulp.watch(_static + 'less/**/*.less', ['less']);
  gulp.watch(_static + 'js/app/**/*.js', ['scripts:build']);
  gulp.watch(_static + 'js/app/modules/**/*.js', ['scripts:build']);
});
