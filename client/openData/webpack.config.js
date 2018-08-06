var path = require('path')
var webpack = require('webpack')
const babelOptions = {
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
module.exports = {
  entry: {main:'./src/main.ts',myUtils:'./src/Utils/MyUtils.ts'},
  output: {
    path: path.resolve(__dirname, '../wx/js/myOpenDataContext'),
    publicPath: '',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader'
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/,/bin/]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
         test: /\.(eot|woff|ttf)$/,
         loader: 'file-loader'
      },
      {
        test:/\.ts(x?)$/,
        use:[ 
          {
            loader: 'babel-loader',
            options: babelOptions
          },
          {
            loader: 'ts-loader'
          }
          
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*','.js','.json','.ts','.tsx']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = ''
  module.exports.mode = 'production'
}else if(process.env.NODE_ENV === 'development'){
  module.exports.mode = 'development'
  module.exports.devtool = "";
}
