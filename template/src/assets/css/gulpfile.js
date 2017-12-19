'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var rename = require("gulp-rename");
var header = require('gulp-header');
var cssnano = require('gulp-cssnano');
var salad = require('postcss-salad')(require('../../../public/salad.config.json'));
var pkg = require('../../../package.json');

var banner = [
	'/*!',
  ' * <%= pkg.name %> v<%= pkg.version %>',
  ' * Author    : <%= pkg.author %>',
  ' * Copyright : <%= new Date().getFullYear() %> SealUI',
  ' */',
  ''
  ].join('\n');

gulp.task('compile', function() {
  return gulp.src('./src/*.css')
    .pipe(postcss([salad]))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(
    	cssnano({
        zindex: false,
        autoprefixer: false
      })
    )
    .pipe(rename({suffix: '.min'}))
    //.pipe(rename("sealui.min.css"))
    .pipe(gulp.dest('./lib'));
});

gulp.task('copyfont', function() {
  return gulp.src('./src/fonts/**')
    .pipe(gulp.dest('./lib/fonts'));
});

gulp.task('build', ['compile', 'copyfont']);
