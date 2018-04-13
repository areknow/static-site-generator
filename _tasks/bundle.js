'use strict';

const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('bundle', function () {
  return gulp.src('./app/**')
    .pipe(zip('app.zip'))
    .pipe(gulp.dest('./dist'));
});