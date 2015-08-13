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

  var stat  = pkg.front + 'static/',
      src   = stat + 'styles/less/main.less',
      dest  = stat + "styles/css"
  try{
    gulp.src(src)
        .pipe(less())
        .pipe(gulp.dest(dest));
  }catch(err){
    console.log("Error: ", err);
  }
})).

task('less:bootstrap', function () {
  var stat =  pkg.front + 'static/',
      src = stat + 'styles/less/bootstrap.less',
      dest = stat + "styles/css";

  try{
    gulp.src(src).pipe(less()).pipe(gulp.dest(dest));
  }catch(err){
    console.log(err);
  }
}).

task('less', ['less:main', 'less:bootstrap']).
task('styles', ['less']).

task("scripts:build", task('Building scripts', function() {
  gulp.src(pkg.front + 'static/js/app.js')
      .pipe(bfy({
        insertGlobals : true,
        debug : !gulp.env.production
      }))
      .pipe( gulp.dest(pkg.front + 'static/js/app/'))
})).

task('scripts', ["scripts:build"]).

task('default', function() {
  gulp.watch(_static + 'less/*.less', ['less']);
  gulp.watch(_static + 'less/**/*.less', ['less']);
  gulp.watch(_static + 'js/app/**/*.js', ['scripts:build']);
  gulp.watch(_static + 'js/app/modules/**/*.js', ['scripts:build']);
});
