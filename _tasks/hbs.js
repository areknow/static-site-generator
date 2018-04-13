'use strict';

const gulp = require('gulp');
const hb = require('gulp-hb');
const gulpSequence = require('gulp-sequence');

gulp.task('hbs-root', function () {
  return gulp
    .src('./_src/*')
    .pipe(hb()
      .partials('./_partials/*.hbs')
    )
    .pipe(gulp.dest('./dist'));
});

gulp.task('hbs-dirs', function () {
  return gulp
    .src('./_src/*/*')
    .pipe(hb()
      .partials('./_partials/*.hbs')
    )
    .pipe(gulp.dest('./dist'));
});

gulp.task('hbs', gulpSequence('hbs-root', 'hbs-dirs'))