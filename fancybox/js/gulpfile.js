var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    header = require('gulp-header'),
    replace = require('gulp-replace'),
    gutil = require('gulp-util');

var pkg = require('./package.json');
var banner = ['// ==================================================',
    '// fancyBox v${pkg.version}',
    '//',
    '// Licensed GPLv3 for open source use',
    '// or fancyBox Commercial License for commercial use',
    '//',
    '// http://fancyapps.com/fancybox/',
    '// Copyright ${new Date().getFullYear()} fancyApps',
    '//',
    '// ==================================================',
    ''].join('\n');

// Concatenate & Minify JS

gulp.task('scripts', function() {
    return gulp.src([
            'fancybox/js/core.js',
            'fancybox/js/media.js',
            'fancybox/js/guestures.js',
            'fancybox/js/slideshow.js',
            'fancybox/js/fullscreen.js',
            'fancybox/js/thumbs.js',
            'fancybox/js/hash.js',
        ])
        .pipe(concat('jquery.fancybox.js'))
        .pipe(replace(/({fancybox-version})/g, pkg.version))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('dist'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('dist'));
    });


// Compile CSS

gulp.task('css', function() {
    return gulp.src('fancybox/css/*.css') // Gets all files src/css
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(concat('jquery.fancybox.css'))
        .pipe(gulp.dest('dist'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano({zindex: false}))
        .pipe(gulp.dest('dist'));
});

// Default Task
gulp.task('default', ['scripts', 'css']);
