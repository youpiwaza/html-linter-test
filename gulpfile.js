const { dest, parallel, series, src, task, watch } 	= require('gulp'),
      colors    = require('ansi-colors'),
      fancyLog  = require('fancy-log'),
      htmllint  = require('gulp-htmllint')
;

task('default', function() {
    return src('src/index.html')
    .pipe(htmllint(
        // lint success
        fancyLog(colors.green('HTML is clean :)')),
        // lint fail
        htmllintReporter
    ));
});

function htmllintReporter(filepath, issues) {
    if (issues.length > 0) {
        issues.forEach(function (issue) {
            fancyLog(colors.cyan('[gulp-htmllint] ') + colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + colors.red('(' + issue.code + ') ' + issue.msg));
        });
        process.exitCode = 1;
    }
}
