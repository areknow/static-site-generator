'use strict';

const browsersync = require("browser-sync").create();
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const del = require("del");
const frontMatter = require('gulp-front-matter');
const gulp = require('gulp');
const hb = require('gulp-hb');
const htmlmin = require('gulp-htmlmin');
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const tap = require('gulp-tap');
const uglify = require('gulp-uglify-es').default;
const zip = require('gulp-zip');
const ts = require('gulp-typescript')
const tsProject = ts.createProject('tsconfig.json');


// ===============================
// Browser Sync
// ===============================
function browserSync(done) {
  browsersync.init({
    open: false,
    ghostMode: false,
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
// Require JS config
// ===============================
function requireJs() {
  return gulp.src('require.config.js')
    .pipe(gulp.dest('./dist/assets/js'))
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
  const tsResult = tsProject.src()
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('./dist/assets/js'));
}

// ===============================
// Minify js
// ===============================
function minify() {
  return gulp.src([
      './dist/assets/js/**.js',
      '!./dist/assets/js/**.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/assets/js'));
}

// ===============================
// Styles
// ===============================
function styles() {
  return gulp.src('./_scss/*.scss')
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
    .src('./_pages/index.hbs')
    .pipe(frontMatter({
      property: 'data.page',
      remove: true
    }))
    .pipe(hb()
      .partials('./_partials/*.hbs')
      .partials('./_layouts/*.hbs')
      .helpers(require('handlebars-layouts'))
      .data('./_data/**/*.{js,json}')
    )
    .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true }))
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest('./dist'));
}

// ===============================
// Handlebars in directories
// ===============================
function hbsDirs() {
  var currentFile;
  var files = ['./_pages/*', '!./_pages/index.hbs'];
  return gulp
    .src(files)
    .pipe(frontMatter({
      property: 'data.page',
      remove: true
    }))
    .pipe(hb()
      .partials('./_partials/*.hbs')
      .partials('./_layouts/*.hbs')
      .helpers(require('handlebars-layouts'))
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
    .pipe(rename({ extname: ".html" }))
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
  gulp.watch("./_scss/**/*", styles);
  gulp.watch("./_ts/**/*", gulp.series('scripts', 'minify', browserSyncReload));
  gulp.watch("./_data/**/*", gulp.series('hbs', browserSyncReload));
  gulp.watch("./_partials/**/*", gulp.series('hbs', browserSyncReload));
  gulp.watch("./_layouts/**/*", gulp.series('hbs', browserSyncReload));
  gulp.watch("./_pages/**/*", gulp.series('hbs', browserSyncReload));
  gulp.watch("./_assets/**/*", gulp.series(clearAssets, assets, browserSyncReload));
}


// ===============================
// Definitions and tasks
// ===============================
gulp.task('require-js', requireJs);
gulp.task('assets', assets);
gulp.task('bundle', bundle);
gulp.task('minify', minify);
gulp.task('scripts', scripts);
gulp.task('styles', styles);
gulp.task('hbs-root', hbsRoot);
gulp.task('hbs-dirs', hbsDirs);
gulp.task('hbs', gulp.series('hbs-root', 'hbs-dirs'));

gulp.task('build', gulp.series('require-js', gulp.series('scripts', 'minify'), 'styles', 'hbs', 'assets'));
gulp.task('watch', gulp.series('build', gulp.parallel(watchFiles, browserSync)));