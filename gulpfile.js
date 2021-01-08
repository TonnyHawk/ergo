let {src, dest, series, parallel, watch} = require('gulp'),
   sass = require('gulp-sass'),
   browserSync = require('browser-sync').create(),
   fileinclude = require('gulp-file-include'),
   rename = require('gulp-rename'),
   sourcemaps = require('gulp-sourcemaps'),
   autoprefixer = require('gulp-autoprefixer'),
   groupCssMedia = require('gulp-group-css-media-queries'),
   minifiCss = require('gulp-cssnano');

let sourceFold = '#src';

let scssEntryFile = 'main.scss';

let path = {
   src: {
      styles: sourceFold + '/styles/',
      css: sourceFold + '/css/',
      html: sourceFold + '/base-index.html',
   }
}

function browsersync(){
   browserSync.init({
      server: {
          baseDir: "./" + sourceFold + '/',
          notify: false
      }
  });
}

function css(){
   return src(path.src.styles + scssEntryFile)
         .pipe(sourcemaps.init())
         .pipe(sass().on('error', sass.logError))
         .pipe(autoprefixer(['last 5 versions'])) // добавляем вендорные префиксы
         .pipe(groupCssMedia())
         .pipe(minifiCss())
         .pipe(sourcemaps.write())
         .pipe(rename('main.min.css'))
         .pipe(dest(path.src.css))
         .pipe(browserSync.stream())
}

function html(){
   return src(path.src.html)
      .pipe(fileinclude())
      .pipe(rename('index.html'))
      .pipe(dest(sourceFold + '/'))
}

function watchFiles(){
   watch(sourceFold + '/**/*.scss', css);
   watch([sourceFold + "/**/*.html", "!"+sourceFold + '/index.html']).on("change", series(html, browserSync.reload));
}

let build = parallel(series(css, html, browsersync), watchFiles);

exports.default = build;
exports.css = series(css);