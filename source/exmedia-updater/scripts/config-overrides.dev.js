const CopyWebpackPlugin = require('copy-webpack-plugin');
const rewireDecorators = require("react-app-rewire-decorators-legacy");
const paths = require('./paths');

module.exports = function(config) {
  config = rewireDecorators(config);

  const target = process.env.TARGET === 'electron' ? 'electron-main' : 'web'; // web => 'web', electron => 'electron-main'
  // Use your own ESLint file
  const eslintLoader = config.module.rules[0];
  eslintLoader.use[0].options.useEslintrc = true;

  // Add the SASS loader second-to-last
  // (last one must remain as the "file-loader")
  const loaderList = config.module.rules[1].oneOf;

  // Update limit load assets
  loaderList[0].options.limit = 30000;

  // enable minify node_modules
  paths.then((pathResult) => {
    loaderList[1].include = [loaderList[1].include]
      .concat(pathResult);
  });

  // add custom env define plugin
  config.plugins[3].definitions['process.env'].ASSETS_DIR = `"./assets"`;

  config.plugins = config.plugins.concat([
    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' },
    ]),
  ]);

  config.target = target;
};
