// Gulpfile
// ========

// Load Pathes
var sassSrc = [
  'src/scss/**/*.scss',
  'src/scss/**/*.sass'
];
var cssCompiler = 'rubysass';

// Directory Routing
var targetDirBase    = 'dist/';
var targetDirCSS     = 'dist/assets/css/';
var targetDirCSSImg  = 'dist/assets/images/';
var targetDirJS      = 'dist/assets/js/';

// Init grunt
var gulp = require('gulp');

// Set the Task Variables
var path        = require('path'),
    rubysass    = require('gulp-ruby-sass'),
    browserSync = require('browser-sync'),
    prefix      = require('gulp-autoprefixer'),
    plumber     = require('gulp-plumber'),
    header      = require('gulp-header'),
    notify      = require('gulp-notify'),
    bump        = require('gulp-bump'),
    changed     = require('gulp-changed');

// Ruby SASS
gulp.task('rubysass', function () {
  gulp.src(sassSrc)
    .pipe(plumber())
    .pipe(rubysass({
      sourcemap    : false,
      style        : 'nested',
      precision    : 6
    }))
    .on("error", notify.onError("Sass Compile Error!"))
    .pipe(prefix("last 2 version", "> 1%", "ie 9", "chrome 30", "firefox 24"))
    .pipe(gulp.dest(targetDirCSS));
});


// Browser Sync Task
gulp.task('browser-sync', function() {
  browserSync.init([
    targetDirCSS +'**/*.css',
    targetDirBase + '**/*.{html,php}',
    targetDirCSSImg + '**/*.{jpg,gif,png,svg}',
    targetDirJS + '**/*.js'],
  { options: {
      debugInfo: true,
      watchTask: true,
      // proxy: 'domain',
      ghostMode: {
        clicks : true,
        scroll : true,
        links  : true,
        forms  : true }
    },
    server: {
      baseDir  : 'dist/'
    },
    open: true
  });
});


// Starting Task for the first Build off the Project Structure
gulp.task('init', [

]);

// Default Task - start the Watch Tasks for SASS,
// JADE, JS and activate the Browser Watch
gulp.task('watch-bin', function() {

  // Watch the SCSS Folder for changes - compile CSS
  gulp.watch(['src/sass/**/*.scss','src/sass/**/*.sass'], [cssCompiler]);

});

// Default gulp Task 'gulp' - watch the Binarys Directory, start the compile and browser-sync
gulp.task('default', ['browser-sync', 'watch-bin']);
