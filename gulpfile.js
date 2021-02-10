var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("./sass/*.sass")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', function () {

    browserSync.init({
        server: "./."
    });

    gulp.watch("./sass/**/*.sass", gulp.series(['sass']));
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// Default tasks
gulp.task('default', gulp.series(['serve'], 'sass'));
