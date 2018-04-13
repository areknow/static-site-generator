'use strict';

const gulp = require('gulp');
const minify = require('gulp-minify');
const concat = require('gulp-concat');

gulp.task('scripts', function () {
  gulp.src('./_js/**.js')
    .pipe(minify({
      ext: {
        min: '.min.js'
      },
      exclude: ['tasks'],
      ignoreFiles: ['.combo.js', '-min.js'],
      noSource: true
    }))
    .pipe(gulp.dest('./dist/assets/js'))
});
