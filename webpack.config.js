const path = require("path");
const webpack = require("webpack");

const asset_path = path.join(__dirname, "asset/");
const public_path = path.join(__dirname, "public/");

module.exports = {
    entry: {
        main: asset_path + "js/main.js",
    },
    output: {
        path: public_path + "js/",
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        },
        extensions: ['.js', '.vue', '.json', '.css']
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //   compress: {
        //     warnings: false
        //   }
        // })
    ],
    watch: true,
};