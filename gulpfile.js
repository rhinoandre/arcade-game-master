const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
browserSync.init({
    server: {
        baseDir: './'
    }
});

gulp.task('default', () => {
    gulp.watch('css/**/*.scss', ['style']);
});

gulp.task('style', () => {
    return gulp.src('css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});