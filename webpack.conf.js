function resolverDir(dir) {
  var path = require("path");
  path = path.join(__dirname, dir);
  console.log(path);
  return path;
}

if (!global.Config) {
  global.Config = require("laravel-mix/src/config")();
}

require("dotenv").config();

const GUTENTAG_PATH =
  process.env.GUTENTAG_PATH || "./kubio-plugin/src/packages";

module.exports = {
  mode: "development",
  externals: {
    jquery: "jQuery",
    wp: "wp",
    _: "_"
  },
  resolve: {
    // symlinks: true,
    alias: {
      "@kubio": resolverDir(GUTENTAG_PATH),
      // because scss is a bit crazy
      "./@kubio": resolverDir(GUTENTAG_PATH)
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "condition-loader",
        options: {
          IS_BUILDING_KUBIO_THEME: "no",
          pro: false,
          internal: false
        }
      },
      {
        test: /(\.(woff2?|ttf|eot|otf)$|font.*\.svg$)/,
        loader: "file-loader",
        options: {
          name: path => {
            if (!/node_modules|bower_components/.test(path)) {
              return Config.fileLoaderDirs.fonts + "/[name].[ext]";
            }

            return Config.fileLoaderDirs.fonts + "/vendor/[name].[ext]";
          },
          publicPath: "./../"
        }
      },

      {
        // only include svg that doesn't have font in the path or file name by using negative lookahead
        test: /(\.(png|jpe?g|gif)$|^((?!font).)*\.svg$)/,
        rules: [
          {
            loader: "file-loader",
            options: {
              name: path => {
                if (!/node_modules|bower_components/.test(path)) {
                  return Config.fileLoaderDirs.images + "/[name].[ext]";
                }

                return (
                  Config.fileLoaderDirs.images +
                  "/vendor/" +
                  path
                    .replace(/\\/g, "/")
                    .replace(
                      /((.*(node_modules|bower_components))|images|image|img|assets)\//g,
                      ""
                    )
                );
              },
              publicPath: "./../"
            }
          },

          {
            loader: "img-loader",
            options: Config.imgLoaderOptions
          }
        ]
      }
    ]
  }
};








