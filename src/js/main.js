console.log('js:loaded')

// const boardEl = document.querySelector('board')

class Board {

  constructor() {
    this.squares = []
    this.files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    this.ranks = [1, 2, 3, 4, 5, 6, 7, 8]
  }
  makeBoard() {
    let currColor = true
    for (let rank of this.ranks) {
      for (let file of this.files) {
        this.squares.push(new Square(file, rank, currColor))
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
        localSq.piece ? localRank += `|${localSq.piece.name} ` : localRank += `|${localSq.file}${localSq.rank}`
      }
      if (localRank) drawnBoard.push(localRank)

    }

    console.log(drawnBoard)

  }
}

class Square {
  constructor(file, rank, color, piece) {
    this.file = file
    this.rank = rank
    this.color = color ? 'light' : 'dark'
    this.piece = null
  }
}

class Piece {
  constructor(color) {
    // canMove
    // canCapture
    // canPromote
    this.type = 'pawn'
    this.color = color
    this.name = 'p'

  }
}

class Pawn extends Piece {
  constructor(color) {
    super(color)
    this.movementRange = 2
  }
  move() {
    this.movementRange = 1
    console.log(`moving: ${this.name} to square`)
  }
}
class Knight extends Piece {
  constructor(color) {
    super(color)
    this.type = 'knight'
    this.name = 'N'
  }
  move() {
    console.log(`moving: ${this.name} to square`)
  }
}

function init() {
  consolePlay()
}

function consolePlay() {
  board.drawBoard()
  board.consoleDrawboard()
}

const board = new Board()
board.makeBoard()


// Console pawn test
//add piece to e2 (pawn)
board.squares[12].piece = new Pawn('white')
board.squares[52].piece = new Knight('black')

//move pawn to e4! best by test.
consolePlay()

//player clicks e2 and clicks e4

//check if square ahead is occupied
if (!board.squares[20].piece) console.log(`path clear for pawn on ${board.squares[12 + 8].file}${board.squares[12 + 8].rank}`)
//check if destination square is occupied
if (!board.squares[28].piece) console.log(`path clear for pawn on ${board.squares[12 + 8 + 8].file}${board.squares[12 + 8 + 8].rank}`)
//move the pawn to e4
board.squares[28].piece = board.squares[12].piece

//set pawn hasMoved() to true, limiting is movement range to 1 square.
board.squares[12].piece.move()

//remove the pawn from e2
board.squares[12].piece = null
consolePlay()


//knights can move to any square without being blocked
board.squares[37].piece = board.squares[52].piece
board.squares[52].piece.move()
board.squares[52].piece = null

consolePlay()

//check if pawn can advance forward
if (!board.squares[28 + 8].piece) console.log(`path clear for pawn on ${board.squares[28 + 8].file}${board.squares[28 + 8].rank}`)

//check if pawn can capture

if (board.squares[28 + 7].piece) console.log(`Capture detected! ${board.squares[28 + 7].file}${board.squares[28 + 7].rank}`)
if (board.squares[28 + 9].piece) console.log(`Capture detected! ${board.squares[28 + 9].file}${board.squares[28 + 9].rank}`)

consolePlay()

//if capture is detected, the move is legal
board.squares[37].piece = board.squares[28].piece
board.squares[28].piece = null
console.log('Pawn captures Knight on f5')
consolePlay()







//////////////////////////////////////////////////////////
// TODO: Make init function
// init()
// 