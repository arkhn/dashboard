var path = require("path"),
  htmlPlugin = require("html-webpack-plugin");
FaviconsWebpackPlugin = require("favicons-webpack-plugin");

var SRC_DIR = path.join(__dirname, "./src");
var DIST_DIR = path.join(__dirname, "./dist");

module.exports = {
  // Indicates where to start so as to build the module dependency graph
  context: SRC_DIR,
  entry: "./app.tsx",
  // Where bundles should be emitted
  output: {
    path: DIST_DIR,
    filename: "fhirball.bundle.js"
  },
  // By default, webpack only handles js and json files.
  // In order to process other types of files, one should use
  // "loaders".
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        use: ["awesome-typescript-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.svg$/,
        loader: "raw-loader"
      },
      {
        // This is, among others, for files present in ./node_modules/graphql
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader"
      }
    ]
  },
  // In this app, plugins are used to optimize emitted bundles and
  // set environment variables if need be.
  plugins: [
    new htmlPlugin({
      template: "index.html"
    }),
    new FaviconsWebpackPlugin({ logo: "./assets/img/logo.png" })
  ],
  // Resolvers are used to locate modules using absolute paths.
  // This allows to write `import * from './module'` instead of
  // `import * from './module.tsx'`
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
  },
  // Run optimisation scripts depending on the `mode` (dev or prod).
  // webpack minimises the code by default on prod
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  devServer: {
    // Allows to handle routes with React instead of webpack
    historyApiFallback: true
  },
  // Prevents source map erros in development in Firefox
  devtool: "source-map"
};
