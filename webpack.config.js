webpack = require("webpack");
module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
        library: 'Nadmozg'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
             test: /\.jsx?$/,
             exclude: /(node_modules|bower_components)/,
             loader: 'babel', // 'babel-loader' is also a legal name to reference
             query: {
               presets: ['react', 'es2015']
             }
           }
        ]
    },
  //  plugins: [
  //                  new webpack.optimize.UglifyJsPlugin()
  //              ],
    //watch: true,
    //progress: true,
    devtool: 'source-map'
};
