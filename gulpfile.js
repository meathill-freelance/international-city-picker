/**
 * Created by meathill on 2017/6/12.
 */

const gulp = require('gulp');
const del = require('del');
const stylus = require('gulp-stylus');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const sequence = require('run-sequence');
const uglify = require('gulp-uglify');
const pkg = require('./package.json');

const DOC = 'docs/';

gulp.task('clear', () => {
  return del([DOC]);
});

gulp.task('stylus', () => {
  return gulp.src('./styl/city-picker.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(rename(`${pkg.name}.css`))
    .pipe(gulp.dest(DOC + 'css/'))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(rename(`${pkg.name}.min.css`))
    .pipe(gulp.dest(DOC + 'css/'));
});

gulp.task('webpack', () => {
  return gulp.src('./app/main.js')
    .pipe(webpackStream(require('./webpack.config.prod'), webpack))
    .pipe(rename(`${pkg.name}.js`))
    .pipe(gulp.dest(DOC + 'js/'))
    .pipe(uglify())
    .pipe(rename(`${pkg.name}.min.js`))
    .pipe(gulp.dest(DOC + 'js/'));
});

gulp.task('default', callback => {
  sequence(
    'clear',
    ['stylus', 'webpack'],
    callback
  );
});