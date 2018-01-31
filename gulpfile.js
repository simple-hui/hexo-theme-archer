const gulp = require('gulp'),
  webpack = require('webpack'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create()

/* ========== develop ========== */

// webpack
gulp.task('webpack', function (cb) {
  webpack(require('./webpack.config.js'), function (err) {
    if (err) return cb(err)
    cb()
  })
})

// sass
gulp.task('sass', function () {
  return gulp.src('./src/scss/style.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./source/css/'))
})

// browser-sync
// watch js
gulp.task('reload-js', ['webpack'], function (done) {
  browserSync.reload()
  done()
})
// watch sass
gulp.task('reload-css', ['sass'], function (done) {
  browserSync.reload()
  done()
})
// watch layout
gulp.task('reload-layout', function (done) {
  browserSync.reload()
  done()
})
// watch _config
gulp.task('reload-config', function (done) {
  browserSync.reload()
  done()
})

gulp.task('dev', ['webpack', 'sass'], function () {
  browserSync.init({
    proxy: 'localhost:4000'
  })
  gulp.watch(['./src/js/**/*.js'], ['reload-js'])
  gulp.watch(['./src/scss/**/*.scss'], ['reload-css'])
  gulp.watch(['./layout/**/*.ejs'], ['reload-layout'])
  gulp.watch(['./_config.yml'], ['reload-config'])
})


/* ========== bulid ========== */

// uglify
gulp.task('uglify-js', ['webpack'], function () {
  return gulp.src('./source/scripts/main.js').pipe(uglify())
    .pipe(gulp.dest('./source/scripts/'))
})

gulp.task('build', ['sass', 'uglify-js'])