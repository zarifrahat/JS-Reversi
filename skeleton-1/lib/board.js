let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let myGrid = [];

  for(let i = 0; i < 8; i++){
    let row = new Array(8);
    myGrid.push(row);
  }

  myGrid[3][3] = new Piece('white');
  myGrid[4][4] = new Piece('white');
  myGrid[3][4] = new Piece('black');
  myGrid[4][3] = new Piece('black');

  return myGrid;
}


/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let x = pos[0];
  let y = pos[1];

  if((x >= 0 && x < 8) && (y >= 0 && y < 8)){
    return true; 
  }
  return false; 
};


/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if (this.grid[pos[0]][pos[1]] === undefined){
    return this.grid[pos[0]][pos[1]];
  }

  if (!this.isValidPos(pos)) {
     throw new Error('Not valid pos!');
  }

  if (this.isValidPos(pos) && (this.grid[pos[0]][pos[1]])){
    return this.grid[pos[0]][pos[1]];
  }
 
};


/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  if(this.getPiece(pos) != undefined){
  return this.getPiece(pos).color === color;}
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return this.getPiece(pos) != undefined;
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */
// pos = current_pos dir = BOARD DIRS color = W p2Flip= [2,3 2,4] = B pces.
//starting pos = [3,3] return [] if ending pos === undefined 
// bbbbb
Board.prototype._positionsToFlip = function(pos, color, dir, piecesToFlip){
  //find which pos in this.DIRS 
  //pos [3,3] dir = [0,1] pos [3+0, 3+1] 
  // in each stack p2flip.push 
  // debugger
  if (!piecesToFlip){
    piecesToFlip = [];
  }
  let newPos = [(pos[0] + dir[0]), (pos[1] + dir[1])];
   if (!this.isValidPos(newPos)){ return [];}
   if(this.grid[pos[0] + dir[0]] [pos[1] + dir[1]] === undefined){ return [];}
   if(this.grid[pos[0] + dir[0]][pos[1] + dir[1]].color === color) { return piecesToFlip; }

  //push( [ (3+0), (3+1)]) [[3,4]].concat(Board.prototype._positionsToFlip = function(3,4], color, dir, piecesToFlip))
  piecesToFlip.push(newPos);
   return this._positionsToFlip(newPos, color, dir, piecesToFlip);
  //  return piecesToFlip;

};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  // debugger
  if (this.isOccupied(pos)){
    return false;
  }
  // Board.DIRS.forEach(dir => {
    for (let i = 0; i < Board.DIRS.length; i++) {
    
    let movesInThisDIR = this._positionsToFlip(pos, color, Board.DIRS[i], null);
    if(movesInThisDIR.length > 0){
      return true;
    }
    
  } /*)*/
  return false;
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  debugger
  if(this.validMove(pos, color)){
    let firstMove = this.grid[pos[0]][pos[1]];
    firstMove = new Piece(color);

    let allMoves = [];

    for (let i = 0; i < Board.DIRS.length; i++) {

      let movesInThisDIR = this._positionsToFlip(pos, color, Board.DIRS[i], null);
      if (movesInThisDIR.length > 0) {
        allMoves = allMoves.concat(movesInThisDIR);
      }
    }
    console.log(allMoves);
    allMoves.forEach(move => {
      this.grid[move[0]][move[1]].flip();
    });
  } else {throw new Error("Invalid Move");}
  
};


/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {

  let allMoves = [];

  for (let i = 0; i < Board.DIRS.length; i++) {

    let movesInThisDIR = this._positionsToFlip(pos, color, Board.DIRS[i], null);
    if (movesInThisDIR.length > 0) {
      allMoves = allMoves.concat(movesInThisDIR);
    }
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
};



/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};




/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};



module.exports = Board;
