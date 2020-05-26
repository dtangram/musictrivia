const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');

// SASS Styles Task
gulp.task('stylesSCSS', () => gulp.src('public/sass/main.scss')
  .pipe(sass({
    style: 'expanded',
  }))
  .pipe(plumber())
  .pipe(gulp.dest('../reactjs/src/css/')));

// Watch Tasks
gulp.task('watch', () => {
  gulp.watch('public/sass/base/base.scss', ['stylesSCSS']);
});

gulp.task('default', ['watch', 'stylesSCSS']);
