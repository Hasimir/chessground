var range = require('lodash-node/modern/arrays/range');

var files = "abcdefgh".split('');
var ranks = range(1, 9);
var invRanks = range(8, 0, -1);

function pos2key(pos) {
  return files[pos[0] - 1] + pos[1];
}

function key2pos(pos) {
  return [(files.indexOf(pos[0]) + 1), parseInt(pos[1])];
}

function invertKey(key) {
  return files[7 - files.indexOf(key[0])] + (9 - parseInt(key[1]));
}

var allPos = (function() {
  var ps = [];
  invRanks.forEach(function(y) {
    ranks.forEach(function(x) {
      ps.push([x, y]);
    });
  });
  return ps;
})();
var invPos = allPos.slice().reverse();
var allKeys = allPos.map(pos2key);

function classSet(classes) {
  var arr = [];
  for (var i in classes) {
    if (classes[i]) arr.push(i);
  }
  return arr.join(' ');
}

function opposite(color) {
  return color === 'white' ? 'black' : 'white';
}

function contains2(xs, x) {
  return xs && (xs[0] === x || xs[1] === x);
}

function containsX(xs, x) {
  return xs && xs.indexOf(x) !== -1;
}

function distance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
}

function pp(x) {
  console.log(x);
  return x;
}

// this must be cached because of the access to document.body.style
var cachedTransformProp;

function transformProp() {
  if (!cachedTransformProp) cachedTransformProp = computeTransformProp();
  return cachedTransformProp;
}

function computeTransformProp() {
  return 'transform' in document.body.style?
    'transform': 'webkitTransform' in document.body.style?
    'webkitTransform': 'mozTransform' in document.body.style?
    'mozTransform': 'oTransform' in document.body.style?
    'oTransform': 'msTransform';
}

function translate(pos) {
  return 'translate3d(' + pos[0] + 'px,' + pos[1] + 'px,0)';
}

function eventPosition(e) {
  return e.touches ? [e.targetTouches[0].clientX, e.targetTouches[0].clientY] : [e.clientX, e.clientY];
}

function partialApply(fn, args) {
  return fn.bind.apply(fn, [null].concat(args));
}

// because lodash partial function seems exceedingly complicated
function partial() {
  return partialApply(arguments[0], Array.prototype.slice.call(arguments, 1));
}

module.exports = {
  files: files,
  ranks: ranks,
  allPos: allPos,
  invPos: invPos,
  allKeys: allKeys,
  pos2key: pos2key,
  key2pos: key2pos,
  invertKey: invertKey,
  classSet: classSet,
  opposite: opposite,
  translate: translate,
  contains2: contains2,
  containsX: containsX,
  distance: distance,
  eventPosition: eventPosition,
  partialApply: partialApply,
  partial: partial,
  transformProp: transformProp,
  pp: pp
};
