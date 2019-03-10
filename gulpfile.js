// импортируем gulp (механизм зависимостей node.js)
// series - для реализации последовательности тасков
// watch - следит за изменениями в файлах
// const { src, dest, task, series, watch, parallel } = require("gulp"); 
const gulp = require('gulp'); 


// Создаем доп переменную, куда запихиваем все файлы .scss, кроме main.scss
// т.к. если добавляем, то получаем зацикливание 
//const SRC_DIR = ['!./src/CSS/**/main.scss', './src/CSS/**/*.scss'];

// Подключение плагинов
const rm = require("gulp-rm");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const pxInrem = require("gulp-smile-px2rem");
const gcmq = require("gulp-group-css-media-queries");
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const svgo = require("gulp-svgo");
const svgSprite = require("gulp-svg-sprites");
const filter = require("gulp-filter");
const svgmin = require("gulp-svgmin");

sass.compiler = require("node-sass");

// Сначала необходимо очистить папку dist, чтобы там не оставались неиспользуемые файлы.
// pipe - передача содержимого от одного файла к другому
gulp.task("clean", () => {
  return gulp.src("dist/**/*", { read: false }).pipe(rm());
});

// Чтобы файлы .html не класть вручную в папку dist каждый раз при её удалении
// заставим gulp копировать их туда автоматом
gulp.task("copy:html", () => {
  return gulp.src("src/*.html")              // src - читает содержимое папок,
  .pipe(gulp.dest("dist"))                   // куда сохранять
  .pipe(reload({ stream: true }));      // используем внутри потока (должен быть самымм последним)
});


gulp.task("styles", () => {
  return gulp.src("./src/CSS/**/main.scss")
  .pipe(sourcemaps.init())
  .pipe(sassGlob())
  .pipe(concat("main.scss"))
  .pipe(sass().on("error", sass.logError))
  //.pipe(rename("main.min.css"))
  //.pipe(pxInrem)
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: true
   }))
  .pipe(gcmq())
  .pipe(plumber())
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest("dist/CSS/"))
  .pipe(reload({stream:true}))
});


gulp.task("copy:fonts", () => {
  return gulp.src("./src/fonts/**/*")
  .pipe(gulp.dest("dist/fonts/"))
});

gulp.task("copy:images", () => {
  return gulp.src(["./src/img/**/*.*", "!./src/img/**/*.svg"])
  .pipe(gulp.dest("dist/img/"))
});

gulp.task("copy:video", () => {
  return gulp.src("./src/video/**/*.*")
  .pipe(gulp.dest("dist/video/"))
});

gulp.task("scripts", () => {
  return gulp.src("./src/js__scripts/**/*.js")
  .pipe(sourcemaps.init())
  .pipe(concat("main.js", {newLine: ";"}))        // склеиваем в один файл и ставим ; перед содержимым каждого файла
  //.pipe(uglify())                                 // сжимаем наш JS
  .pipe(sourcemaps.write("."))
  // .pipe(babel({
  //   presets: ['@babel/env']
  // }))
  .pipe(gulp.dest("dist/js__scripts/"))
  .pipe(reload({stream:true}))
});

gulp.task("svg", () => {
  return gulp.src("./src/img/icons/*.svg")
  .pipe(svgmin({
      js2svg: {
        pretty: true
      },
      plugins: []  
  }))
  .pipe(svgo({
      plugins: [
        {
          removeAttrs: { attrs: "(fill|stroke|style|width|height|data.*)"}
        }
      ]
    })
  )
  .pipe(svgSprite({
      svg: {
        sprite: "./sprite.svg"
      }
  }))
  .pipe(filter("**/*.svg"))
  .pipe(gulp.dest("dist/img/"))
});


gulp.task("server", () => {
  browserSync.init({
      server: {
          baseDir: "./dist",             // передача настроек в директорию dist
          index: "startpage.html"
      },
      //open: false           // чтобы при каждой загрузке браузера окно обновлялось, а не загружалось новое
  });
});


// Если в файлах данного таска ппроизошли изменения, то сразу обновляемся
gulp.task("watch", () => {
  gulp.watch("./src/*.html", gulp.series("copy:html"));
  gulp.watch("./src/CSS/**/*.scss", gulp.series("styles"));
  gulp.watch("./src/fonts/**/*", gulp.series("copy:fonts"));
  gulp.watch("./src/img/**/*", gulp.series("copy:images"));
  gulp.watch("./src/video/**/*", gulp.series("copy:video"));
  gulp.watch("./src/js__scripts/**/*.js", gulp.series("scripts"));
});

// Дефолтный таск. Вызывается при команде "npm run gulp"
gulp.task("default", gulp.series(
  "clean", 
  "svg",
  gulp.parallel("copy:html", "styles", "copy:fonts", "copy:images", "copy:video", "scripts"),
  gulp.parallel("watch", "server")
  )
);