﻿var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pkg = require('./package.json');

// bundle dependencies in separate vendor bundle
var vendorPackages = Object.keys(pkg.dependencies).filter(function (el) {
	return el.indexOf('font') === -1; // exclude font packages from vendor bundle
});

/*
 * Default webpack configuration for development
 */
var config = {
	devtool: 'source-map',
	cache: true,
	entry: {
		main: path.join(__dirname, "app", "App.js"),
		vendor: vendorPackages
	},
	output: {
		path: path.join(__dirname, "wwwroot", "js"),        //Note: For ASP.NET Core we need to put the output in wwwroot/js
		//in production mode make files have a .min.js ending - stops gulp's min:js concating them
		filename: process.env.NODE_ENV === 'production' ? '[name].min.js' : '[name].js',
		sourceMapFilename: '[file].map'
	},

    resolve: {
        modules: [
            'node_modules'
        ]
    },
	plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' })
	],
	module: {
        loaders: [
        {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react']
			}
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        },
        {
            test: /\.scss$/,
            loader: "style-loader!css-loader!sass-loader"
        },
        {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
        },
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader'
        },
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
        }
        ]
	}
}

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === 'production') {
	config.devtool = false;

	config.plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),

        new webpack.optimize.UglifyJsPlugin({
        	comments: false,
        	compress: { warnings: false }
        }),
        new webpack.DefinePlugin({
        	'process.env': { NODE_ENV: JSON.stringify('production') }
        })
	];
};

module.exports = config;

