/*jshint strict: false */

import gulp from 'gulp';
import * as paths from './paths';
import svgConcat from './svg-json';
import svgMin from 'gulp-svgmin';
import debug from 'gulp-debug';
 
gulp.task('build-icons', function () {
    gulp.src(paths.iconFiles)
    .pipe(debug())
    .pipe(svgMin())
    .pipe(svgConcat('icons.json'))
    .pipe(gulp.dest('./app/controls/icons/'));
});

