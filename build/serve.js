/*jshint strict: false */

import gulp from 'gulp';
import browserSync from 'browser-sync';
import paths from './paths';

gulp.task('serve', ['build-all'], function(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });     
});

gulp.task('serve:watch', ['serve'], function(){
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch(paths.sourceTemplates, ['copy-app-html']).on('change', browserSync.reload);
    gulp.watch(paths.sourceSass, ['build-app-sass']).on('change', browserSync.reload);
    gulp.watch(paths.sassFiles, ['build-styles-sass']).on('change', browserSync.reload);
    gulp.watch(paths.sourceFiles, ['build-js', 'build-icons']).on('change', browserSync.reload);
});