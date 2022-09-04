const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  context: process.cwd(),
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'monitor.js'
  },
  devServer: {
    port: 3003,
    static: './dist',
    onBeforeSetupMiddleware (devServer) {
      devServer.app.get('/success', (req, res) => {
        res.json({ id: 1 });
      });
      devServer.app.post('/error', (req, res) => {
        res.sendStatus(500);
      })
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // filename: 'index.html',
      // 打包插入头部 head
      inject: true,
    }),
  ]
}