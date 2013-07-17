
var test = require("tap").test
  , d3gen = require("./")

function end(t) {
  return function() {
    t.end()
  }
}
  
test("should expose a function", function(t) {
  var func = d3gen(function() {})

  t.type(func, "function")
  t.end()
})

test("should call the internal function", function(t) {
  var called = false
    , func = d3gen(function() {
               called = true
             })

  func(function() {
    t.equal(called, true, "should have called the internal function")
    t.end()
  })
})

test("should pass an object as first argument of the build function", function(t) {
  d3gen(function(window) {
    t.type(window, "object")
  })(end(t))
})

test("should pass an object with jquery loaded", function(t) {
  d3gen(function(window) {
    t.ok(window.$.extend, "jquery is not present")
  })(end(t))
})

test("should pass an object with d3 loaded", function(t) {
  d3gen(function(window) {
    t.ok(window.d3, "d3 is not present")
  })(end(t))
})

test("should create an svg", function(t) {
  d3gen(function(window) {
    var d3  = window.d3
      , svg = d3.select("body").append("svg")
                .attr("width", 200)
                .attr("height", 200)

    svg.style("fill", "#aad")

  })(function(err, svg) {
    t.equal(svg, "<svg width=\"200\" height=\"200\" style=\"fill: #aad;\"></svg>")
    t.end()
  })
})

test("should work with an async function", function(t) {
  d3gen(function(window, cb) {
    cb();
  })(end(t))
})
