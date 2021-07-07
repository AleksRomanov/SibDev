'use strict';


var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var scss = require('gulp-sass');
var postcss = require('gulp-postcss');
var server = require('browser-sync').create();
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var del = require('del');
const concat = require('gulp-concat');
const rollup = require(`gulp-better-rollup`);
const commonjs = require(`rollup-plugin-commonjs`);
const nodeResolve = require(`rollup-plugin-node-resolve`);
const babel = require(`rollup-plugin-babel`);
const cleancss = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer');
const {src, dest, parallel, series, watch} = require('gulp');

gulp.task('styles', function () {
  return gulp
    .src('source/sass/style.scss')
    .pipe(eval('scss')())
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: true}))
    .pipe(cleancss({level: {1: {specialComments: 0}}}))
    .pipe(dest('build/css/'))
    .pipe(server.stream())
});


gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.scss', gulp.series('styles'));
  gulp.watch('source/img/icon-*.svg', gulp.series('sprite', 'html', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/js/*.js', gulp.series('scripts', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))

    .pipe(gulp.dest('source/img'));

});

gulp.task('webp', function () {
  return gulp.src('source/img/**/*.jpg')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('source/img'));
});

gulp.task('sprite', function () {
  return gulp.src('source/img/svg/**.{png,svg}')
    .pipe(svgstore({inlineSvg: false}))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('build'));
});

gulp.task('scripts', function () {
  return gulp
    .src('source/js/main.js')
    .pipe(plumber())
    .pipe(
      rollup(
        {
          plugins: [commonjs(), nodeResolve(), babel()]
        },
        'iife'
      )
    )
    // .pipe(uglify())
    .pipe(plumber())
    .pipe(rename({suffix: `.min`}))
    .pipe(gulp.dest('build/js/'));
});

gulp.task('scriptsLibs', function () {
  return gulp.src('source/js/vendor/*.js')
    .pipe(plumber())
    .pipe(concat(`vendor.js`))
    // .pipe(uglify())
    .pipe(rename({suffix: `.min`}))
    .pipe(gulp.dest('build/js/vendor'));
});


gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/*.ico'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('build', gulp.series('clean', 'copy', 'sprite', 'styles', 'html', 'scriptsLibs', 'scripts'));
gulp.task('start', gulp.series('build', 'server'));
