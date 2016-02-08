webpack = require("webpack");
var libsDir = './public/static/js/libs/';
var config = {
    addVendor: function (name, path) {
      this.resolve.alias[name] = path;
      this.module.noParse.push(new RegExp(path));
    },
    resolve: { alias: {} },
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
        library: 'Nadmozg'
    },
    module: {
        noParse: [],
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
    plugins: [
                   new webpack.optimize.UglifyJsPlugin()
              ],
    //watch: true,
    //progress: true,
    devtool: 'source-map'
};


config.addVendor('warden', libsDir + 'warden');
config.addVendor('jquery', libsDir + 'jquery');
config.addVendor('bootstrap', libsDir + 'bootstrap');
config.addVendor('react', libsDir + 'react');
config.addVendor('react-dom', libsDir + 'react-dom');
module.exports = config;
