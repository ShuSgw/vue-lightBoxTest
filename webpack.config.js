const path = require('path')

const projectPaths = {
  projectDir: __dirname,
  projectJsPath: path.resolve(__dirname, 'assets/src/js'),
  projectScssPath: path.resolve(__dirname, 'assets/src/scss'),
  projectImagesPath: path.resolve(__dirname, 'assets/src/images'),
  projectOutput: path.resolve(__dirname, 'public'),
  projectWebpack: path.resolve(__dirname, 'webpack'),
}

const projectFiles = {
  browserSync: {
    enable: true,
    host: 'localhost',
    port: 3000,
    mode: 'server', // proxy | server
    server: { baseDir: './' },
    files: '**/**/**.html',
    reload: true,
  },
  projectJs: {
    eslint: false,
    filename: 'js/[name].js',
    entry: {
      frontend: projectPaths.projectJsPath + '/frontend.js',
      backend: projectPaths.projectJsPath + '/backend.js',
    },
    rules: {
      test: /\.m?js$/,
    },
  },
  projectCss: {
    postCss: projectPaths.projectWebpack + '/postcss.config.js',
    stylelint: false,
    filename: 'css/[name].css',
    use: 'sass',
    rules: {
      sass: {
        test: /\.s[ac]ss$/i,
      },
      postcss: {
        test: /\.pcss$/i,
      },
    },
    purgeCss: {
      paths: [
        __dirname + '/assets/src/js/**/*',
        __dirname + '/templates/**/**/*',
        __dirname + '/template-parts/**/**/*',
        __dirname + '/blocks/**/**/*',
        __dirname + '/*.php',
      ],
    },
  },
  projectSourceMaps: {
    enable: true,
    env: 'dev', // dev | dev-prod | prod
    devtool: 'source-map',
  },
  projectImages: {
    rules: {
      test: /\.(jpe?g|png|gif|svg)$/i,
    },
    minimizerOptions: {
      plugins: [
        ['gifsicle', { interlaced: true }],
        ['jpegtran', { progressive: true }],
        ['optipng', { optimizationLevel: 5 }],
        [
          'svgo',
          {
            plugins: [{ removeViewBox: false }],
          },
        ],
      ],
    },
  },
}

const projectOptions = {
  ...projectPaths,
  ...projectFiles,
  projectConfig: {},
}

module.exports = (env) => {
  if (env.NODE_ENV === 'production') {
    return require('./webpack/config.production')(projectOptions)
  } else {
    return require('./webpack/config.development')(projectOptions)
  }
}
