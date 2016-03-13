var gulp = require("gulp"),
	sass = require("gulp-sass"),
	concat = require("gulp-concat"),
	watch = require("gulp-watch"),
	plumber = require("gulp-plumber"),
	minify = require("gulp-minify-css"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
    connect = require("gulp-connect"),
    open = require("gulp-open"),
	autoprefixer = require("gulp-autoprefixer"),
    browserify = require("browserify"),
    babelify = require("babelify"),
    source = require("vinyl-source-stream"),
    port = process.env.port || 8008;
var dest_css = "./css/dist/";
var src_scss = "./css/*.scss";
var dest_jsx = "./js/dist/";
var src_jsx = "./js/*.jsx";
var src_js = "./js/*.js";
var src_js_components = "./js/components/*.js";

gulp.task('scss',function() {
	gulp.src(src_scss)

	.pipe(plumber())
	.pipe(sass()).pipe(gulp.dest(dest_css))
	.pipe(autoprefixer({
            browsers: [
                '> 1%',
                'last 2 versions',
                'firefox >= 4',
                'safari 7',
                'safari 8',
                'IE 8',
                'IE 9',
                'IE 10',
                'IE 11'
            ],
            cascade: false
        }
        ))
	.pipe(minify())
	.pipe(rename({
		extname : ".min.css"
	}))
	.pipe(gulp.dest(dest_css))
    .pipe(connect.reload());
});
gulp.task('react', function () {
    browserify({
        entries: ['./js/main.jsx'],
        extensions: ['.jsx'],
        debug: true
    })
        .transform(babelify)
        .bundle()

        .pipe(source('main.js'))
        .pipe(gulp.dest(dest_jsx))
        .pipe(connect.reload());
});
//launch browser in port
gulp.task('open',function(){
   var options = {
       url: 'http://localhost:' + port ,
   };
    gulp.src('panel.html')
    .pipe(open('',options));
});
//live reload
gulp.task('connect', function(){
    connect.server({
        root : './',
        port:port ,
        livereload : true

    });
});
// reload js
gulp.task('js',function(){
    gulp.src(src_js)
    .pipe(connect.reload());
});
//reload html
gulp.task('html',function(){
    gulp.src('*.html')
    .pipe(connect.reload());
});
//reload css
gulp.task('css',function(){
    gulp.src('./css/*.css')
    .pipe(connect.reload());
});
//watchers
gulp.task('watch',function(){
    gulp.watch('./js/*.jsx',['react']);
    gulp.watch('*.html',['html']);
    gulp.watch(src_js,['js']);
    gulp.watch(src_js_components,['react']);
    gulp.watch(src_scss,['scss']);
    gulp.watch('./css/*.css',['css'])
});
gulp.task('rs',['react','scss']);
gulp.task('default',['react','scss','connect','open','watch']);