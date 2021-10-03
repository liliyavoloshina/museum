const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const devServer = isDev =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          port: 8080,
          contentBase: '/'
        }
      }
      

module.exports = ({ development }) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,
  entry: {
    main: [fs.existsSync(path.resolve(__dirname, 'src', 'index.ts')) ? './index.ts' : './index.js'],
    critical: [fs.existsSync(path.resolve(__dirname, 'src', 'critical.ts')) ? './critical.ts' : './critical.js']
  },
  context: path.resolve(__dirname, 'src'),
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[file]'
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(?:mp3|wav|ogg|mp4)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        include: path.resolve(__dirname, './src/scss/'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      chunks: development ? '' : ['critical'],
    }),
    new HtmlWebpackPlugin({
      filename: 'tour1.html',
      template: 'tours/tour1.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'tour2.html',
      template: 'tours/tour2.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'tour3.html',
      template: 'tours/tour3.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'tour4.html',
      template: 'tours/tour4.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'tour5.html',
      template: 'tours/tour5.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'tour6.html',
      template: 'tours/tour6.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'tour7.html',
      template: 'tours/tour7.html'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: '**/*',
          context: path.resolve(__dirname, './src'),
          globOptions: {
            ignore: ['**/*.js', '**/*.ts', '**/*.scss', '**/*.sass', '**/*.html']
          },
          noErrorOnMissing: true,
          force: true
        }
      ]
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  ...devServer(development)
})
