/*jshint strict: false */

import gulp from 'gulp';
import * as paths from './paths';
import svgConcat from './svg-json';
import debug from 'gulp-debug';
 
gulp.task('build-icons', function () {
    gulp.src(paths.iconFiles)
    .pipe(debug())
    .pipe(svgConcat('icons.json'));
});

