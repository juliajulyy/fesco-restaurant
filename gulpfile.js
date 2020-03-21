const gulp 				= require('gulp'),
			sass 				= require('gulp-sass'),
			browserSync = require('browser-sync'),
			imagemin 		= require('gulp-imagemin'),
			cleanDir 		= require('gulp-clean-dir'),
			cssMin 			= require('gulp-cssmin');

gulp.task('sass', () =>
	gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(cssMin())
		.pipe(gulp.dest('docs/css'))
		.pipe(browserSync.reload({stream: true}))
);

gulp.task('browser-sync', () =>
	browserSync({
		server: {
			baseDir: 'docs'
		},
		notify: false
	})
);

gulp.task('html', () => 
	gulp.src('app/*.html')
		.pipe(gulp.dest('docs'))
		.pipe(browserSync.reload({stream: true}))
);

gulp.task('img-min', () =>
	gulp.src('app/img/*')
	  .pipe(imagemin())
	  .pipe(gulp.dest('docs/img'))
	  .pipe(browserSync.reload({stream: true}))
);

gulp.task('font', () =>
	gulp.src('app/fonts/*')
	  .pipe(gulp.dest('docs/fonts'))
	  .pipe(browserSync.reload({stream: true}))
);

gulp.task('watch', () => {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('sass')); 
	gulp.watch('app/*.html', gulp.parallel('html'));
});

gulp.task('cleanDir', () =>
	gulp.src('docs', {read: false})
  	.pipe(cleanDir('./docs'))
);

const defaultTask = () => gulp.parallel(
	'sass', 
	'img-min',
	'font',
	'html', 
	'browser-sync', 
	'watch'
);

gulp.task('default', gulp.series('cleanDir', defaultTask()));