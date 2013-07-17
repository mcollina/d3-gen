

var jsdom = require("jsdom")
  , fs = require("fs")
  , jquery = fs.readFileSync(__dirname + "/jquery.js", "utf-8")
  , d3 = fs.readFileSync(__dirname + "/d3.js", "utf-8")

module.exports = function(func) {
  return function(cb) {
    var wrapper = function(errors, window) {
      if (func.length < 2) {
        func(window)
        cb(null, window.$("body").html())
      } else {
        func(window, function(err) {
          cb(err, window.$("body").html())
        })
      }
    }

    jsdom.env({
        html: "<html><body></body></html>"
      , src: [jquery, d3]
      , done: wrapper
    })
  }
}

