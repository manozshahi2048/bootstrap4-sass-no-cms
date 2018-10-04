/*
|--------------------------------------------------------------------------
| Elixir Asset Management
|--------------------------------------------------------------------------
|
| Elixir provides a clean, fluent API for defining some basic Gulp tasks
| for your Laravel application. By default, we are compiling the Less
| file for our application, as well as publishing vendor resources.
|
| Documentation and install instructions available here: https://laravel.com/docs/5.2/elixir#installation 
*/

var gulp = require('gulp');
var combineMq = require('gulp-combine-mq');

var elixir = require('laravel-elixir');

/* Update path to compiled assets */
elixir.config.publicPath = 'assets/compiled';

/* Update path to pre-compiled assets*/
elixir.config.assetsPath = 'assets/';

/* Update autoprefix settings */
elixir.config.css.autoprefix.options.browsers.push("last 5 versions");

elixir(function(mix) {

    mix.sass('main.scss','assets/compiled/css/style.css');

    mix.scripts([
        '../../node_modules/jquery/dist/jquery.min.js',
        '../../node_modules/popper.js/dist/umd/popper.min.js',
        '../../node_modules/bootstrap/dist/js/bootstrap.min.js',
        'plugins',
    ], 'assets/compiled/js/plugins.js');

    mix.scripts([
        'custom',
    ], 'assets/compiled/js/scripts.js');
});

gulp.task('combineMq', function() {
    return gulp.src('assets/compiled/css/style.css')
    .pipe(combineMq({
        beautify: true
    }))
    .pipe(gulp.dest('assets/compiled/css/'));
});

gulp.task('clean', ['combineMq']);