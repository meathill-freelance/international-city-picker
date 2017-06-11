/**
 * Created by meathill on 2017/6/12.
 */

const gulp = require('gulp');
const del = require('del');
const stylus = require('gulp-stylus');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const webpack = require('gulp-webpack');
const sequence = require('run-sequence');
const uglify = require('gulp-uglify');

const DOC = 'docs/';

gulp.task('clear', () => {
  return del([DOC]);
});

gulp.task('stylus', () => {
  return gulp.src('./styl/city-picker.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(rename('tqb-city-picker-desktop.min.css'))
    .pipe(gulp.dest(DOC + 'css/'));
});

gulp.task('webpack', () => {
  return gulp.src('./app/main.js')
    .pipe(webpack(require('./webpack.config.prod')))
    .pipe(uglify())
    .pipe(rename('tqb-city-picker-desktop.min.js'))
    .pipe(gulp.dest(DOC + 'js/'));
});

gulp.task('default', callback => {
  sequence(
    'clear',
    ['stylus', 'webpack'],
    callback
  );
});