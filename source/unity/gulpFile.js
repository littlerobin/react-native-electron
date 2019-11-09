const gulp = require('gulp');
const ws = require('./ws');

gulp.task('serve', function () {

  // Start browser process
  ws();
});

gulp.task('default', [ 'serve' ]);
