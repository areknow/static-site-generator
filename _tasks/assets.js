'use strict';

const gulp = require('gulp');

gulp.task('assets', function () {
  gulp.src('_assets/**')
    .pipe(gulp.dest('./dist/assets')
  );
});
