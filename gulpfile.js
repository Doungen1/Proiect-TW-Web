const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

gulp.task('scss', function() {
  return gulp.src(global.folderScss + '/**/*.scss')  // Sursa fișierelor .scss
    .pipe(sass())  // Compilează .scss în .css
    .pipe(gulp.dest(global.folderCss));  // Salvează .css în destinație
});

gulp.task('watch', function() {
  gulp.watch(global.folderScss + '/**/*.scss', gulp.series('scss'));  // Urmărește modificările și compilează automat
});
