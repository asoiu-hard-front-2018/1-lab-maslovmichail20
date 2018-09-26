'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync');
const del = require('del');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');



const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

gulp.task('less', () => {
  return gulp.src('./src/less/index.less')
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(less())
    .pipe(gulpIf(!isDev, autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })))
    .pipe(gulpIf(!isDev, cleanCSS({compatibility: 'ie10'})))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(gulp.dest('./public'));
});

gulp.task('js', () => {
  return gulp.src('./src/js/**/*.js')
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(concat('index.js'))
    .pipe(gulpIf(!isDev, uglify()))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(gulp.dest('./public'))
});

gulp.task('assets:html', () => {
  return gulp.src('./src/assets/**/*.html', { since: gulp.lastRun('assets:html') })
    .pipe(gulp.dest('./public'));
});

gulp.task('assets:pictures', () => {
  return gulp.src('./src/assets/**/*.{png,jpg}', { since: gulp.lastRun('assets:pictures') })
    .pipe(gulpIf(!isDev, imagemin()))
    .pipe(gulp.dest('./public'));
});

gulp.task('assets:svg', () => {
  return gulp.src('./src/assets/svg/**/*.svg')
      .pipe(svgSprite({
          shape: {
            spacing: {
              padding: 50
            }
          },
          mode: {
            css: {
              dest: '.',
              bust: false,
              sprite: 'svg/sprite.svg',
              layout: 'vertical',
              render: {
                less: {
                  dest: 'sprite.less'
                }
              }
            }
          }
      }))
      .pipe(gulpIf('*.less', gulp.dest('./tmp'), gulp.dest('./public')))
});

gulp.task('clean', () => {
  return del('./public');
});

gulp.task('build', gulp.series(
  'clean', 'assets:svg', gulp.parallel('less', 'assets:html', 'assets:pictures', 'js'))
);

gulp.task('watch', () => {
  gulp.watch('./src/assets/svg/**/*.svg', gulp.series('assets:svg'));
  gulp.watch('./src/less/**/*.less', gulp.series('less'));
  gulp.watch('./src/js/**/*.js', gulp.series('js'));
  gulp.watch('./src/assets/**/*.html', gulp.series('assets:html'));
  gulp.watch('./src/assets/**/*.{png,jpg}', gulp.series('assets:pictures'));
});

gulp.task('serve', () => {
  browserSync.init({
    server: 'public'
  });
  
  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));

gulp.task('default', gulp.series('build'));