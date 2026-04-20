let webpackConf = require("./webpack.conf");

let mix = require("laravel-mix");

let fs = require("fs");
let path = require("path");
let postcss = require("postcss");
let url = require("postcss-url");
let exec = require("child_process").exec;
let spawn = require("child_process").spawn;

const THEME_PREFIX = "monivo";

const prefixer = require("postcss-prefix-selector");

inProduction = () => {
  return process.argv.includes("--env.theme-production") || Mix.inProduction();
};

function resolverDir(dir) {
  var path = require("path");
  path = path.join(__dirname, dir);
  return path;
}

mix.webpackConfig(webpackConf);
Config.uglify = false;

Mix.listen("configReady", webpackConfig => {
  if (Mix.isUsing("hmr")) {
    // Remove leading '/' from entry keys
    webpackConfig.entry = Object.keys(webpackConfig.entry).reduce(
      (entries, entry) => {
        entries[entry.replace(/^\//, "")] = webpackConfig.entry[entry];
        return entries;
      },
      {}
    );

    // Remove leading '/' from ExtractTextPlugin instances
    webpackConfig.plugins.forEach(plugin => {
      if (plugin.constructor.name === "ExtractTextPlugin") {
        plugin.filename = plugin.filename.replace(/^\//, "");
      }
    });
  }
});

const cssOptions = {
  sassOptions: {
    precision: 8,
    outputStyle: "expanded",
    webpackImporter: true
  },
  webpackImporter: true
};

mix
  .setResourceRoot("./")
  .setPublicPath("./resources")

  // theme frontend
  .js("assets/src/theme/js/theme.js", "./theme")
  .sass("assets/src/theme/css/theme.scss", "./theme", cssOptions)
  .sass("assets/src/theme/css/fse-base-style.scss", "./theme", cssOptions)

  //google fonts
  .copyDirectory("assets/src/theme/google-fonts", "./resources/google-fonts")

  // customizer UI
  .js("assets/src/customizer/js/customizer.js", "./customizer")
  .sass("assets/src/customizer/css/customizer.scss", "./customizer", cssOptions)

  // admin UI
  .js("assets/src/admin/js/admin.js", "./admin")
  .vue({ version: 2 })
  .sass("assets/src/admin/css/admin.scss", "./admin")

  // customizer preview
  .js("assets/src/customizer/js/preview.js", "./customizer")
  .sass("assets/src/customizer/css/preview.scss", "./customizer", cssOptions)

  .copy("assets/images", "./resources/images")
  .copy("assets/videos", "./resources/videos")

  .after(stats => {
    generateGoogleFonts();
  });

// .after(stats => doHeaders());

function generateGoogleFonts() {
  const fontsFolder = path.join(__dirname, "./resources/google-fonts");

  const fontListFile = path.join(fontsFolder, "/font-list.json");
  let fontList = JSON.parse(fs.readFileSync(fontListFile));
  let cssFileContent = "";
  Object.keys(fontList).forEach(fontFamily => {
    const fontFaces = fontList[fontFamily].fontFace;
    fontFaces.forEach(fontFace => {
      cssFileContent += getGoogleFontCss(fontFace);
    });
  });

  const cssFile = path.join(fontsFolder, "/style.css");

  fs.writeFileSync(cssFile, cssFileContent);
  console.log("generate google fonts");
}

function getGoogleFontCss(fontFaceData) {
  const {
    fontFamily,
    fontWeight,
    fontStyle,
    src,
    subset,
    unicodeRange
  } = fontFaceData;

  let url = src[0];
  let splited = url.split("/");
  url = splited[splited.length - 1];
  return `@font-face {
    font-family: "${fontFamily}";
    font-style: ${fontStyle};
    font-weight: ${fontWeight};
    font-display: swap;
    src: url("${url}") format("woff2");
    unicode-range: ${unicodeRange};
  }
`;
}

if (!inProduction()) {
  mix.sourceMaps(false);
}

const shouldSkipPrefix = selector => {
  if (selector.indexOf("html") === 0) {
    return true;
  }

  if (selector.indexOf(".kubio-attachment-fixed-support-fallback") !== -1) {
    return true;
  }

  if (selector.indexOf(".kubio-enable-gap-fallback") !== -1) {
    return true;
  }

  return false;
};

Mix.listen("build", () => {
  const path = "./resources/theme/theme.css";

  if (!fs.existsSync(path)) {
    return;
  }

  const css = fs.readFileSync(path, "utf8");
  function applyFixes(selector) {
    return selector
        .replace(/\[data-kubio\] button/g, '[data-kubio] button:where(:not(figure button):not(.wp-block-accordion-heading__toggle):not(.wp-block-navigation-submenu__toggle):not(.wp-block-woocommerce-accordion-header .accordion-item__toggle))')
        .replace(/\[data-kubio\] input\[type=button\]/g, '[data-kubio] input[type=button]:where(:not(figure input[type=button]))');
  }
  postcss()
    .use(
      prefixer({
        prefix: `html.${THEME_PREFIX}-theme`,
        exclude: [],

        // Optional transform callback for case-by-case overrides
        transform: function(prefix, selector, prefixedSelector) {
          if (shouldSkipPrefix(selector)) {
            return "\n" + applyFixes(selector);
          }

          return "\n" + applyFixes(prefixedSelector);
        },
      })
    )
    .use(
      url({
        url: "rebase"
      })
    )
    .process(css, {
      from: "./resources/theme/theme.css",
      to: "./style.css"
    })
    .then(result => {
      fs.writeFileSync("./style.css", result.css);
      if (Mix.inProduction()) {
        fs.unlinkSync("./resources/theme/theme.css");
      }
    });
});

let var_export_json = (data, callback) => {
  let buff = new Buffer(JSON.stringify(data));
  data = buff.toString("base64");

  let phpBaseDecode = "base64_decode('" + data + "')";
  let phpJSONDecode = "json_decode(" + phpBaseDecode + ",true)";

  let tempFileName = path.resolve("./headers-data.php");
  console.log("data file: " + tempFileName);

  fs.writeFileSync(
    tempFileName,
    "<?php file_put_contents('./inc/customizer-headers.php', '<?php return ' . var_export(" +
      phpJSONDecode +
      ", true) . ';');"
  );

  let command = 'php "' + tempFileName + '"';

  console.log("COMMAND : " + command);

  const child = spawn("php", [tempFileName]);
  child.stdout.on("close", function(data) {
    //Here is where the output goes

    if (fs.existsSync(tempFileName)) {
      fs.unlinkSync(tempFileName);
    }

    callback(data);
  });
};

let doHeaders = () => {
  console.log("Start doing headers ...");
  const source = "./assets/headers";

  let defaultData = JSON.parse(
    fs.readFileSync(path.join(source, "defaults.json"))
  );

  var headers = fs.readdirSync(source).filter(function(name) {
    return fs.lstatSync(path.join(source, name)).isDirectory();
  });

  console.log(headers);

  let headersData = [];

  headers.forEach(header => {
    let headerPath = path.join(source, header);
    let headerPathImages = path.join(headerPath, "images");
    let headerData = fs.readFileSync(path.join(headerPath, "header.json"));

    let preview = "preview.jpg";

    if (!fs.existsSync(path.join(headerPath, preview))) {
      preview = "preview.png";
    }

    let headerJSON = JSON.parse(headerData);

    headerJSON = { ...defaultData, ...headerJSON };

    Object.keys(headerJSON).forEach(key => {
      try {
        var unserialized = JSON.parse(
          decodeURIComponent(headerJSON[key].replace(/\+/g, " "))
        );
        headerJSON[key] = unserialized;
      } catch (e) {}
    });

    const defaults = {
      "front-header.hero.style.descendants.outer.background.type": "image"
    };

    Object.keys(defaults).forEach(key => {
      if (!headerJSON[key]) {
        headerJSON[key] = defaults[key];
      }
    });

    headersData.push({
      image: "%s/" + header + "-" + preview,
      data: headerJSON
    });

    if (fs.existsSync(headerPathImages)) {
      console.log("Copy images");
      mix.copy(headerPathImages, "./resources/header-presets/images");
    }

    if (fs.existsSync(path.join(headerPath, preview))) {
      console.log("Copy preview");
      mix.copy(
        path.join(headerPath, preview),
        "./resources/header-presets/previews/" + header + "-" + preview
      );
    }
  });

  var_export_json(headersData, data => {
    console.log("Headers ready");
  });
};

doHeaders();

mix.options({
  uglify: false,
  cleanCss: {
    format: "beautify"
  }
});

// Enable sourcemaps
// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.
// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.fastSass('src', output); <-- Alias for mix.standaloneSass().
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });








