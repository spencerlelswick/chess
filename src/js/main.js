console.log('js:loaded')

const boardEl = document.querySelector('board')

class Board {

  constructor() {
    this.squares = []
    this.ranks = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    this.files = [1, 2, 3, 4, 5, 6, 7, 8]
  }
  makeBoard() {
    let currColor = true
    for (let rank of this.ranks) {
      for (let file of this.files) {
        this.squares.push(new Square(rank, file, currColor))
        currColor = !currColor
      }
    }
  }
  toggleSquareColor() {
    toggleColor ? 'brown' : 'white'
  }
  drawBoard() {
    for(let square in this.squares){
      
    }
  }
}

class Square {
  constructor(rank, file, color) {
    this.rank = rank
    this.file = file
    this.color = color ? 'white' : 'brown'
  }
}

class Piece {
  constructor() {

  }
}

class Pawn extends Piece {

}

function init() {
  const board = new Board()
  board.makeBoard()
  console.log(board.squares)
}


init()