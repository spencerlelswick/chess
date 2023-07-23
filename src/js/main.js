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
    for (let file of this.files) {
      for (let rank of this.ranks) {
        this.squares.push(new Square(rank, file, currColor))
        currColor = !currColor
      }
    }
  }
  toggleSquareColor() {
    toggleColor ? 'dark' : 'light'
  }
  drawBoard() {
    const boardRanks = [[]]
    let currFile = 0
    let count = 0
    for (let square in this.squares) {

      boardRanks[currFile].push(this.squares[square])
      count++
      if (count === this.files.length) {
        currFile !== this.files.length ? boardRanks.push([]) : null
        currFile++
        count = 0
      }
    }
    //TODO: Possible bug adding empty array at idx 0.
    //TODO: Possible bug drawing board ranks in reverse order
    boardRanks.reverse()

    //temporary console.log board
    return boardRanks;
  }
  //temp method to draw board in console.
  consoleDrawboard() {
    let localRank = ''
    const drawnBoard = []
    const consoleBoard = this.drawBoard()
    for (let i = 0; i < consoleBoard.length; i++) {
      localRank = ''
      for (let j = 0; j < consoleBoard[i].length; j++) {
        let localSq = consoleBoard[i][j]
        // localRank += `| ${localSq.rank}${localSq.file} `
        localRank += `|${localSq.piece}`
      }
      drawnBoard.push(localRank)

    }

    console.log(drawnBoard)

  }
}

class Square {
  constructor(rank, file, color, piece) {
    this.rank = rank
    this.file = file
    this.color = color ? 'light' : 'dark'
    this.piece = '_'
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
  board.drawBoard()
  board.consoleDrawboard()
}


init()