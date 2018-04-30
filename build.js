const Program = require('commander');
const Chalk = require('chalk');
const fs = require('fs');
const fsExtra = require('fs-extra');
const Path = require('path');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const sass = require('node-sass');
const babelify = require("babelify");
const browserify = require("browserify");
const Promise = require('bluebird');
const UglifyCss = require('uglifycss');
const UglifyJs = require('uglify-es');

// Various variables
const rootPath = __dirname.replace('/build', '').replace('\\build', '');
// The settings
const options = require('./package.json');
const cleaner = postcss([autoprefixer({ add: false, browsers: options.settings.browsers })]);
const prefixer = postcss([autoprefixer]);

//###################################################################

const compileJS = (element) => {
  const b = browserify();
  const c = browserify();

  // Copy the ES6 file
  let es6File = fs.readFileSync(rootPath + '/src/js/' + element + '/' + element + '.js', "utf8");

  // Do the css switch
  if (fs.existsSync(`${rootPath}/src/css/${element}/${element}.css`)) {
    const elementCss = fs.readFileSync(`${rootPath}/src/css/${element}/${element}.css`, "utf8");
    es6File = es6File.replace('{{stylesheet}}', elementCss);
  }


  fs.writeFileSync(`${rootPath}/dist/js/${options.settings.prefix}-${element}.js`, es6File, { encoding: "utf8" });

  // And the minified version
  fs.writeFileSync(`${rootPath}/dist/js/${options.settings.prefix}-${element}.min.js`, UglifyJs.minify(es6File).code, { encoding: "utf8" });
  // UglifyJS.minify(es6File).code, { encoding: "utf8" });

  // Transpile a copy for ES5
  fs.writeFileSync(`${rootPath}/dist/js/${options.settings.prefix}-${element}-es5.js`, '');
  const bundleFs = fs.createWriteStream(`${rootPath}/dist/js/${options.settings.prefix}-${element}-es5.js`);
  const bundleFsMin = fs.createWriteStream(`${rootPath}/dist/js/${options.settings.prefix}-${element}-es5.min.js`);

  b.add(`${rootPath}/dist/js/${options.settings.prefix}-${element}.js`);
  c.add(`${rootPath}/dist/js/${options.settings.prefix}-${element}.js`);
  b.transform(babelify, { presets: ["babel-preset-es2015"] }).bundle().pipe(bundleFs);
  c.transform(babelify, { presets: ["babel-preset-es2015", "babel-preset-minify"] }).bundle().pipe(bundleFsMin);

  console.log(Chalk.yellow('Custom Element: joomla-' + element + ' was packaged.'));
}
// Make sure that the dist paths exist
if (!fs.existsSync(rootPath + '/dist')) {
  fsExtra.mkdirSync(rootPath + '/dist');
}
if (!fs.existsSync(rootPath + '/dist/js')) {
  fsExtra.mkdirSync(rootPath + '/dist/js');
}
if (!fs.existsSync(rootPath + '/src/css')) {
  fsExtra.mkdirSync(rootPath + '/src/css');
}

options.settings.elements.forEach(element => {
  if (fs.existsSync(`${rootPath}/src/scss/${element}/${element}.scss`)) {
    if (!fs.existsSync(rootPath + '/src/css/' + element)) {
      fsExtra.mkdirSync(rootPath + '/src/css/' + element);
    }

    sass.render({
      file: rootPath + '/src/scss/' + element + '/' + element + '.scss',
      outFile: rootPath + '/src/css/' + element + '/' + element + '.css',
    }, function (error, result) {
      if (error) {
        console.log(error.column);
        console.log(error.message);
        console.log(error.line);
      } else {
        // Auto prefixing
        console.log(`Prefixing ${element}.css for: ${options.settings.browsers}`);

        cleaner.process(result.css.toString(), { from: `undefined` }).then((cleaned) => {

          prefixer.process(cleaned.css, { from: `undefined` }).then((final) => {
            // Write the normal file
            const UglifyCss = require('uglifycss');
            fs.writeFile(rootPath + '/src/css/' + element + '/' + element + '.css', UglifyCss.processString(final.css.toString()), function (err) {
              if (!err) {
                compileJS(element);

                fsExtra.emptyDirSync(`${rootPath}/src/css/${element}`);
                fsExtra.rmdirSync(`${rootPath}/src/css/${element}`);

                fs.readdir(`${rootPath}/src/css`, function (err, files) {
                  if (err) {
                    // some sort of error
                  } else {
                    if (!files.length) {
                      // directory appears to be empty
                      fsExtra.rmdirSync(`${rootPath}/src/css`)
                    }
                  }
                });
              }
            });
          });
        });
      }
    });
  } else {
    compileJS(element);
    fsExtra.emptyDirSync(`${rootPath}/src/css/${element}`);
    fsExtra.rmdirSync(`${rootPath}/src/css/${element}`);

    fs.readdir(`${rootPath}/src/css`, function (err, files) {
      if (err) {
        // some sort of error
      } else {
        if (!files.length) {
          // directory appears to be empty
          fsExtra.rmdirSync(`${rootPath}/src/css`)
        }
      }
    });
  }
});



