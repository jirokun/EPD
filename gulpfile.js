var gulp = require('gulp');
var webpack = require("webpack")
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('event-stream').merge;
var run = require('gulp-run');

gulp.task('build', ['copy', 'sass', 'webpack']);

gulp.task('webpack', function (callback) {
  var webpackConfig = require("./webpack.config.js");
  webpack(webpackConfig, function(err, stats) {
    if (err) throw new gutil.PluginError("execWebpack", err);
    gutil.log("[execWebpack]", stats.toString({colors: true}));
  });
  connect.reload();
  callback();
});

gulp.task('sass', function() {
  gulp.src('./src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/styles/'))
    .pipe(connect.reload());

});

gulp.task('copy', function () {
  merge(
    gulp.src('./src/www/**/*').pipe(gulp.dest('./dist/')),
    gulp.src('./node_modules/jquery/dist/jquery.min.js').pipe(gulp.dest('./dist/scripts/')),
    gulp.src('./bower_components/handsontable/dist/handsontable.full.js').pipe(gulp.dest('./dist/scripts/')),
    gulp.src('./bower_components/handsontable/dist/handsontable.full.min.css').pipe(gulp.dest('./dist/styles/')),
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css').pipe(gulp.dest('./dist/styles/')),
    gulp.src('./node_modules/bootstrap/dist/fonts/*').pipe(gulp.dest('./dist/fonts/')),
    gulp.src('./main.js').pipe(gulp.dest('./dist/')),
    gulp.src('./package.json').pipe(gulp.dest('./dist/'))
  ).pipe(connect.reload());
});

gulp.task('package', ['build'], function() {
  return run('electron-packager dist/ epd --overwrite --platform=win32,darwin --arch=x64 --version=0.30.0').exec();
});

gulp.task('watch', function () {
  gulp.watch('./src/scss/*.scss', ['sass']);
  gulp.watch('./src/**/*.jsx', ['webpack']);
  gulp.watch('./src/www/**/*', ['copy']);
  gulp.watch('./dist/scripts/*-bundled.js', function(changedFile) {
    gulp.src(changedFile.path).pipe(connect.reload());
  });
});

gulp.task('serve', function(){
  connect.server({
    root: './dist',
    livereload: true
  });
});
gulp.task('default', ['build', 'watch', 'serve']);
