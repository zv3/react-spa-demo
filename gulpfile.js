/* eslint-disable */
var webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackConfig = require('./webpack.config.js'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    replace = require('gulp-replace'),
    htmlmin = require('gulp-htmlmin'),
    webpack = require('webpack'),
    sass = require('gulp-sass'),
    gulp = require('gulp'),
    path = require('path'),
    fs = require('fs');

var config = {
  server: {
    files: ['build/**/*.html', 'build/**/*.js', 'build/**/*.css'],
    port: process.env.PORT || 3000,
    baseDir: 'build'
  },
  scss: {
    watch: 'src/css/**/*.scss',
    src: ['src/css/app.scss'],
    build: 'build/css',
    dist: 'dist/css'
  },
  fonts: {
    src: ['src/fonts/**/*'],
    build: 'build/fonts',
    dist: 'dist/fonts'
  },
  html: {
    src: 'src/index.html',
    dist: 'dist',
    build: 'build',
    style: {
      dev: 'build/css/app.css',
      prod: 'dist/css/app.css'
    },
    minOptions: {
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true
    }
  }
};

var compiler = webpack(webpackConfig);

gulp.task('serve', function () {
  var useHttps = process.env.SERVER === 'https';

  browserSync({
    files: config.server.files,
    port: config.server.port,
    reloadOnRestart: false,
    logFileChanges: false,
    ghostMode: false,
    https: useHttps,
    open: false,
    ui: false,
    server: {
      baseDir: config.server.baseDir,
      middleware: [
        require('compression')(),
        webpackDevMiddleware(compiler, {
          publicPath: webpackConfig.output.publicPath,
          stats: { colors: true }
        }),
        webpackHotMiddleware(compiler),
      ]
    }
  });
});

gulp.task('sass-watch', function () {
  gulp.watch(config.scss.watch, ['sass-build']);
});

gulp.task('fonts-build', function() {
  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.build))
});

gulp.task('fonts-dist', function() {
  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.dist))
});

gulp.task('sass-build', function () {
  return gulp.src(config.scss.src)
    .pipe(sass({
      includePaths: ['bower_components', 'node_modules'],
      sourceComments: 'map',
      sourceMap: 'sass'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest(config.scss.build));
});

gulp.task('sass-dist', function () {
  return gulp.src(config.scss.src)
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed',
      includePaths: ['bower_components', 'node_modules'],
      sourceMap: 'sass'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest(config.scss.dist))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(config.scss.dist));
});

gulp.task('html-watch', function () {
  gulp.watch([config.html.src, config.html.style.dev], ['html-inject-build']);
});

gulp.task('html-inject-build', ['sass-build'], function () {
  return gulp.src(config.html.src)
    .pipe(replace('<!-- inject:app.css -->', '<style>' + fs.readFileSync(config.html.style.dev, 'utf8') + '</style>'))
    .pipe(gulp.dest(config.html.build));
});

gulp.task('html-inject-dist', ['sass-dist'], function () {
  return gulp.src(config.html.src)
    .pipe(replace('<!-- inject:app.css -->', '<link rel="stylesheet" href="/css/app.css">'))
    .pipe(htmlmin(config.html.minOptions))
    .pipe(gulp.dest(config.html.dist));
});

gulp.task('start', ['sass-watch', 'html-inject-build', 'fonts-build', 'html-watch']);
gulp.task('dist', ['html-inject-dist', 'fonts-dist']);
