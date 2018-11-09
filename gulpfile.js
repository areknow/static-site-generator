'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const hb = require('gulp-hb');
const rename = require("gulp-rename");
const tap = require('gulp-tap');
const htmlmin = require('gulp-htmlmin');
const zip = require('gulp-zip');
const browsersync = require("browser-sync").create();
const del = require("del");


// ===============================
// Browser Sync
// ===============================
function browserSync(done) {
  browsersync.init({
    open: false,
    server: { baseDir: './dist/' },
    port: 3000
  });
  done();
}
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// ===============================
// Assets
// ===============================
function assets() {
  return gulp.src('_assets/**')
    .pipe(gulp.dest('./dist/assets'))
}
function clearAssets() {
  return del(["./dist/assets/images", "./dist/assets/vendor"]);
}

// ===============================
// Scripts
// ===============================
function scripts() {
  return gulp.src('./_js/**.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browsersync.stream());
}

// ===============================
// Styles
// ===============================
function styles() {
  return gulp.src('./_sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browsersync.stream());
}

// ===============================
// Handlebars in root
// ===============================
function hbsRoot() {
  return gulp
    .src('./_src/index.html')
    .pipe(hb()
      .partials('./_partials/*.hbs')
      .data('./_data/**/*.{js,json}')
    )
    .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true }))
    .pipe(gulp.dest('./dist'));
}

// ===============================
// Handlebars in directories
// ===============================
function hbsDirs() {
  var currentFile;
  var files = ['./_src/*', '!./_src/index.html'];
  return gulp
    .src(files)
    .pipe(hb()
      .partials('./_partials/*.hbs')
      .data('./_data/**/*.{js,json}')
    )
    .pipe(tap(function(file) { 
      // Save the directory name
      currentFile = file.path.split('/').pop().split('.').shift();
    }))
    .pipe(rename(function(file) {
      // Rename the file and use new directory name
      file.dirname = currentFile;
      file.basename = 'index';
    }))
    .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true }))
    .pipe(gulp.dest('./dist'));
}

// ===============================
// Bundle
// ===============================
function bundle() {
  return gulp.src('./app/**')
    .pipe(zip('app.zip'))
    .pipe(gulp.dest('./dist'));
}

// ===============================
// Watch
// ===============================
function watchFiles() {
  gulp.watch("./_sass/**/*", styles);
  gulp.watch("./_js/**/*", scripts);
  gulp.watch("./_data/**/*", gulp.series('hbs', browserSyncReload));
  gulp.watch("./_partials/**/*", gulp.series('hbs', browserSyncReload));
  gulp.watch("./_src/**/*", gulp.series('hbs', browserSyncReload));
  gulp.watch("./_assets/**/*", gulp.series(clearAssets, assets, browserSyncReload));
}


// ===============================
// Definitions and tasks
// ===============================
gulp.task('assets', assets);
gulp.task('bundle', bundle);
gulp.task('scripts', scripts);
gulp.task('styles', styles);
gulp.task('hbs-root', hbsRoot);
gulp.task('hbs-dirs', hbsDirs);
gulp.task('hbs', gulp.series('hbs-root', 'hbs-dirs'));

gulp.task('build', gulp.series('scripts', 'styles', 'hbs', 'assets'));
gulp.task('watch', gulp.series('build', gulp.parallel(watchFiles, browserSync)));