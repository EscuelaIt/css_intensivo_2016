var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var plumber = require('gulp-plumber');
var beep = require('beepbeep');
var colors = require('colors');
var sass = require('gulp-sass');


// ERROR HANDLER ==============================================================
  var onError = function(err) {
    beep([200, 200]);
    console.log(
      '\n\n****************************************************\n'.bold.gray +
      '*****************'.bold.gray + ' \(╯°□°)╯'.bold.red + ' ︵ '.bold.gray +'ɹoɹɹǝ '.bold.blue + '*****************'.bold.gray +
      '\n****************************************************\n\n'.bold.gray +
      String(err) +
      '\n\n*******************************************************\n\n'.bold.gray );
    this.emit('end');
  };


// CLEAN ======================================================================
  gulp.task('clean', function(callback) {
    return del('css/', function(err, deletedFiles) {
      console.log('Files deleted:\n'.bold.green , deletedFiles.join(',\n '));
      callback();
    });
  });


// STYLES =====================================================================
  gulp.task('css', function() {
    return gulp.src( 'sass/**/*.scss' )
     .pipe(plumber({
        errorHandler: onError
      }))
      .pipe(sass())
      .pipe(gulp.dest( 'css/' ));
  });


// WATCH ======================================================================
  gulp.task('watch', function() {
    gulp.watch( 'sass/**/*.scss', ['css'] );
  });


// BUILD ======================================================================
  gulp.task('build', function(callback) {
    runSequence(
      'clean',
      [
        'css',
      ],
      callback);
  });

  gulp.task('default', function(callback) {
    runSequence(
      'build',
      [
        'watch',
      ],
      callback);
  });

