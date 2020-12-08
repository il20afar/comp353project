"use strict";

const gulp = require("gulp");
const inlinesource = require("gulp-inline-source");
const replace = require("gulp-replace");

var sass = require("gulp-sass");
sass.compiler = require("node-sass");

gulp.task("default", () => {
  return gulp
    .src("./build/*.html")
    .pipe(replace('.js"></script>', '.js" inline></script>'))
    .pipe(replace('rel="stylesheet">', 'rel="stylesheet" inline>'))
    .pipe(
      inlinesource({
        compress: false,
        ignore: ["png"],
      })
    )
    .pipe(gulp.dest("./build"));
});

gulp.task("sass", function () {
  return gulp
    .src("./sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css"));
});

gulp.task("sass:watch", function () {
  gulp.watch("./sass/**/*.scss", ["sass"]);
});
