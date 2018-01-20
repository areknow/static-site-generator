'use strict';
 
var gulp = require('gulp');
var minify = require('gulp-minify');
var concat = require('gulp-concat');

gulp.task('scripts', function () {
  gulp.src('./_js/**.js')
    .pipe(concat('main.js'))
    .pipe(minify({
      ext: {
        min: '.min.js'
      },
      exclude: ['tasks'],
      ignoreFiles: ['.combo.js', '-min.js'],
      noSource: true
    }))
    .pipe(gulp.dest('./js'))
});
