'use strict';

const gulp  = require('gulp'),
    jshint  = require('gulp-jshint'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename'),
    del     = require('del'),
    fs      = require('fs');

const packageJSON = JSON.parse( fs.readFileSync('./package.json') );

const path = {
    source: '../resource-common/melon-pv-logger/src/',
    dest: './build/' + packageJSON.version + '/'
};

gulp.task('default',['clean', 'jshint', 'build'],  function() {
    console.log('gulp default');
});

gulp.task('clean', () => {
    return del([ path.dest ]);
});

gulp.task('jshint', () => {
    return gulp.src( path.source + '**/*.js' )
        .pipe( jshint() )
        .pipe( jshint.reporter('jshint-stylish') );
});

gulp.task('build', ['clean', 'jshint'], () =>
    gulp.src( path.source + 'pvlog.js' )
        .pipe( uglify() )
        .pipe( rename({ suffix: '.min' }) )
        .pipe( gulp.dest( path.dest ) )
);
