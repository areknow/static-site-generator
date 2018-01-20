'use strict';

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');


gulp.task('copy', function () {
  // copy index
  gulp.src('index.html')
    .pipe(gulp.dest('./dist/')
  );
  // copy assets
  gulp.src('assets/*')
    .pipe(gulp.dest('./dist/assets')
  );
  // copy style sheet files
  gulp.src('css/*')
    .pipe(gulp.dest('./dist/css')
  );
  // copy javscript files
  gulp.src('js/*')
    .pipe(gulp.dest('./dist/js')
  );
});


gulp.task('dist', gulpSequence('scripts','styles','copy'))