// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: ["main"],

  paths: {
    // JavaScript folders.
    libs: "../scripts/libs",
    plugins: "../scripts/plugins",

    // Libraries.
    jquery: "../scripts/libs/jquery",
    lodash: "../scripts/libs/lodash",
    backbone: "../scripts/libs/backbone",
    d3v3: "../scripts/libs/d3.v3"
    },

  shim: {
    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    },

    // Backbone.LayoutManager depends on Backbone.
    "plugins/backbone.layoutmanager": ["backbone"],

     // The main non-boilerpalte app javaScript
      app_scripts :["jquery", "d3v3"]

  }



});

require(["app_scripts"]);
