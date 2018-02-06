'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('default', sassTask);
gulp.task('sass', sassTask);

function sassTask(done) {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./css'));
  done();
}

gulp.task('sass:watch', function(done) {
  gulp.watch('scss/**/*.scss', gulp.series(['sass']));
  done();
});
