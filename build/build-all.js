/*jshint strict: false */
import gulp from 'gulp';
import gulpsync from 'gulp-sync';

const sync = gulpsync(gulp).sync;

gulp.task('build-all', sync(['build-js', 'build-sass', 'build-icons']));