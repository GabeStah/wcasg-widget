import gulp, { dest, series, src } from 'gulp';

gulp.task('export:widget:dashboard', () => {
  try {
    return src('build/widget.base.js').pipe(
      dest('../dashboard/storage/app/widget/')
    );
  } catch (error) {
    throw error;
  }
});

gulp.task('postbuild', series('export:widget:dashboard'));

export default gulp;
