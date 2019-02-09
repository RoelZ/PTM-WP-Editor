//import { request } from 'https';

const path = require('path'),
webpack = require('webpack'),
CleanWebpackPlugin = require('clean-webpack-plugin'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({ filename: './assets/css/app.css' });
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
/*
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9lbHoiLCJhIjoiY2phczkwc25mNXJieTJxbnduYTNtaDNneiJ9.7eTxRRsp0GbqkZOJMxRw8g';
const map = new mapboxgl.Map({
    container: '<mapbox>',
    style: 'mapbox://styles/mapbox/streets-v9'
});
*/

const config = {
    // abosulte path for project root
    context: path.resolve(__dirname, 'src'),
    
    entry: {
    // removing 'src' directory from entry point, since 'context' is taking care of that
    app: './app.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/js/[name].bundle.js'
  },
//   optimization: {
//     minimize: false
//   },
  module: {
    rules: [
        //babel-loader
        {
            test: /\.js$/,
            include: /src/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['env']
                }
            }
        },
        //html-loader
        {
            test: /\.html$/,
            use: ['html-loader']
        },
        //sass-loader
        {
            test: /\.scss$/,
            include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
            use: extractPlugin.extract({
                // missing postcss-loader (for Bootstrap)
                use: ['css-loader', 'sass-loader'],
                fallback: 'style-loader'
            })
        },
        {
        test: /\.css$/,
        loaders: ["style-loader","css-loader"]
        },
        {
        test: /\.(jpg|png)$/,
        use: {
            loader: "file-loader",
            options: {
            name: "[path][name].[hash].[ext]",
            },
        },
        }
    ]    
  },
  plugins: [
      /*
    new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
            compress: {
                typeofs: false,
            },
        },
    }),
    */
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery'",
        "window.$": "jquery"
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
        template: 'index.html'
    }),
    extractPlugin
  ],
  
//   externals: {
//     'mapbox-gl': 'mapboxgl' 
//   },

  devServer: {
    // proxy: {
    //     '/maps/api/*':'https://maps.googleapis.com'
    // },
    contentBase: path.resolve(__dirname, "dist/assets/media"),
    stats: 'errors-only',
    port: 12000,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    }
    // allowedHosts: ['192.168.1.26']
  }
  /*,
  devtool: 'inline-source-map'  
  */
}

module.exports = config;