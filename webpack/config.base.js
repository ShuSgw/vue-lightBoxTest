const magicImporter = require('node-sass-magic-importer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const WebpackBar = require('webpackbar')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (projectOptions) => {
  /**
   * CSS Rules
   */
  const cssRules = {
    test:
      projectOptions.projectCss.use === 'sass'
        ? projectOptions.projectCss.rules.sass.test
        : projectOptions.projectCss.rules.postcss.test,
    exclude: /(node_modules|bower_components|vendor)/,
    use: [
      MiniCssExtractPlugin.loader,
      { loader: 'css-loader', options: { url: false } },
      {
        loader: 'postcss-loader',
        options: require(projectOptions.projectCss.postCss)(projectOptions),
      },
    ],
  }

  if (projectOptions.projectCss.use === 'sass') {
    cssRules.use.push({
      loader: 'sass-loader',
      options: {
        sassOptions: { importer: magicImporter(), url: false }, // add magic import functionalities to sass
      },
    })
  }

  const jsRules = {
    test: projectOptions.projectJs.rules.test,
    include: projectOptions.projectJsPath,
    exclude: /(node_modules|bower_components|vendor)/,
    use: 'babel-loader',
  }

  const imageRules = {
    test: projectOptions.projectImages.rules.test,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  }

  const optimizations = {}

  const plugins = [
    new WebpackBar(),

    new MiniCssExtractPlugin({
      filename: projectOptions.projectCss.filename,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: projectOptions.projectImagesPath,
          to: projectOptions.projectOutput + '/images',
        },
      ],
    }),
    new ImageMinimizerPlugin({
      minimizerOptions: projectOptions.projectImages.minimizerOptions,
    }),
  ]
  if (projectOptions.browserSync.enable === true) {
    const browserSyncOptions = {
      files: projectOptions.browserSync.files,
      host: projectOptions.browserSync.host,
      port: projectOptions.browserSync.port,
    }
    if (projectOptions.browserSync.mode === 'server') {
      Object.assign(browserSyncOptions, {
        server: projectOptions.browserSync.server,
      })
    } else {
      Object.assign(browserSyncOptions, {
        proxy: projectOptions.browserSync.proxy,
      })
    }
    plugins.push(
      new BrowserSyncPlugin(browserSyncOptions, {
        reload: projectOptions.browserSync.reload,
      })
    )
  }

  return {
    cssRules: cssRules,
    jsRules: jsRules,
    imageRules: imageRules,
    optimizations: optimizations,
    plugins: plugins,
  }
}
