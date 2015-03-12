module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["mocha", "browserify"],
    browserify: {
      debug: true,
      transform: ["babelify"]
    },
    files: [
      "index.js",
      "lib/*.js",
      "test/**/*.js"
    ],
    preprocessors: {
      "lib/*": ["browserify"],
      "index.js": ["browserify"],
      "test/**/*.js": ["browserify"]
    },
    port: 9876,
    logLevel: config.LOG_INFO,
    reporters: ["spec"],
    browsers: ["Chrome"],
    autoWatch: true,
    singleRun: false,
    colors: true
  });
};