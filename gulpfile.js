var gulp = require('gulp');
var sass  = require('gulp-sass');
var browserSync = require('browser-sync');

/*Writing gulp tasks*/

/*Convert sass to css*/
gulp.task('sass', function(){
	return gulp.src('assets/sass/*.scss')
	   .pipe(sass())
	   .pipe(gulp.dest('assets/css'))
	   .pipe(browserSync.reload({
	   	   stream: true
	   }))
});

// gulp.task('browserSync', function(){
// 	browserSync({
// 		server: {
// 			baseDir: 'app'
// 		},
// 		browser: "google chrome",
// 	})
// })

gulp.task('watch', ['sass'], function(){
	gulp.watch('assets/sass/*.scss', ['sass']);
});	