var path = require("path");
var webpack = require("webpack");

module.exports = {
  // This is the main file that should include all other JS files
  entry: {
    main: './src/jsx/main.jsx',
    view: './src/jsx/view.jsx'
  },
  target: "web",
  devtool: 'inline-source-map',
  debug: true,
  // We are watching in the gulp.watch, so tell webpack not to watch
  watch: false,
  // watchDelay: 300,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "scripts/[name]-bundled.js"
  },
  resolve: {
    // Tell webpack to look for required files in bower and node
    modulesDirectories: ['bower_components', 'node_modules'],
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: "jsx-loader" }
    ],
    noParse: /\.min\.js/
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      _: "underscore"
    })
    // If you want to minify everything
    // new webpack.optimize.UglifyJsPlugin()
  ]
};
