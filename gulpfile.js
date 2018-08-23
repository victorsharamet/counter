var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var del = require('del');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var less = require('gulp-less');
var pug = require('gulp-pug');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var htmlbeautify = require('gulp-html-beautify');

// HTML, CSS, JS
var usemin = require('gulp-usemin');
var htmlclean = require('gulp-htmlclean');
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-minify-css");

gulp.task('server', function() {
	browserSync.init({
		server: { baseDir: './build/'}
	});

	watch('./src/pug/**/*.*', function(){
		gulp.start('pug');
	});

	watch('./src/less/**/*.less', function(){
		gulp.start('styles');
	});

	watch('./src/js/**/*.js', function(){
		gulp.start('copy:js');
	});	
});

gulp.task('styles', function() {
	return gulp.src('./src/less/main.less')
	.pipe(plumber({
		errorHandler: notify.onError(function(err){
			return {
				title: 'Styles',
				sound: false,
				message: err.message
			}
		})
	}))
	.pipe(sourcemaps.init())
	.pipe(less())
	.pipe(autoprefixer({
		browsers: ['last 6 versions'],
		cascade: false
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./build/css'))
	.pipe(browserSync.stream());
});

gulp.task('pug', function() {
	return gulp.src('./src/pug/**/*.pug')
	.pipe(plumber({
		errorHandler: notify.onError(function(err){
			return {
				title: 'Pug',
				sound: false,
				message: err.message
			}
		})
	}))
	.pipe(pug())
	.pipe(htmlbeautify(htmlbeautifyOptions))
	.pipe(gulp.dest('./build'))
	.pipe(browserSync.stream());
});

var htmlbeautifyOptions = {
	"indent_size": 1,
	"indent_char": "	",
	"eol": "\n",
	"indent_level": 0,
	"indent_with_tabs": true,
	"preserve_newlines": false,
	"max_preserve_newlines": 10,
	"jslint_happy": false,
	"space_after_anon_function": false,
	"brace_style": "collapse",
	"keep_array_indentation": false,
	"keep_function_indentation": false,
	"space_before_conditional": true,
	"break_chained_methods": false,
	"eval_code": false,
	"unescape_strings": false,
	"wrap_line_length": 0,
	"wrap_attributes": "auto",
	"wrap_attributes_indent_size": 4,
	"end_with_newline": false
};

gulp.task('copy:js', function() {
	return gulp.src('./src/js/**/*.*')
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
});

gulp.task('clean:build', function() {
    return del('./build');
});

gulp.task('default', function(callback){
    runSequence(
    	'clean:build',
    	['styles', 'pug', 'copy:js'],
    	'server',
		callback
    )
});