var gulp = require('gulp');
var eslint = require('gulp-eslint');
var webpack = require("gulp-webpack");
var babel = require('gulp-babel');

gulp.task('eslint', function () {
  return gulp.src(['src/**', 'docs/src/**/*.{js,jsx}'])
    // eslint() attaches the lint output to the eslint property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failOnError last.
    .pipe(eslint.failOnError());
});

gulp.task('webpack', function() {
  return gulp.src('lib/index.js')
    .pipe(webpack())
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', function() {
  return gulp.src('src/index.js')
    .pipe(babel({
        presets: ['es2015']
     }))
    .pipe(gulp.dest('lib'));
});
