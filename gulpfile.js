const { src, dest, watch, series, parallel } = require("gulp");
const del = require("del"); //For Cleaning build/dist for fresh export
const options = require("./config"); //paths and other options from config.js
const browserSync = require("browser-sync").create();

const sass = require("gulp-sass")(require("sass")); //For Compiling SASS files
const postcss = require("gulp-postcss"); //For Compiling tailwind utilities with tailwind config
const concat = require("gulp-concat"); //For Concatinating js,css files
const uglify = require("gulp-terser"); //To Minify JS files
const cleanCSS = require("gulp-clean-css"); //To Minify CSS files
const purgecss = require("gulp-purgecss"); // Remove Unused CSS from Styles

const pug = require("gulp-pug");
const terser = require("gulp-terser");
const babel = require("gulp-babel");

//Load Previews on Browser on dev
function livePreview(done) {
  browserSync.init({
    server: {
      baseDir: options.paths.dist.base,
    },
    notify: {
      styles: {
        top: "auto",
        bottom: "0",
      },
    },
    port: options.config.port || 5000,
  });
  done();
}

// Triggers Browser reload
function previewReload(done) {
  console.log("\n\t" + logSymbols.info, "Reloading Browser Preview.\n");
  browserSync.reload();
  done();
}

//! DEV: To Convert PUG Files to HTML
function pugTask() {
  return src(`${options.paths.src.base}/pug/index.pug`)
    .pipe(pug({ pretty: true }))
    .pipe(dest(options.paths.src.base));
}

//! DEV: To Copy html file from src to dist folder
function devHTML() {
  return src(`${options.paths.src.base}/**/*.html`).pipe(
    dest(options.paths.dist.base)
  );
}

// JavaScript Task
function jsTask() {
  return src(`${options.paths.src.js}/script.js`, { sourcemaps: true })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(dest(options.paths.dist.js, { sourcemaps: "." }));
}

function devStyles() {
  const tailwindcss = require("tailwindcss");
  return src(`${options.paths.src.css}/**/*.scss`)
    .pipe(sass().on("error", sass.logError))
    .pipe(dest(options.paths.src.css))
    .pipe(
      postcss([tailwindcss(options.config.tailwindjs), require("autoprefixer")])
    )
    .pipe(concat({ path: "style.css" }))
    .pipe(dest(options.paths.dist.css));
}

function watchFiles() {
  watch(
    `${options.paths.src.base}/**/*.pug`,
    series(pugTask, devStyles, previewReload)
  );
  watch(
    [options.config.tailwindjs, `${options.paths.src.css}/**/*.scss`],
    series(devStyles, previewReload)
  );
  watch(`${options.paths.src.js}/**/*.js`, series(jsTask, previewReload));
  watch(`${options.paths.src.img}/**/*`, series(devImages, previewReload));
  console.log("\n\t" + logSymbols.info, "Watching for Changes..\n");
}

function devClean() {
  console.log(
    "\n\t" + logSymbols.info,
    "Cleaning dist folder for fresh start.\n"
  );
  return del([options.paths.dist.base]);
}

//Production Tasks (Optimized Build for Live/Production Sites)
function prodHTML() {
  return src(`${options.paths.src.base}/pug/index.pug`)
    .pipe(pug())
    .pipe(dest(options.paths.build.base));
}

function devStyles() {
  const tailwindcss = require("tailwindcss");
  return src(`${options.paths.src.css}/**/*.scss`)
    .pipe(sass().on("error", sass.logError))
    .pipe(dest(options.paths.src.css))
    .pipe(
      postcss([tailwindcss(options.config.tailwindjs), require("autoprefixer")])
    )
    .pipe(concat({ path: "style.css" }))
    .pipe(dest(options.paths.dist.css));
}

//!    ======= PRODUCTION TASKS BELOW ========

//! PROD: To Copy html file from src to build folder
function prodHTML() {
  return src(`${options.paths.src.base}/**/*.html`).pipe(
    dest(options.paths.base.base)
  );
}

function prodStyles() {
  return src(`${options.paths.src.css}/**/*.css`)
    .pipe(concat({ path: "style.css" }))
    .pipe(
      purgecss({
        content: ["src/**/*.{html,js}"],
        defaultExtractor: (content) => {
          const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
          const innerMatches =
            content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
          return broadMatches.concat(innerMatches);
        },
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest(options.paths.build.css));
}

function prodScripts() {
  return src(`${options.paths.src.js}/**/*.js`)
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(concat({ path: "scripts.js" }))
    .pipe(uglify())
    .pipe(dest(options.paths.build.js));
}

function prodClean() {
  console.log(
    "\n\t" + logSymbols.info,
    "Cleaning build folder for fresh start.\n"
  );
  return del([options.paths.build.base]);
}

exports.default = series(
  devClean, // Clean Dist Folder
  parallel(devStyles, jsTask, pugTask), //Run All tasks in parallel
  livePreview, // Live Preview Build
  watchFiles // Watch for Live Changes
);

exports.build = series(
  prodClean, // Clean Build Folder
  parallel(prodStyles, prodScripts, prodHTML) //Run All tasks in parallel
);
