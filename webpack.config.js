const path = require("path");

const HtmlWebpackplugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/scripts/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-[hash].js",
    },
    devServer: {
        port: 3200,
    },
    plugins: [
        new HtmlWebpackplugin({
            filename: "index.html",
            template: path.resolve(__dirname, "./src/pages/index.html"),
        }),
        new MiniCssExtractPlugin({filename: "styles-[hash].css"}),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            {
                test: /\.css/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.s[ac]ss/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    }
}