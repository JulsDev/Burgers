// импортируем gulp (механизм зависимостей node.js)
// series - для реализации последовательности тасков
// watch - следит за изменениями в файлах
const { src, dest, task, series, watch, parallel } = require("gulp"); 

// Создаем доп переменную, куда запихиваем все файлы .scss, кроме main.scss
// т.к. если добавляем, то получаем зацикливание 
const SRC_DIR = ['!src/CSS/main.scss', 'src/CSS/*.scss'];

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

sass.compiler = require("node-sass");

// Сначала необходимо очистить папку dist, чтобы там не оставались неиспользуемые файлы.
// pipe - передача содержимого от одного файла к другому
task("clean", () => {
  return src("dist/**/*", { read: false }).pipe(rm());
});

// Чтобы файлы .html не класть вручную в папку dist каждый раз при её удалении
// заставим gulp копировать их туда автоматом
task("copy:html", () => {
  return src("src/*.html")              // src - читает содержимое папок,
  .pipe(dest("dist"))                   // куда сохранять
  .pipe(reload({ stream: true }));      // используем внутри потока (должен быть самымм последним)
});

// const styles = [
//   "node_modules/normalize.css/normalize.css",
//   "src/CSS/main.scss"
// ];

task("styles", () => {
  return src(SRC_DIR)
  //.pipe(concat("main.scss"))
  .pipe(sourcemaps.init())
  .pipe(sassGlob())
  .pipe(sass().on("error", sass.logError))
  .pipe(rename("main.min.css"))
  //.pipe(pxInrem)
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: true
   }))
  .pipe(gcmq())
  .pipe(plumber())
  .pipe(sourcemaps.write("."))
  .pipe(dest("dist/CSS/"));
});


task("copy:fonts", () => {
  return src("./src/fonts/**/*")
  .pipe(dest("dist/fonts/"))
});

task("copy:images", () => {
  return src(["./src/img/**/*.*", "!./src/img/**/sprite.svg"])
  .pipe(dest("dist/img/"))
});

task("server", () => {
  browserSync.init({
      server: {
          baseDir: "./dist",             // передача настроек в директорию dist
          index: "startpage.html"
      },
      //open: false           // чтобы при каждой загрузке браузера окно обновлялось, а не загружалось новое
  });
});


// Если в файлах данного таска ппроизошли изменения, то сразу обновляемся
task("watch", () => {
  watch("./src/*.html", series("copy:html"));
  watch("./src/CSS/**/*.scss", series("styles"));
  watch("./src/fonts/**/*", series("copy:fonts"));
  watch("./src/img/**/*", series("copy:images"));
});

// Дефолтный таск. Вызывается при команде "npm run gulp"
task("default", series(
  "clean", 
  // "svg",
  parallel("copy:html", "styles", "copy:fonts", "copy:images", "server"),
  parallel("watch", "server")
  )
);