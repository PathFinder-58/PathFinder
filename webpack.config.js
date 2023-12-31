import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack'
import dotenv from 'dotenv'

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

export default {
  entry: ['./client/index.js'], // Webpack will start the bundling process at this file
  // Webpack will bundle files and place them in the "path" directory and use the "filename" property as its name
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  }, 
  mode: 'development', // Sets the mode, either development or production. Development enables certain certain features specific to development like faster builds and easier debugging.
  // Configuration for the webpack-dev-server, which provides a local development server for testing during development.
  devServer: {
    host: 'localhost',
    port: 8080,
    static: { // Configures the static serving options for the dev server.
      directory: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    hot: true, // Preventing repetitive google API calls. Set to true after disabling google API
    proxy: { // Sets up a proxy to forward specific requests to paths starting with /api/ to port 3000.
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  resolve: {
    fallback: {
      "path": false
    }
  },
  
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }], ['@babel/preset-react', { targets: "defaults" }],
            ]
          }
        },
      },
      {
        test: /.(scss|css)$/,
        exclude: /node_modules/,
        use: 
          ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: './index.html'
    }),
    new webpack.DefinePlugin(envKeys)
  ]
};