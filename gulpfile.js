var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var concat = require('gulp-concat');


// DEVELOPMENT
gulp.task('dev', ['html', 'js', 'sass', 'fonts', 'images', 'serve']);

// BUILD
gulp.task('build', ['html', 'js', 'sass', 'assets']);

// TASKS
gulp.task('html', function () {
  return gulp.src('./src/*.html').pipe(gulp.dest('./build'));
});

gulp.task('js', function () {
  return gulp
    .src([
      './node_modules/jquery/dist/jquery.js',
      './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',      
      './src/index.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('index.js'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build'));
});

gulp.task('sass', function () {
  var autoprefixerConfig = {
    browsers: [
      'Chrome >= 56',
      'Safari >= 10',
      'Opera >= 45',
      'Explorer >= 11',
      'Firefox >= 51',
      'Edge >= 12'
    ]
  };

  return gulp
    .src(['./src/styles.scss', './src/scss/**/*.scss'])
    .pipe(
      plumber(function (err) {
        notify({
          title: 'Styles Error',
          message: err.message
        }).write(err);
        this.emit('end');
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerConfig))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
  return gulp
    .src('./src/assets/fonts/*.+(eot|svg|ttf|woff|woff2)')
    .pipe(gulp.dest('./build/assets/fonts/'));
});

gulp.task('images', function () {
  return gulp
    .src('./src/assets/img/*.+(png|jpg|jpeg|svg)')
    .pipe(gulp.dest('./build/assets/img'));
});


gulp.task('assets', function () {
  return gulp.src('./src/assets/**/*').pipe(gulp.dest('./build/assets'));
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: 'build'
    }
    // proxy: "http://0.0.0.0:8000"
  });

  gulp.watch('./src/assets/fonts/*.{eot,svg,ttf,woff,woff2}', ['fonts']);
  gulp.watch('./src/assets/img/*.{png, jpg, jpeg, svg}', ['images']);
  gulp.watch(['./src/scss/**/*.scss', './src/styles.scss'], ['sass']);
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/index.js', ['js']);
  gulp.watch('./build/**/*.{html, js}').on('change', browserSync.reload);
  gulp.watch("./partials/*.twig").on('change', browserSync.reload);
});
