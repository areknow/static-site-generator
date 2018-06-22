'use strict';

const gulp = require('gulp');
const hb = require('gulp-hb');
const gulpSequence = require('gulp-sequence');
const rename = require("gulp-rename");
const tap = require('gulp-tap');
const dest = require('gulp-dest');



gulp.task('hbs-root', function () {
  return gulp
    .src('./_src/index.html')
    .pipe(hb().partials('./_partials/*.hbs'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('hbs-dirs', function () {
  var currentFile;
  var files = ['./_src/*', '!./_src/index.html'];
  return gulp
    .src(files)
    .pipe(hb().partials('./_partials/*.hbs'))
    .pipe(tap(function(file) { 
      // Save the directory name
      currentFile = file.path.split('/').pop().split('.').shift();
    }))
    .pipe(rename(function(file) {
      // Rename the file and use new directory name
      file.dirname = currentFile;
      file.basename = 'index';
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('hbs', gulpSequence('hbs-root', 'hbs-dirs'))
