const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
// sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./source/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./source/css'))
});

gulp.task('style', function () {
  return gulp.src('./source/css/style.css')
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(cleanCSS({level: 2}))
  .pipe(gulp.dest('./source/css'))
  .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: "./source"
    }
  });
  gulp.watch('./source/sass/*.scss', gulp.series('build'));
  gulp.watch("./source/*html").on('change', browserSync.reload);
});

gulp.task('build', gulp.series('sass', 'style'));
gulp.task('dev', gulp.series('build', 'watch'));
