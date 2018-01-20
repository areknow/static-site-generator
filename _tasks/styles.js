'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
let cleanCSS = require('gulp-clean-css');
 
gulp.task('styles', function () {
  return gulp.src('./_sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('./css'));
});
