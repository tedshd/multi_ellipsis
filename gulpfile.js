var gulp = require('gulp'),
    compass = require('gulp-compass'),
    watch = require('gulp-watch');

gulp.task('default', function() {
    gulp.run('compass');

    gulp.watch([
        './sass/**'
        ], function(event) {
        gulp.run('compass');
    });
});

gulp.task('compass', function() {
    gulp.src('./sass/*.scss')
    .pipe(compass({
        comments: false,
        css: 'css', // css folder
        sass: 'sass', // scss folder
    }));
});
