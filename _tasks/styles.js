'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

gulp.task('styles', function () {
  return gulp.src('./_sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('./dist/assets/css'));
});
