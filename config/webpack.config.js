const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
// const { ProgressPlugin } = require("webpack");
const AutoImportPlugin = require('unplugin-auto-import/webpack');
//  分析打包后的依赖包大小
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// 打包进度美化
const WebpackBar = require('webpackbar');
const path = require('path');

module.exports = [
  {
    stats: 'minimal',
    mode: 'production',
    entry: {
      popup: './src/popup/main.ts',
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'js/[name].js',
    },

    plugins: [
      AutoImportPlugin({
        imports: ['vue'],
        dts: './src/types/auto-imports.d.ts',
      }),
      new HtmlWebpackPlugin({
        template: './src/popup/index.html',
        filename: 'popup.html',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: './src/public/manifest.json', to: '../dist' },
          { from: './src/assets', to: '../dist/assets' },
        ],
      }),
      new VueLoaderPlugin(),
      // new BundleAnalyzerPlugin(),
      new WebpackBar({
        name: 'vue3-webpack-demo',
        color: '#85d', // 默认green，进度条颜色支持HEX
        profile: true,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader',
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
          exclude: '/node-modules/',
        },
      ],
    },
  },
  {
    stats: 'none',
    mode: 'production',
    entry: {
      content: './src/content/index.ts',
      background: './src/background/index.ts',
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
    },
  },
];
