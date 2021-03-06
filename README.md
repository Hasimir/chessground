# ChessGround - multipurpose chess UI.

Chessground targets all modern browsers, as well as mobile development using Cordova.

See it in action on [lichess.org board editor](http://lichess.org/editor)
and [lichess.org puzzle solver](http://lichess.org/training).

Note that Chessground is only the UI, and has no knowledge of the rules of chess.
You have to feed it with the correct moves using backend or frontend chess logic.

### Demo

[http://lichess.org/training](http://lichess.org/training)

### Dependencies

- [mithril.js](https://github.com/lhorie/mithril.js) - a minimalist virtual DOM library
- [lodash-node](https://github.com/lodash/lodash-node) - just a handful of selected functions, not the whole thing

## Features

Chessground is designed to fulfill all lichess.org web and mobile apps needs, so it is pretty featureful.

- Fast. Uses virtual DOM; runs smoothly on elder mobile phones
- Small footprint: 13K gzipped (38K unzipped) including dependencies
- Standalone, or composable as a mithril.js module
- Entirely configurable and reconfigurable at any time
- Styling with CSS: board and pieces can be changed by simply switching a class
- Fluid layout: board can be resized at any time
- Support for 3D pieces and boards
- Full mobile support (touchstart, touchmove, touchend)
- Move pieces by click
- Move pieces by drag'n drop
  - minimum distance before drag
  - centralisation of the piece under the cursor
  - square target element for mobile
  - piece ghost
  - drop off revert or trash
- Premove by click or drag
- Animation of pieces: moving and fading away
- Display last move, check, move destinations, and premove destinations
- Import and export positions in FEN notation
- User callbacks
- No chess logic inside: can be used for chess variations

## Installation

```
npm install --save chessground
```

### Usage

```js
var Chessground = require("chessground");

var ground = Chessground(document.body, options);
```

## Options

All options are, well, optional.

```js
{
  orientation: "white",   // board orientation (or view angle) "white" | "black"
  turnColor: "white",     // turn to play. "white" | "black"
  check: null,            // square currently in check "a2" | null
  lastMove: null,         // squares part of the last move ["c3", "c4"] | null
  selected: null,         // square currently selected "a1" | null
  coordinates: true,      // display board coordinates as square ::after elements
  viewOnly: false,        // don't bind events: the user will never be able to move pieces around
  highlight: {
    lastMove: true,       // add last-move class to squares
    check: true,          // add check class to squares
    dragOver: true        // add drag-over class to square when dragging over it
  },
  animation: {
    enabled: true,        // enable piece animations, moving and fading
    duration: 200,        // animation duration in milliseconds
  },
  movable: {
    free: true,           // all moves are valid - board editor
    color: "both",        // color that can move. "white" | "black" | "both" | null
    dests: {},            // valid moves. {a2: ["a3", "a4"], b1: ["a3", "c3"]} | null
    dropOff: "revert",    // when a piece is dropped outside the board. "revert" | "trash"
    showDests: true,      // add the move-dest class to squares
    events: {
                          // called after the move has been played
      after: function(orig, dest, metadata) {}
    }
  },
  premovable: {
    enabled: true,        // allow premoves for color that can not move
    showDests: true,      // add the premove-dest class to squares
    current: null         // keys of the current saved premove ["e2", "e4"] | null
      events: {
                          // called after the premove has been set
        set: function(orig, dest) {},
                          // called after the premove has been unset
        unset: function() {}
      }
  },
  draggable: {
    enabled: true,        // allow moves & premoves to use drag'n drop
    distance: 3,          // minimum distance to initiate a drag, in pixels
    squareTarget: false,  // display big square target; intended for mobile
    centerPiece: true,    // center the piece on cursor at drag start
    showGhost: true,      // show ghost of piece being dragged
  },
  events: {
    change: function() {},   // called after the situation changes on the board
    select: function(key) {} // called when a square is selected
  }
}
```

## A.P.I.

There are a few functions you can call on a Chessground instance:

### Setters

```js
// reconfigure the instance. Accepts all options mentioned above (bar "viewOnly").
// board will be animated accordingly, if animations are enabled.
ground.set(options);

// sets the king of this color in check
// if no color is provided, the current turn color is used
ground.setCheck(color);

// change the view angle
ground.toggleOrientation();

// perform a move programmatically
ground.move("e2", "e4");

// add and/or remove arbitrary pieces on the board
ground.setPieces({a1: null, c5: {color: "black", role: "queen"}});

// play the current premove, if any
ground.playPremove();

// cancel the current premove, if any
ground.cancelPremove();

// cancels current move and prevent further ones
ground.stop();
```

### Getters

```js
// get the view angle
var orientation = ground.getOrientation();

// get pieces on the board
// {a1: {color: "white", role: "rook"}, b1: {color: "white", role: "knight"}}
var pieces = ground.getPieces();

// get the material difference between white and black
// {white: {pawn: 3 queen: 1}, black: {bishop: 2}}
var diff = ground.getMaterialDiff();

// get the current FEN position
// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR
var fen = ground.getFen();
```

## Developers

### Build

```
npm install
gulp
```

Then open `examples/index.html` in your browser.
The examples are non exhaustive, but feel free to try things out by editing `index.html`.
