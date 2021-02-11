const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const jsdoc = require('gulp-jsdoc3');
const eslint = require('gulp-eslint');

// eslint
gulp.task('eslint', () => {
    return gulp.src(['./js/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// jsdoc 3
gulp.task('doc', function (cb) {
    gulp.src('./js/**/*.js')
        .pipe(jsdoc(cb));
});

// sass compile + browsersync injection
gulp.task('sass', function () {
    return gulp.src("./sass/*.sass")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

// browsersync + sass compile
gulp.task('serve', function () {

    browserSync.init({
        server: "./."
    });

    gulp.watch("./sass/**/*.sass", gulp.series(['sass']));
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// Default tasks
gulp.task('default', gulp.series(['serve'], 'sass', 'eslint'));
