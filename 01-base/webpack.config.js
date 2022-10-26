const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js', // 入口
  output: {                // 输出
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true         // 清除dist目录
  },

  mode: 'development', //
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({   // 自动生成html
      template: './index.html',  // 依赖的模板
      inject: 'body',           // 在body中插入依赖
    })
  ],
  devServer: {
    static: './dist'
  }
}