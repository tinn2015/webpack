const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
/**
 * webpack有四种处理静态资源的方式
 *  asset/resource 导出一个 url
 *  asset/inline 导出一个data url -> base64
 *  asset/resource 导出一个源文件
 *  asset 在asset/resource 与 asset/inline之前自动选择, 大于8K 走asset/source 小于8k 走asset/inline
 */

module.exports = {
  /**
   * 默认情况下共同依赖的会分别打入包内
   * 通过配置dependOn属性将共同依赖抽离
   */
  entry: {              // 配置多入口
    index: './src/index.js',
    main: './src/main.js'
  }, 
  output: {                // 输出
    filename: '[name].[contenthash].js',
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
      },
      /**
       * loader介绍
       * loader的执行顺序是从右到左
       * less-loader 负责解析less, 把less转为css
       * css-loader解析css
       * style-loader 负责将css插入到文档header
       */
      {
        test: /\.(css|less)$/,
        // use: ['style-loader','css-loader','less-loader'] // 顺序是从右到左， 顺序不能变
        use: [MiniCssExtractPlugin.loader,'css-loader','less-loader'] // 顺序是从右到左， 顺序不能变
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // 通过babel处理js, 转为es5
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({   // 自动生成html
      template: './index.html',  // 依赖的模板
      inject: 'body',           // 在body中插入依赖
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css' // 指定css路径
    }) //抽离，合并css
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()], // 压缩css, 在mode=production的时候生效
    splitChunks: {
      /**
       * 两个模块都加载了loadsh
       * 通过chunks: all 设置，可以将公共模块loadsh抽离， 这个是把所有公共模块抽离到一个文件中
       */
      // chunks: 'all'

      /**
       * 抽离node_modules中的所有模块到一个包内.
       * 因为node_modules中的依赖更新不频繁，所以如此操作可以更充分利用浏览器缓存
       */
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  devServer: {
    static: './dist'
  }
}