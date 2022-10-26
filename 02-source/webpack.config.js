const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * webpack有四种处理静态资源的方式
 *  asset/resource 导出一个 url
 *  asset/inline 导出一个data url -> base64
 *  asset/resource 导出一个源文件
 *  asset 在asset/resource 与 asset/inline之前自动选择, 大于8K 走asset/source 小于8k 走asset/inline
 */

module.exports = {
  entry: './src/index.js', // 入口
  output: {                // 输出
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,         // 清除dist目录
    assetModuleFilename: 'assets/[contenthash][ext]' // 静态资源输出目录
  },

  mode: 'development', //
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jpg$/,
        type: 'asset/resource', // 导出一个url
        generator: {
          filename: 'assets/1111[contenthash][ext]' // 优先级大于assetModuleFilename
        }
      },
      {
        test: /\.png$/,
        type: 'asset/inline', // 导出一个data url -> base64
      },
      {
        test: /\.txt$/,
        type: 'asset/source', // 导出源文件
      },
      {
        test: /\.svg$/,
        type: 'asset', // 在asset/resource 与 asset/inline之前自动选择
        parser: {
          dataUrlCondition: {
            maxSize: 2 * 1024 //  采用那种资源加载方式的阈值
          }
        }
      }
    ]
  },
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